import { Stack } from "expo-router";
import "@/src/styles/global.css";
import { Provider } from "react-redux";
import { store } from "@/src/store/store";
import { AudioPlayerProvider } from "@/src/components/AudioPlayer";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <AudioPlayerProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AudioPlayerProvider>
    </Provider>
  );
}
