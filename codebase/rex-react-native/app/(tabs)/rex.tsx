import { Image, StyleSheet, Platform } from 'react-native';

import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ScrollView } from 'react-native-gesture-handler';

export default function Library() {
  useEffect(() => {
    async function apiCall() {
      console.log("baseroute", process.env.BASE_ROUTE)
      var response = await fetch(`127.0.0.1:8000/getSentRecsForUser`)
      var data = await response.json()
      setSentRecs(data)
    }
    apiCall()
  }, [])
  const [sentRecs, setSentRecs] = useState([])
  return (
    <ScrollView>
      {sentRecs.map((item, index) => (
        <ThemedText type="title">Welcome!</ThemedText>
      ))}
    </ScrollView>
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
