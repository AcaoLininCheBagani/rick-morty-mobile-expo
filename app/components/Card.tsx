import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Card() {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.card}
        >
            <View style={styles.row}>
                <Image source={{ uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' }} style={styles.image} />
                <View style={{}} >
                    <Text style={styles.title}>Rick Sanchez</Text>
                    <Text style={styles.subTitle}>Alive</Text>
                </View>
                <View>
                    <Ionicons name="male-outline" size={30} />
                    {/* <Ionicons name="female-outline" size={30} /> */}
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
        fontSize: 20,
        fontWeight: 600,
    },
    subTitle: {
        fontSize: 14,
        fontWeight:400
    }
})