import { Stack } from "expo-router";
export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                // backgroundColor: '#25292e'
            },
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="index" options={{ title: 'Characters' }} />
            <Stack.Screen name="Character" options={{ title: 'CharacterScreen' }} />
        </Stack>
    )
}

//  screenOptions={{
//                 tabBarActiveTintColor: '#ffd33d',
//                 headerStyle: {
//                     backgroundColor: '#25292e'
//                 },
//                 headerShadowVisible: false,
//                 headerTintColor: '#fff',
//                 tabBarStyle: {
//                     backgroundColor: '#25292e'
//                 }
//             }}