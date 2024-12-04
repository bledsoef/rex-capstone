import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import Comment from "./Comment";
const RecComments = ({
  comments,
  recipient,
  sender,
  isSender,
  onCreateComment,
}: any) => {
  return (
    <View>
      <Text className="px-2 pb-2 font-jsemibold text-xl">Review Comments</Text>
      <View className="flex flex-col items-center justify-center">
        {comments &&
          comments.length > 0 &&
          comments.map((comment: any, index: any) => {
            return (
              <Comment
                sender={sender}
                recipient={recipient}
                key={index}
                comment={comment}
              />
            );
          })}
        {!comments ||
          (comments.length == 0 && (
            <Text className="text-xl p-4 font-jregular text-gray-700">
              No Comments Yet
            </Text>
          ))}
      </View>
    </View>
  );
};

export default RecComments;
