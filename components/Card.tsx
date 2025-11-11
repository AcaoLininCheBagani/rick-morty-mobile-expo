import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
type dettailObj = {
            __typename?: string,
            name: string
        }
type CardDetails = {
    item: {
        __typename?: string,
        gender: string,
        id: string,
        image: string,
        location: dettailObj,
        name: string,
        origin: dettailObj
        status: string,
        species: string,
        type: string
    }
}

export default function Card({ item }: CardDetails) {
    const router = useRouter()
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/character/${item.id}`)}
        >
            <View style={styles.row}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{}} >
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subTitle}>{item.species}</Text>
                </View>
                <View>
                    {item.gender === 'Male' ? (
                            <Ionicons name="male-outline" size={30} />
                        ) : (
                            <Ionicons name="female-outline" size={30} />
                        )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 26,
        shadowColor: '#000',
        elevation: 2,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginBottom: 12,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
    },
    title: {
        fontSize: 15,
        fontWeight: 600,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: 500
    }
})