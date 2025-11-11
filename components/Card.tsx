import { CardDetails } from "@/types/CardType";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function Card({ item }: CardDetails) {
    const router = useRouter()
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/character/${item.id}`)}
        >
            <ImageBackground source={{ uri: item.image }} style={styles.bgi} >
                <View style={{
                    backgroundColor: 'rgba(74, 75, 75, 0.79)'
                }}>
                    <View style={styles.row}>
                        <View>
                            <View style={styles.textDiv} >
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.subTitle}>{item.species}</Text>
                            </View>
                            {item.gender === 'Male' ? (
                                <Ionicons name="male-outline" size={32} style={styles.icn} />
                            ) : (
                                <Ionicons name="female-outline" size={30} style={styles.icn} />
                            )}
                        </View>
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 16,
        marginVertical: 8,
        marginHorizontal: 26,
        shadowColor: '#000',
        elevation: 2,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 100,
        marginRight: 15,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,

    },
    title: {
        fontSize: 22,
        fontWeight: 600,
        flexWrap: 'wrap',
        textAlign: 'left',
        flexShrink: 1,
        maxWidth: '100%',
        color: '#fff',
        letterSpacing: 1

    },
    subTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 400,
    },
    bgi: {
        borderRadius: 12,
        overflow: 'hidden'
    },
    icn: { color: '#fff', marginLeft: 15, marginTop: -10 },
    textDiv: {
        maxWidth: 150,
        minWidth: 100,
        margin: 10,
        padding: 5
    }
})