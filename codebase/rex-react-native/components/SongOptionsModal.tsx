import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { useUserContext } from "./globalContexts/UserContext";
import { CreateRecModalContent } from "./rex/CreateRecModalContent";
import { AddToPlaylist } from "./playlist/AddToPlaylist";

const SongOptionsModal = ({ isVisible, onVisibilityChange, song }: any) => {
  const { currentUser } = useUserContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [update, setUpdate] = useState<number>(0);
  const [createRecModalVisible, setCreateRecModalVisible] =
    useState<boolean>(false);
  const [addToPlaylistVisible, setAddToPlaylistVisible] =
    useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/getLikedSongStatus?song_id=${song.id}`
        );
        const data = await response.json();
        setIsLiked(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [update]);
  const handleShowCreateRecModal = (bool: boolean) => {
    setContentVisible(!bool);
    setCreateRecModalVisible(bool);
  };
  const likeSong = async () => {
    await fetch("http://127.0.0.1:8000/likeSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song_id: song.id, user_id: currentUser.id }),
    });
  };

  const unlikeSong = async () => {
    await fetch("http://127.0.0.1:8000/unlikeSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song_id: song.id, user_id: currentUser.id }),
    });
  };

  const handleShowAddToPlaylist = (bool: boolean) => {
    setContentVisible(!bool);
    setAddToPlaylistVisible(bool);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => onVisibilityChange(false)}
      >
        <View className="flex-1 justify-end bg-transparent">
          <Pressable
            className="flex-1 justify-end bg-transparent"
            onPress={() => onVisibilityChange(false)}
          />
          {createRecModalVisible && (
            <CreateRecModalContent
              onContentVisibilityChange={handleShowCreateRecModal}
              selectedMediaOverride={song}
              selectedMediaTypeOverride={'album'}
              selectedMediaImageIDOverride={song.album_id}
              disableMediaSelect={true}
            />
          )}
          {addToPlaylistVisible && (
            <AddToPlaylist
              onContentVisibilityChange={handleShowAddToPlaylist}
              song={song}
            />
          )}
          {contentVisible && (
            <View
              className="h-2/3 bg-white p-[20px] rounded-t-xl"
              style={styles.modalContainer}
            >
              <Pressable
                className="px-2 py-3 border-t-[1px] border-slate-300  rounded-lg"
                onPress={() => handleShowCreateRecModal(true)}
              >
                <Text className="text-black text-xl font-jregular">Share</Text>
              </Pressable>
              <Pressable
                className="px-2 py-3 border-t-[1px] border-slate-300  rounded-lg"
                onPress={isLiked ? unlikeSong : likeSong}
              >
                <Text className="text-black text-xl font-jregular">
                  {isLiked ? "Remove From Liked Songs" : "Add to Liked Songs"}
                </Text>
              </Pressable>
              <Pressable
                className="px-2 py-3 border-t-[1px] border-slate-300  rounded-lg"
                onPress={() => handleShowAddToPlaylist(true)}
              >
                <Text className="text-black text-xl font-jregular">
                  Add To Playlist
                </Text>
              </Pressable>
              <Pressable
                className="px-2 py-3 border-t-[1px] border-slate-300  rounded-lg"
                onPress={isLiked ? unlikeSong : likeSong}
              >
                <Text className="text-black text-xl font-jregular">
                  Add To Queue
                </Text>
              </Pressable>
              <Pressable
                className="px-2 py-3 border-y-[1px] border-slate-300  rounded-lg"
                onPress={isLiked ? unlikeSong : likeSong}
              >
                <Text className="text-black text-xl font-jregular">
                  View Song Credits
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default SongOptionsModal;
