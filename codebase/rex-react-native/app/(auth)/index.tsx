import React, { Component } from "react";
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
} from "react-native";

import { RexButton } from "@/components/RexButton";

export default function Landing() {
  return (
    <SafeAreaView className="flex-1 text-2xl bg-white">
      <ScrollView className="h-full">
        <View className="w-full justify-center items-center h-full px-4">
          <View className="relative mt-5">
            <Text
              style={styles.textWithShadow}
              className="text-7xl text-primary text-center font-jbold"
            >
              Rex
            </Text>
          </View>
          <RexButton
            title={"Log In"}
            handlePress={() => {}}
            containerStyles={"bg-primary w-full"}
            textStyles={"text-white"}
          />
          <RexButton
            title={"Sign Up"}
            handlePress={() => {}}
            containerStyles={"bg-white w-full"}
            textStyles={"text-primary"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textWithShadow: {
    textShadowColor: "#D3D3D3", // Color of the shadow
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset (x and y)
    textShadowRadius: 1, // Shadow blur radius
  },
});
