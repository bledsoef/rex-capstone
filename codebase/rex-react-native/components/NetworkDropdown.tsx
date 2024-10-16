import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const NetworkDropdown = ({
  options,
  onSelect,
  placeholder = "Recipients",
}: any) => {
  const [visible, setVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const handleSelect = (option: any) => {
    let newSelectedOptions = [...selectedOptions];
    if (selectedOptions.some((o: any) => o.value === option.value)) {
      newSelectedOptions = newSelectedOptions.filter(
        (o) => o.value !== option.value
      );
    } else {
      newSelectedOptions.push(option);
    }
    setSelectedOptions(newSelectedOptions);
    onSelect(newSelectedOptions);
  };

  const renderItem = ({ item }: any) => {
    const isSelected = selectedOptions.some((o: any) => o.value === item.value); // Check if item is selected
    return (
      <Pressable className="p-2" onPress={() => handleSelect(item)}>
        <Text
          className={`${isSelected && "text-rex font-jsemibold"} ${
            !isSelected && "font-jregular"
          } text-lg`}
          style={[styles.optionText, isSelected && styles.selectedOptionText]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View className="w-full">
      <Pressable
        className="w-full p-3 px-4 space-x-2 border-[1px] border-[#ccc] flex-row items-center justify-between flex rounded-xl bg-white"
        onPress={() => setVisible(true)}
      >
        <Text className="font-jregular text-lg">{placeholder}</Text>
        <AntDesign name="caretdown" size={13}/>
      </Pressable>

      <Modal visible={visible} transparent={true} animationType="fade">
        <Pressable
          className="flex-1 justify-center items-center"
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default NetworkDropdown;

const styles = StyleSheet.create({
  dropdown: {
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 5,
    maxHeight: 200, // Limit height to avoid overflowing screen
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: "bold",
    color: "green",
  },
});
