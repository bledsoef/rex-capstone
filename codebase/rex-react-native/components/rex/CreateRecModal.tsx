import {
  Modal,
  View,
  Pressable,
} from "react-native";
import { CreateRecModalContent } from "./CreateRecModalContent";
export function CreateRecModal({
  isVisible,
  onModalVisibilityChange,
}: any) {
  const handleShowModal = (bool: boolean) => {
    onModalVisibilityChange(bool);
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
          <CreateRecModalContent onContentVisibilityChange={handleShowModal} />
        </View>
      </Modal>
    </View>
  );
}
