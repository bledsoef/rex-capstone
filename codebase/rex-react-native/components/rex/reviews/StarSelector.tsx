import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarSelector = ({ rating, isSender, recipient, onSelectRating }: any) => {
  const handlePress = (value: any) => {
    if (onSelectRating) {
      onSelectRating(value);
    }
  };

  return (
    <View>
      {!isSender && (
        <Text className="mx-2 font-jsemibold text-xl">
          Rate this media
        </Text>
      )}
      {isSender && (
        <Text className="mx-2 font-jsemibold text-xl">Rating</Text>
      )}

      {(!isSender || rating != 0) && (
        <View className="flex flex-row items-center justify-center p-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={!isSender ? () => handlePress(index + 1) : () => {}}
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
      )}
      {isSender && !rating && (
        <View className="flex flex-row items-center justify-center p-4">
          <Text className="text-xl font-jregular text-gray-700">No Rating Yet</Text>
        </View>
      )}
    </View>
  );
};

export default StarSelector;
