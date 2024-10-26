import { Pressable, Image, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useUserContext } from "../UserContext";
import { SongResult } from "./SongResult";
import { AlbumResult } from "./AlbumResult";
import { useMusicPlayer } from "../PlayerContext";
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
      {recentlyPlayed && (
        <>
          {recentlyPlayed.map((media: any, index) => (
            <>
              {media.type == "song" && (
                <SongResult
                  key={index}
                  album={media.album}
                  artists={media.artists}
                  song={media.song}
                  onPress={() => playSong(media.song, media.album, media.artists)}
                ></SongResult>
              )}
              {media.type == "album" && (
                <AlbumResult
                  key={index}
                  album={media.album}
                  artists={media.artists}
                  onPress={() => {router.push(`/(tabs)/album/${media.album["id"]}`)}}
                ></AlbumResult>
              )}
            </>
          ))}
        </>
      )}
    </View>
  );
}
