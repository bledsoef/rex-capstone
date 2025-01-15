import React, { createContext, useState, useContext } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { Audio } from "expo-av";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Create the context
const MusicPlayerContext = createContext<any>(null);

// Create a provider component
export const MusicPlayerProvider = ({ children }: any) => {
  const [currentUser, setMusicPlayerCurrentUser] = useState<any>(null);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAlbum, setCurrentAlbum] = useState<any>(null);
  const [currentArtists, setCurrentArtists] = useState<any[]>([]);
  const [position, setPosition] = useState<any>(0);
  const [totalLength, setTotalLength] = useState<any>(0);
  const [sound, setSound] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [update, setUpdate] = useState(0)
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
        return value;
      }
    } catch (e) {
      return null;
    }
  };
  const getAudioDownloadURL = async (songId: string) => {
    const fileRef = ref(storage, `/audioFiles/${songId}.mp3`);
    const res = await getDownloadURL(fileRef);
    return res;
  };
  const playSongAPICall = async (
    user_id: any,
    song_id: any,
    uniqueID: any,
    prev_song_id: any = null,
    prev_session_id: any = null,
    prev_timestamp: any = null
  ) => {
    await fetch("http://127.0.0.1:8000/playSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        song_id: song_id,
        session_id: uniqueID,
        prev_session_id: prev_session_id,
        prev_song_id: prev_song_id,
        prev_timestamp: prev_timestamp
      }),
    });
  };
  const pauseSongAPICall = async (
    user_id: any,
    song_id: any,
    uniqueID: any,
    timestamp: any
  ) => {
    await fetch("http://127.0.0.1:8000/pauseSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        song_id: song_id,
        session_id: uniqueID,
        timestamp: timestamp,
      }),
    });
  };
  const resumeSongAPICall = async (
    user_id: any,
    song_id: any,
    uniqueID: any,
    timestamp: any
  ) => {
    await fetch("http://127.0.0.1:8000/resumeSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        song_id: song_id,
        session_id: uniqueID,
        timestamp: timestamp,
      }),
    });
  };
  const playSong = async (song: any, album: any, artists: any) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const uniqueID = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    setSessionID(uniqueID);
    const prevSessionID = await getData("sessionID");
    var prevSongID = null;
    if (currentSong) {
      prevSongID = currentSong.id;
    }
    var prevTimestamp = null
    if (position) {
      prevTimestamp = position
    }
    await storeData("sessionID", uniqueID);
    setCurrentSong(song);
    playSongAPICall(
      currentUser.id,
      song.id,
      uniqueID,
      prevSongID,
      prevSessionID,
      prevTimestamp 
    );
    setCurrentAlbum(album);
    setCurrentArtists(artists);
    setTotalLength(1);
    setUpdate(update + 1)
    setPosition(0);
    const url = await getAudioDownloadURL(song.id); // Fetch audio URL immediately
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
    await newSound.playAsync(); //
    setIsPlaying(true);
  };

  const togglePlayPause = async () => {
    if (sound) {
      const sessionID = await getData("sessionID");
      if (isPlaying) {
        await sound.pauseAsync();
        pauseSongAPICall(currentUser.id, currentSong.id, sessionID, position);
      } else {
        await sound.playAsync();
        resumeSongAPICall(currentUser.id, currentSong.id, sessionID, position);
      }
      setIsPlaying(!isPlaying);
    }
  };

  // const skipSong = async () => {
  //   if (sound) {
  //     const sessionID = await getData("sessionID")
  //     if (isPlaying) {
  //       await sound.pauseAsync();
  //       pauseSongAPICall(currentUser.id, currentSong.id, sessionID)
  //     } else {
  //       await sound.playAsync();
  //       resumeSongAPICall(currentUser.id, currentSong.id, sessionID)
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

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
        update,
        currentUser,
        playSong,
        togglePlayPause,
        setSound,
        setPosition,
        setTotalLength,
        setSessionID,
        setMusicPlayerCurrentUser,
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
