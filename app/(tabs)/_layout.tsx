import { Stack } from "expo-router";
export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerShadowVisible: false,
        }}>
            <Stack.Screen name="index" options={{ title: 'Profiles' }} />
            <Stack.Screen name="character" options={{ title: 'Details' }} />
        </Stack>
    )
}
