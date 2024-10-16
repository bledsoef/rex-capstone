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
export default function MediaSelect({ onSelect }: any) {
  const queryDB = async (searchQuery: any) => {
    const res = await fetch(
      `http://127.0.0.1:8000/search?query=${searchQuery}`
    );
    const data = await res.json();
    setAlbums(data["albums"]);
    setArtists(data["artists"]);
    setSongs(data["songs"]);
    console.log(albums);
  };
  const handleSetSearchQuery = (query: any) => {
    setSearchQuery(query);
    queryDB(query);
  };

  const [searchQuery, setSearchQuery] = useState<any>("");
  const [albums, setAlbums] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const handleSelect = (option: any) => {
    if (selectedMedia == option) {
      setSelectedMedia(null);
    } else {
      setSelectedMedia(option);
    }
    onSelect(selectedMedia);
  };

  const renderItem = ({ item }: any) => {
    return (
      //   <Pressable className="p-2" onPress={() => handleSelect(item)}>
      //     <Text className={`${"text-rex font-jregular"} text-lg`}>
      //       {item.album.title}
      //     </Text>
      //   </Pressable>
      <AlbumResult
        album={item.album}
        artists={item.artists}
      ></AlbumResult>
    );
  };
  return (
    <View>
      <SearchBar
        className="flex-1 justify-center items-center"
        placeholder={"Select Media"}
        value={searchQuery}
        handleChangeText={(e: any) => handleSetSearchQuery(e)}
        otherStyles={"py-1"}
      />

      <Modal
        visible={searchQuery.length != 0}
        transparent={true}
        animationType="fade"
      >
        <Pressable
          className="flex-1 justify-center items-center"
          onPress={() => setVisible(false)}
        >
          <View className="w-5/6 bg-white rounded-sm">
            {albums && (
              <FlatList
                data={albums}
                renderItem={renderItem}
                keyExtractor={(item: any) => {
                  console.log(item);
                  return item.album.id.toString();
                }}
              />
            )}
          </View>
        </Pressable>
        {/* {songs &&
          songs.map((song, index) => {
            return (
              <SongResult
                key={index}
                album={song.album}
                artists={song.artists}
                song={song.song}
              ></SongResult>
            );
          })} */}
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
        {/* {albums &&
          albums.map((album, index) => {
            return (
              <AlbumResult
                key={index}
                album={album.album}
                artists={album.artists}
              ></AlbumResult>
            );
          })} */}
      </Modal>
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
