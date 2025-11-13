import { useGetCharacter } from "@/hooks/tanstackHooks";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
export default function CharacterScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { isFetching, data, error } = useGetCharacter(id)

    if (isFetching) return <ActivityIndicator size="large" style={styles.loader} />;
    if (error) return <Text>Error: {error.message}</Text>;
    if (!data) return <Text>Character not found</Text>;

    return (
        <ScrollView style={styles.container}>
            {data &&
                <View style={styles.vw}>
                    <View style={styles.imgContainer}>
                        <Image source={{ uri: data.image }} style={styles.image} />
                    </View>
                    <View style={styles.subcontainer}>
                        <Text
                            style={styles.infoname}
                            adjustsFontSizeToFit={false}
                        >
                            {data.name}
                        </Text>
                        <Text style={styles.infospec}>
                            {data.species} - {data.gender}
                        </Text>
                        <Text style={styles.infodef}>Type - <Text style={{ fontWeight: 700 }}>{data.type ? data.type : 'N/A'}</Text>
                        </Text>
                        <Text style={styles.infodef}>Status - <Text style={{ fontWeight: 700 }}>{data.status}</Text>
                        </Text>

                        <Text style={styles.infoloc}
                            adjustsFontSizeToFit={false}>
                            Origin: {data.origin.name}</Text>
                        <Text style={styles.infoloc}
                            adjustsFontSizeToFit={false}
                        >Location: {data.location.name}</Text>
                    </View>
                </View>
            }
            <View style={styles.infocard}>
                <Text style={styles.sectionTitle}>Episodes:</Text>
                {data.episode.map((ep) => (
                    <View
                        key={ep.id}
                        style={styles.infolist}
                    >
                        <Text style={styles.epi}>
                            {ep.episode} • {ep.name}
                        </Text>
                        <Text style={styles.epidt}>
                            {ep.air_date}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subcontainer: {
        height: '100%',
        justifyContent: 'space-around',
        marginLeft: 'auto',
        marginRight: 'auto',
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
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 8,
    },
    episode: {
        fontSize: 14,
        marginBottom: 4,
        color: '#666',
    },
    vw: {
        backgroundColor: '#fff',
        boxShadow: '2px 2px 3.84px #f7f0f0ff',
        borderWidth: 0.5,
        borderColor: '#e0e0e0', 
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        height: 200,
        marginLeft: 20,
        marginRight: 20
    },
    infoname: {
        fontSize: 24,
        letterSpacing: 1,
        fontWeight: 700,
        width: 200,
    },
    infodef: {
        fontSize: 12,
        fontWeight: 400,
        width: 200
    },
    infoloc: {
        fontSize: 12,
        fontWeight: 500,
        width: 200,
    },
    infospec: {
        fontSize: 12,
        fontWeight: 700
    },
    infocard: {
        backgroundColor: '#fff',
        boxShadow: '2px 2px 3.84px #f7f0f0ff',
        borderWidth: 0.5, 
        borderColor: '#e0e0e0', 
        borderRadius: 5,
        margin: 10,
        padding: 10,
        marginLeft: 20,
        marginRight: 20
    }, infolist: {
        backgroundColor: '#fff',
        marginHorizontal: 12,
        marginVertical: 4,
        padding: 12,
        borderRadius: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    imgContainer: {
        borderTopStartRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 0,
        overflow: 'hidden',
        width: 150
    },
    epi: {
        fontSize: 14,
        fontWeight: '600',
    },
    epidt: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    }
});