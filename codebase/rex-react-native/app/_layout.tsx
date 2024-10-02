import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { MusicPlayerProvider } from "@/components/PlayerContext";
import { UserProvider } from "@/components/UserContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    JosefinSansThin: require("../assets/fonts/JosefinSansThin.ttf"),
    JosefinSansLight: require("../assets/fonts/JosefinSansLight.ttf"),
    JosefinSansRegular: require("../assets/fonts/JosefinSansRegular.ttf"),
    JosefinSansSemibold: require("../assets/fonts/JosefinSansSemibold.ttf"),
    JosefinSansBold: require("../assets/fonts/JosefinSansBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <MusicPlayerProvider>
        <UserProvider>
          <Stack>
            <Stack.Screen name="(album)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </UserProvider>
      </MusicPlayerProvider>
    </ThemeProvider>
  );
}
