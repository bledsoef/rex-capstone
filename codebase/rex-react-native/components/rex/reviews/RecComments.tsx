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
const RecComments = ({ comments, isSender, onCreateComment }: any) => {
  const [newComment, setNewComment] = useState("");
  const createComment = (comment: any) => {
    onCreateComment(comment);
  };
  const handleChangeComment = (e: any) => {
    setNewComment(e);
  };
  return (
    <View>
      <Text className="px-2 pb-2 font-jsemibold text-xl">Review Comments</Text>
      <View className="flex flex-col items-center justify-center">
        {comments &&
          comments.map((comment: any, index: any) => {
            return <Comment key={index} comment={comment} />;
          })}
        {!comments && (
          <Text className="text-xl p-4 font-jregular text-gray-700">
            No Comments Yet
          </Text>
        )}
      </View>
      <View className="flex flex-row justify-center items-center">
        <View className="flex flex-row items-center px-4 border-gray-100 w-5/6 p-4 bg-gray-100 rounded-2xl focus:border-rex">
          <TextInput
            multiline
            numberOfLines={4}
            maxLength={100}
            className="text-base flex-1 font-jregular w-full"
            placeholder="New comment"
            onChange={handleChangeComment}
            value={newComment}
          />
        </View>
        <Pressable className="p-3" onPress={() => createComment}>
          <Octicons size={25} color={'#50ba6f'} name={"paper-airplane"}/>
        </Pressable>
      </View>
    </View>
  );
};

export default RecComments;
