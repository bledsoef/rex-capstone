import { useState } from "react";
import {
  Modal,
  View,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { useUserContext } from "../globalContexts/UserContext";
export function CreatePlaylistModal({
  isVisible,
  onModalVisibilityChange,
}: any) {
  const { currentUser } = useUserContext();
  const [playlistName, setPlaylistName] = useState<any>("");
  const handleShowModal = (bool: boolean) => {
    onModalVisibilityChange(bool);
  };
  const handleChangePlaylistName = (e: any) => {
    setPlaylistName(e);
  };

  const createPlaylist = async () => {
    await fetch("http://127.0.0.1:8000/createPlaylist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playlist_name: playlistName, user_id: currentUser.id }),
    });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => handleShowModal(false)}
      >
        <View className="flex-1 justify-end bg-transparent">
          <Pressable
            className="flex-1 justify-end bg-transparent"
            onPress={() => handleShowModal(false)}
          />
          <View
            className="h-5/6 bg-white p-[20px] rounded-t-xl"
            style={styles.modalContainer}
          >
            <Text className={`text-xl text-gray-900 font-jsemibold rounded-xl`}>
              Create Playlist
            </Text>
            <View className="flex-col flex w-full justify-center items-center space-y-3">
              <View className="border-2 flex flex-row items-center px-4 border-gray-100 w-full h-16 bg-gray-100 rounded-2xl focus:border-rex">
                <TextInput
                  className="text-xl flex-1 font-jregular w-full"
                  placeholder={"Playlist Name"}
                  placeholderTextColor={"#7b7b8b"}
                  value={playlistName}
                  onChangeText={handleChangePlaylistName}
                />
              </View>
              <Pressable
                className="p-2 rounded-lg bg-rex"
                onPress={createPlaylist}
              >
                <Text className="text-lg font-jregular text-white">Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});
