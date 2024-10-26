import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { useUserContext } from "./UserContext";

const SongOptionsModal = ({ isVisible, onVisibilityChange, song }: any) => {
  const { currentUser } = useUserContext();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [update, setUpdate] = useState<number>(0);
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
  const likeSong = async () => {
    var res = await fetch("http://127.0.0.1:8000/likeSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song_id: song.id, user_id: currentUser.id }),
    });
    setUpdate(update + 1);
  };

  const unlikeSong = async () => {
    var res = await fetch("http://127.0.0.1:8000/unlikeSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song_id: song.id, user_id: currentUser.id }),
    });
    setUpdate(update + 1);
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
          <View className="h-1/2 bg-white p-[20px] rounded-t-xl" style={styles.modalContainer}>
            <Pressable
              className="px-2 py-3 border-t-[1px] border-slate-300  rounded-lg"
              onPress={isLiked ? unlikeSong : likeSong}
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
              onPress={isLiked ? unlikeSong : likeSong}
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
            {/* <Pressable
              onPress={() => onVisibilityChange(false)}
              className=" bg-blue-200 rounded-lg p-2"
            >
              <Text>Close</Text>
            </Pressable> */}
          </View>
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
