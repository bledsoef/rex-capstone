import { Link } from "expo-router";
import { type ComponentProps } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export function AlbumPage() {
  const { album } = useLocalSearchParams();
  return (
    <SafeAreaView className="bg-white min-h-screen">
        <View className="flex flex-col">
            <View>
                <Text></Text>
            </View>
        </View>
    </SafeAreaView>
  );
}
