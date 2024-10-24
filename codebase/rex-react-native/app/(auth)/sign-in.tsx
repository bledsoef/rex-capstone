import React, { Component, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { FormField } from "@/components/FormField";
import { RexButton } from "@/components/landingPage/RexButton";

export default function SignIn() {
  const [form, setForm] = useState<any>({
    email: "",
    password: "",
  });
  function login() {
    auth().signInWithEmailAndPassword(form.email, form.email);
  }
  return (
    <SafeAreaView className="flex-1 text-2xl bg-white">
      <ScrollView className="h-full w-full">
        <View className="w-full h-full px-4">
          <View className="relative mt-5">
            <Text className="text-4xl text-rex font-jbold pb-4">
              Log In
            </Text>
          </View>
          <FormField
            title={"Email"}
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles={"py-1"}
            type={"email-address"}
          />
          <FormField
            title={"Password"}
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles={"py-1"}
          />
          <RexButton
            title={"Log In"}
            handlePress={() => login()}
            containerStyles={"bg-rex w-full mt-8"}
            textStyles={"text-white"}
          />
        </View>
        <View className="flex justify-center">
          <Pressable
            className="p-1"
            onPress={() => {
              router.replace("/(auth)/sign-up")
            }}
          >
            <Text className="text-center font-jregular">
              New to Rex? <Text className="text-rex underline">Create an account</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
