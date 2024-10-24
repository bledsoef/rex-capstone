import React, { Component } from "react";
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import { images } from "../constants";
import { RexButton } from "@/components/landingPage/RexButton";
import { Redirect, router } from "expo-router";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import auth from "@react-native-firebase/auth";
import { useUserContext } from "@/components/UserContext";
import { useColorScheme } from "react-native";
export default function Landing() {
  const { currentUser, profileImage, setProfileImage, setCurrentUser } = useUserContext();
  async function loginbledsoef() {
    async function fetchImageDownloadUrl(email: string) {
      const fileRef = ref(storage, `/profileImages/${email}.jpg`);
      getDownloadURL(fileRef)
        .then((res) => setProfileImage(res))
        .catch((error) => {
          console.error("Error getting download URL:", error);
        });
    }

    var res = await fetch(`http://127.0.0.1:8000/getUser?email=bledsoefinn0@gmail.com`)
    var user = await res.json()
    setCurrentUser(user)
    auth().signInWithEmailAndPassword("bledsoefinn0@gmail.com", "Fuzby2004") .then(() => {
      console.log('User signed in!');
    })
    .catch(error => {
      Alert.alert("unable to sign in")
  
      console.error(error);
      return
    });
    await fetchImageDownloadUrl(user["email"])
    router.replace("/home")
  }
  return (
    <SafeAreaView className="flex-1 text-2xl bg-primarywhite">
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
              className="text-7xl text-rex text-center font-jbold"
            >
              Rex
            </Text>
          </View>
          <RexButton
            title={"Log In"}
            handlePress={() => router.push("/(auth)/sign-in")}
            containerStyles={"bg-rex w-full"}
            textStyles={"text-primarywhite"}
          />
          <RexButton
            title={"Sign Up"}
            handlePress={() => router.push("/(auth)/sign-up")}
            containerStyles={"w-full"}
            textStyles={"text-rex"}
          />
          <RexButton            
            title={"Bypass with bledsoef"}
            handlePress={() => loginbledsoef()}
            containerStyles={"w-full"}
            textStyles={"text-rex"}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textWithShadow: {
    textShadowColor: "#1f1f1f", // Color of the shadow
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset (x and y)
    textShadowRadius: 1, // Shadow blur radius
  },
});
