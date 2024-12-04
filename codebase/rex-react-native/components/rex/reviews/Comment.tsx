import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useUserContext } from "@/components/globalContexts/UserContext";

const Comment = ({ comment, sender, recipient }: any) => {
  const {currentUser} = useUserContext()
  return (
    <View className="w-full flex flex-col px-2 pb-2">
      <View className="flex flex-row">
        <Text className="text-base font-jlight"> 
          {comment.creator_id != currentUser.id && (comment.creator_id == sender.id ? sender.username : recipient.username)}
          {comment.creator_id == currentUser.id && "You"}
        </Text>
      </View>

      <Text className="font-jregular text-gray-700 text-xl">
        {comment.comment}
      </Text>
      <View className="flex flex-col items-center justify-center"></View>
    </View>
  );
};

export default Comment;
