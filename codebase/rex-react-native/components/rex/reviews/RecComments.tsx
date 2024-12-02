import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Comment from "./Comment";
const RecComments = ({ comments }: any) => {

  return (
    <View>
      <Text className="px-2 pb-2 font-jsemibold text-xl">Review Comments</Text>
      <View className="flex flex-col items-center justify-center">
        {comments &&
          comments.map((comment: any, index: any) => {
            return <Comment key={index} comment={comment} />;
          })}
      </View>
    </View>
  );
};

export default RecComments;
