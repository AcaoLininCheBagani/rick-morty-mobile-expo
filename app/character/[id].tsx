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
            {data &&
                <View style={styles.vw}>
                    <View style={{ borderTopStartRadius: 5, borderBottomLeftRadius: 5, padding: 0, overflow: 'hidden', width: 150 }}>
                        <Image source={{ uri: data.image }} style={styles.image} />
                    </View>
                    <View style={{
                        height: '100%',
                        justifyContent: 'space-around',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        <Text
                            style={{
                                fontSize: 24,
                                letterSpacing: 1,
                                fontWeight: 700,
                                width: 200, 
                            }}
                            adjustsFontSizeToFit={false} 
                        >
                            {data.name}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 700
                        }}>
                            {data.species} - {data.gender}
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 400

                        }}>Type - <Text style={{ fontWeight: 700 }}>{data.type ? data.type : 'N/A'}</Text>
                        </Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 400

                        }}>Status - <Text style={{ fontWeight: 700 }}>{data.status}</Text>
                        </Text>

                        <Text style={{
                            fontSize: 12,
                            fontWeight: 500,
                                width: 200, 


                        }}
                            adjustsFontSizeToFit={false} 

                        >Origin: {data.origin.name}</Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 500,
                                width: 200, 

                        }}
                        adjustsFontSizeToFit={false} 
                        >Location: {data.location.name}</Text>
                    </View>
                </View>

            }
            <Text style={styles.sectionTitle}>Episodes:</Text>
            {data.episode.map((ep: { id: string, name: string }) => (
                <Text key={ep.id} style={styles.episode}>{ep.name}</Text>
            ))}
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
        height: 200,
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
    vw: {
        backgroundColor: '#fff',
        shadowColor: '#e7e0e0ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        height: 200
    }
});