import { View, StyleSheet, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { useEffect, useState } from 'react';
export default function Home() {
  var currentUser = auth().currentUser
  // var profileUrl = storage().ref(`/${currentUser}.png`).getDownloadURL()
  const [imageUrl, setImageUrl] = useState<any>("")
  useEffect(() => {
    fetchImageDownloadUrl()
  }, [])
  async function fetchImageDownloadUrl() {
    storage().ref(`/profileImages/${currentUser}.png`).getDownloadURL()
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
        <View className="relative mt-5">
          <Text className="text-3xl text-primary font-jbold pb-4">
            Feed
          </Text>
          <Image source={imageUrl} resizeMode='contain' className='w-full h-[300px]"'></Image>
        </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
