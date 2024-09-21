import { View, StyleSheet, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native';
import auth from "@react-native-firebase/auth";
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
export default function Profile() {
  var currentUser = auth().currentUser
  // var profileUrl = storage().ref(`/${currentUser}.png`).getDownloadURL()
  const [imageUrl, setImageUrl] = useState<any>("")
  useEffect(() => {
    fetchImageDownloadUrl()
    console.log(imageUrl)
  }, [])
  async function fetchImageDownloadUrl() {
    const fileRef = ref(storage, `/profileImages/${currentUser?.email}.jpg`);
    var res = getDownloadURL(fileRef)
          .then((res) => setImageUrl(res))
          .catch((error) => {
          // Handle any errors
          console.error("Error getting download URL:", error);
          });
    }
  return (
   <SafeAreaView className='bg-white min-h-screen'>
    <ScrollView className="h-full">
      <View className="w-full h-full px-4">
        <View className="relative mt-5 flex flex-row justify-between">
          <Text className="text-3xl text-primary font-jbold pb-4">
            Feed
          </Text>
          <Pressable onPress={() => router.push("/")}>
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode='cover' className='w-[40] h-[40]'></Image>
          </Pressable>
        </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 150 / 2,
    overflow: "hidden",
  }
});