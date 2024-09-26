import React, { createContext, useState, useContext } from "react";

// Create the context
const MusicPlayerContext = createContext<any>(null);

// Create a provider component
export const MusicPlayerProvider = ({ children }: any) => {
  const [currentSong, setCurrentSong] = useState<any>({ name: "Banquet", artist: "Bloc Party", id: 2 });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAlbum, setCurrentAlbum] = useState<any>({id: 1})
  const [sound, setSound] = useState<any>(null);

  const playSong = async (song: any) => {
    if (sound) {
      await sound.unloadAsync();
    }

    setCurrentSong(song);
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