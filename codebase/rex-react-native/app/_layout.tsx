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
import { MusicPlayerProvider } from "@/components/globalContexts/PlayerContext";
import { UserProvider } from "@/components/globalContexts/UserContext";
import { RexProvider } from "@/components/globalContexts/RexContext";

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
          <RexProvider>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
          </RexProvider>
        </UserProvider>
      </MusicPlayerProvider>
    </ThemeProvider>
  );
}
