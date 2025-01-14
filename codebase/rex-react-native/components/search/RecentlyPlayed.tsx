import { Pressable, Image, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useUserContext } from "../globalContexts/UserContext";
import { SongResult } from "./SongResult";
import { AlbumResult } from "./AlbumResult";
import { useMusicPlayer } from "../globalContexts/PlayerContext";
import { router } from "expo-router";
export function RecentlyPlayed() {
  const { currentSong, playSong } = useMusicPlayer();

  const { currentUser } = useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/recentlyPlayed?user_id=${currentUser["id"]}`
      );
      const data = await res.json();
      setRecentlyPlayed(data);
    };
    fetchData();
  }, []);
  const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
  return (
    <View>
      <Text className="py-1 font-jsemibold text-lg text-rex">
        Recently Played
      </Text>
      {recentlyPlayed && (
        <>
          {recentlyPlayed.map((media: any, index) => {
            return <SongResult
              key={index}
              album={media.album}
              artists={media.artists}
              song={media.song}
              onPress={() => playSong(media.song, media.album, media.artists)}
            ></SongResult>;
          })}
        </>
      )}
    </View>
  );
}
