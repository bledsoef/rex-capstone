import React, { createContext, useState, useContext } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { Audio } from "expo-av";

// Create the context
const MusicPlayerContext = createContext<any>(null);

// Create a provider component
export const MusicPlayerProvider = ({ children }: any) => {
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAlbum, setCurrentAlbum] = useState<any>(null)
  const [currentArtists, setCurrentArtists] = useState<any[]>([])
  const [sound, setSound] = useState<any>(null);
  const getAudioDownloadURL = async (songId: string) => {
    const fileRef = ref(storage, `/audioFiles/${songId}.mp3`);
    const res = await getDownloadURL(fileRef);
    return res;
  };
  const playSong = async (song: any, album: any, artists: any) => {
    if (sound) {
      await sound.unloadAsync();
    }

    setCurrentSong(song);
    setCurrentAlbum(album)
    setCurrentArtists(artists)
    const url = await getAudioDownloadURL(song.id);  // Fetch audio URL immediately
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
    setSound(newSound);
  
    await newSound.playAsync();  // 
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
        playSong,
        togglePlayPause,
        setSound,
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