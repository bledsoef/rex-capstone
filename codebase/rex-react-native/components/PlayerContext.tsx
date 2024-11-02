import React, { createContext, useState, useContext } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { Audio } from "expo-av";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "@/components/UserContext";

// Create the context
const MusicPlayerContext = createContext<any>(null);

// Create a provider component
export const MusicPlayerProvider = ({ children }: any) => {
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentArtists, setCurrentArtists] = useState<any[]>([]);
  const [position, setPosition] = useState<any>(0);
  const [totalLength, setTotalLength] = useState<any>(0);
  const [sound, setSound] = useState<any>(null);
  const [sessionID, setSessionID] = useState<any>(null);
  const storeData = async (key: any, value: any) => {
    try {
      await ReactNativeAsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  const getData = async (key: any) => {
    try {
      const value = await ReactNativeAsyncStorage.getItem(key);
      if (value !== null) {
        console.log(value)
      }
    } catch (e) {
      // error reading value
    }
  };
  const getAudioDownloadURL = async (songId: string) => {
    const fileRef = ref(storage, `/audioFiles/${songId}.mp3`);
    const res = await getDownloadURL(fileRef);
    return res;
  };
  const playSong = async (song: any, album: any, artists: any) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const uniqueID = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    setSessionID(uniqueID);
    await storeData("sessionID", uniqueID)
    setCurrentSong(song);
    setCurrentAlbum(album);
    setCurrentArtists(artists);
    setTotalLength(1);
    setPosition(0);
    await getData(uniqueID)
    const url = await getAudioDownloadURL(song.id); // Fetch audio URL immediately
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
    await newSound.playAsync(); //
    setIsPlaying(true);
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        currentAlbum,
        currentArtists,
        isPlaying,
        sound,
        position,
        totalLength,
        sessionID,
        playSong,
        togglePlayPause,
        setSound,
        setPosition,
        setTotalLength,
        setSessionID,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useMusicPlayer = () => {
  return useContext(MusicPlayerContext);
};
