import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
  } from "react-native";
  import { ref, getDownloadURL } from "firebase/storage";
  import { storage } from "@/firebaseConfig";
  import { useEffect, useState } from "react";
  import { useLocalSearchParams } from "expo-router";
  import { Song } from "@/components/Song";
  import { images } from "@/constants";
  import { useMusicPlayer } from "@/components/globalContexts/PlayerContext";
  export default function RecHeader() {
    const { rec } = useLocalSearchParams();
  
    return (
      <SafeAreaView className="bg-white min-h-screen">
        <ScrollView className="h-full">
        </ScrollView>
      </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    image: {
      borderRadius: 150 / 2,
      overflow: "hidden",
    },
  });
  