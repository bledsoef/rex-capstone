import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarSelector = ({ rating, onSelectRating }: any) => {
  const handlePress = (value: any) => {
    if (onSelectRating) {
      onSelectRating(value);
    }
  };

  return (
    <View >
      <Text className="px-2 pb-2 font-jsemibold text-xl">Rate this media</Text>
      <View className="flex flex-row items-center justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index + 1)}
            activeOpacity={0.7}
            className="mx-1"
          >
            <FontAwesome
              name={index < rating ? "star" : "star-o"}
              size={45}
              color={"#FFAE42"}
              className={index < rating ? "bg-yellow-500" : "bg-gray-400"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StarSelector;
