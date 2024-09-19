import React, { Component, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { FormField } from "@/components/FormField";
import { Redirect, router } from "expo-router";
import { RexButton } from "@/components/RexButton";

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
      <ScrollView className="h-full">
        <View className="w-full h-full px-4">
          <View className="relative mt-5">
            <Text className="text-4xl text-primary font-jbold pb-4">Log In</Text>
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
            containerStyles={"bg-primary w-full mt-8"}
            textStyles={"text-white"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
