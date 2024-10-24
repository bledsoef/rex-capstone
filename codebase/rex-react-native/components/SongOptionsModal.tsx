import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { useUserContext } from "./UserContext";

const SongOptionsModal = ({ isVisible, onVisibilityChange, song }: any) => {
  const { currentUser } = useUserContext();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [update, setUpdate] = useState<number>(0)
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
    console.log(song.id)
    var res = await fetch("http://127.0.0.1:8000/likeSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song_id: song.id, user_id: currentUser.id }),
    });
    setUpdate(update+1)
  };

  const unlikeSong = async () => {
    console.log(song.id)
    var res = await fetch("http://127.0.0.1:8000/unlikeSong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ song_id: song.id, user_id: currentUser.id }),
    });
    setUpdate(update+1)
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
          <View style={styles.modalContainer}>
            {isLiked && (
              <Pressable onPress={unlikeSong}>
                <Text>Remove From Liked Songs</Text>
              </Pressable>
            )}
            {!isLiked && (
              <Pressable onPress={likeSong}>
                <Text>Add to Liked Songs</Text>
              </Pressable>
            )}

            <Pressable
              onPress={() => onVisibilityChange(false)}
              className="mt-[20px] bg-blue-200 rounded-lg p-2"
            >
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: "50%", // Half page
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default SongOptionsModal;
