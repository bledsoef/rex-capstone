import { Image, StyleSheet, Platform, SafeAreaView, View } from 'react-native';

import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native';

export default function Library() {
  async function apiCall() {
    var rec_data = {
      "title": "Test",
      "body": "Super sweet song",
      "sender_id": "bledsoef",
      "recipient_id": "bahrs",
      "created_at": Date(),
      "song_id": 1,
      "is_post": false
    }
    var response = await fetch(`http://127.0.0.1:8000/createRec`, 
      {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(rec_data),
      }
    )
    var data = await response.json()
    setSentRecs(data)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/getPendingSentRecsForUser?username=1");
        const data = await response.json();
        setSentRecs(data);
        console.log("sentRecs",sentRecs)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])
  const [sentRecs, setSentRecs] = useState<any[]>([])
  return (
    <SafeAreaView>
      <View>
        {sentRecs.map((rec, index) => (
          <ThemedText key={index} type="title">{rec.title}</ThemedText>
        ))}
        <Button onPress={apiCall} title={"Create Rec"}/>
      </View>
    </SafeAreaView>
  )
}
