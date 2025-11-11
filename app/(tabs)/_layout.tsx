import { ApolloProvider } from '@apollo/client/react';
import { Stack } from "expo-router";
import { client } from "../library/apolloClient";
export default function RootLayout() {
    return (
        <ApolloProvider client={client}>
            <Stack screenOptions={{
                headerShadowVisible: false,
            }}>
                <Stack.Screen name="index" options={{ title: 'Profiles' }} />
                <Stack.Screen name="character/[id]" options={{ title: 'Information' }} />
            </Stack>
        </ApolloProvider>
    )
}
