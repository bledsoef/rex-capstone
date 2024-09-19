import React, { Component, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import { FormField } from "@/components/FormField";
import { RexButton } from "@/components/RexButton";
import { Redirect, router } from "expo-router";

export default function SignUp() {
  const [form, setForm] = useState<any>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  async function signUp() {
    if (form.username == "" || form.email == "" || form.password == "" || form.confirmPassword == "") {
      Alert.alert("Please fill out all fields.")
      return
    }
    if (form.password != form.confirmPassword) {
      Alert.alert("Your passwords do not match.")
      return
    }
    auth().createUserWithEmailAndPassword(form.email, form.password) .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
  
      console.error(error);
    });
  }
  return (
    <SafeAreaView className="flex-1 text-2xl bg-white">
      <ScrollView className="h-full">
        <View className="w-full h-full px-4">
          <View className="relative mt-5">
            <Text className="text-4xl text-primary font-jbold pb-4">
              Sign Up
            </Text>
          </View>
          <FormField
            title={"Username"}
            value={form.firstName}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            otherStyles={"py-1"}
          />

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

          <FormField
            title={"Confirm Password"}
            value={form.confirmPassword}
            handleChangeText={(e: any) =>
              setForm({ ...form, confirmPassword: e })
            }
            otherStyles={"py-1"}
          />
          <RexButton
            title={"Sign Up"}
            handlePress={() => signUp()}
            containerStyles={"bg-primary w-full mt-8"}
            textStyles={"text-white"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
