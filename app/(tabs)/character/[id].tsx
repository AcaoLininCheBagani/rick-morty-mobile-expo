import { GET_CHARACTER } from "@/app/graphql/queries";
import { Character } from "@/app/types/Character";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
export default function CharacterScreen() {
    const { id } = useLocalSearchParams();
    const { loading, error, data } = useQuery<{ character: Character }>(GET_CHARACTER, {
        variables: { id: id as string }
    });
    if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
    if (error) return <Text>Error: {error.message}</Text>;
    if (!data?.character) return <Text>Character not found</Text>;
    const { character } = data
    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: character.image }} style={styles.image} />
            <View>
                <Text style={styles.name}>{character.name}</Text>
                <Text style={styles.name}>{character.status}</Text>
                <Text style={styles.name}>{character.species}</Text>
                <Text style={styles.name}>{character.gender}</Text>
                <Text style={styles.name}>{character.origin.name}</Text>
                <Text style={styles.name}>{character.location.name}</Text>
                {character.type && <Text style={styles.detail}>Type:{character.type}</Text>}
                <Text style={styles.sectionTitle}>Episodes:</Text>
                {character.episode.map((ep) => (
                    <Text key={ep.id} style={styles.episode}>{ep.name}</Text>
                ))}
            </View>
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