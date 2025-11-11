import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";

const queryClient = new QueryClient()
export default function RootLayout() {

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShadowVisible: false
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Profiles' }} />
        <Stack.Screen name="character/[id]" options={{ title: 'Information' }} />
      </Stack>
    </QueryClientProvider>
  )
}
