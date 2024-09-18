import React, { Component } from "react";
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { images } from "../constants";
import { RexButton } from "@/components/RexButton";
import { Redirect, router } from "expo-router";

export default function Landing() {
  return (
    <SafeAreaView className="flex-1 text-2xl bg-white">
      <ScrollView className="h-full">
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-full h-[300px]"
            resizeMode="contain"
          ></Image>
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
            handlePress={() => router.push("/(auth)/sign-in")}
            containerStyles={"bg-primary w-full"}
            textStyles={"text-white"}
          />
          <RexButton
            title={"Sign Up"}
            handlePress={() => router.push("/(auth)/sign-up")}
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
