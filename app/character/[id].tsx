import { GET_CHARACTER } from "@/graphql/queries";
import { client } from "@/lib/graphqlClient";
import { Character } from "@/types/Character";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
export default function CharacterScreen() {
    
    const { id } = useLocalSearchParams();

    const fetchCharacters = async (id: string) => {
        const data = await client.request<{ character: Character }>(GET_CHARACTER, { id });
        return data.character
    }
    const { isFetching, data, error } = useQuery({
        queryKey: ['character'],
        queryFn: () => fetchCharacters(id.toString()),
    })

    if (isFetching) return <ActivityIndicator size="large" style={styles.loader} />;
    if (error) return <Text>Error: {error.message}</Text>;
    if (!data) return <Text>Character not found</Text>;

    return (
        <ScrollView style={styles.container}>
            {data ? (
                <>
                    <Image source={{ uri: data.image }} style={styles.image} />
                    <View>
                        <Text style={styles.name}>{data.name}</Text>
                        <Text style={styles.name}>{data.status}</Text>
                        <Text style={styles.name}>{data.species}</Text>
                        <Text style={styles.name}>{data.gender}</Text>
                        <Text style={styles.name}>{data.origin.name}</Text>
                        <Text style={styles.name}>{data.location.name}</Text>
                        {data.type && <Text style={styles.detail}>Type:{data.type}</Text>}
                        <Text style={styles.sectionTitle}>Episodes:</Text>
                        {data.episode.map((ep: { id: string, name: string }) => (
                            <Text key={ep.id} style={styles.episode}>{ep.name}</Text>
                        ))}
                    </View>
                </>

            ) : (
                <Text> Hello</Text>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
    },
    infoContainer: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    detail: {
        fontSize: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    episode: {
        fontSize: 14,
        marginBottom: 4,
        color: '#666',
    },
});