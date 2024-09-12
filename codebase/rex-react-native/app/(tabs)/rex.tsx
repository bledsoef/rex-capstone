import { Image, StyleSheet, Platform } from 'react-native';

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
        const response = await fetch("http://127.0.0.1:8000/getPendingSentRecsForUser?username=bledsoef");
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
    <ScrollView>
      {sentRecs.map((rec, index) => (
        <ThemedText type="title">{rec.title}</ThemedText>
      ))}
      <Button onPress={apiCall} title={"Create Rec"}/>
    </ScrollView>
  )
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
