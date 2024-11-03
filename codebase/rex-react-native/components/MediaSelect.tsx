import {
  Text,
  Pressable,
  View,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { SearchBar } from "@/components/search/SearchBar";
import { SongResult } from "@/components/search/SongResult";
import { useState } from "react";
import { AlbumResult } from "@/components/search/AlbumResult";
import { RecentlyPlayed } from "@/components/search/RecentlyPlayed";
import { AntDesign } from "@expo/vector-icons";
import { useMusicPlayer } from "./globalContexts/PlayerContext";
export default function MediaSelect({
  onSelect,
  onBack,
  selectedMedia,
  selectedMediaType,
}: any) {
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

  const [searchQuery, setSearchQuery] = useState<any>("");
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const back = () => {
    onBack();
  };
  return (
    <View>
      <Pressable
        className="flex flex-row items-center space-x-1"
        onPress={back}
      >
        <AntDesign size={15} name={"arrowleft"} />
        <Text className="font-jsemibold">Back</Text>
      </Pressable>
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
                  selected={selectedMedia && ((song.song.id == selectedMedia.id) && (selectedMediaType == 'song'))}
                  onPress={() => onSelect(song.song, song.song.album_id, "song")}
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
                  onPress={() => {
                    onSelect(album.album, album.album.id, "album");
                  }}
                ></AlbumResult>
              );
            })}
        </>
      )}
      {!searchQuery && <RecentlyPlayed />}
    </View>
  );
}
const styles = StyleSheet.create({
  dropdown: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 5,
    maxHeight: 200, // Limit height to avoid overflowing screen
    padding: 10,
  },
});
