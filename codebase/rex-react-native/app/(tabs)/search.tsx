import { Text, SafeAreaView, View } from "react-native";
import { SearchBar } from "@/components/search/SearchBar";
import { SongResult } from "@/components/search/SongResult";
import { useState } from "react";
import { AlbumResult } from "@/components/search/AlbumResult";
import { RecentlyPlayed } from "@/components/search/RecentlyPlayed";
import { useMusicPlayer } from "@/components/PlayerContext";
export default function Search() {
  const queryDB = async (searchQuery: any) => {
    const res = await fetch(
      `http://127.0.0.1:8000/search?query=${searchQuery}`
    );
    const data = await res.json();
    setAlbums(data["albums"]);
    setArtists(data["artists"]);
    setSongs(data["songs"]);
  };
  const handleSetSearchQuery = (query: any) => {
    setSearchQuery(query);
    queryDB(query);
  };
  const { currentSong, playSong } = useMusicPlayer();
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);

  return (
    <SafeAreaView className="bg-white min-h-screen">
      <View className={"p-5"}>
        <SearchBar
          placeholder={"Search"}
          value={searchQuery}
          handleChangeText={(e: any) => handleSetSearchQuery(e)}
          otherStyles={"py-1"}
        />
        {searchQuery && (
          <>
            <Text className="text-xl font-jsemibold">Results</Text>
            {songs &&
              songs.map((song, index) => {
                return (
                  <SongResult
                    key={index}
                    album={song.album}
                    artists={song.artists}
                    song={song.song}
                    onPress={() => playSong(song.song, song.album, song.artists)}
                  ></SongResult>
                );
              })}
            {/* {artists &&
          artists.map((artist, index) => {
            return (
              <Song
                key={index}
                album={artist.album}
                artist={artist.artist}
                song={artist.song}
              ></Song>
            );
          })} */}
            {albums &&
              albums.map((album, index) => {
                return (
                  <AlbumResult
                    key={index}
                    album={album.album}
                    artists={album.artists}
                  ></AlbumResult>
                );
              })}
          </>
        )}
        {!searchQuery && <RecentlyPlayed />}
      </View>
    </SafeAreaView>
  );
}
