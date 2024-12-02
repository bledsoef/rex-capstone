import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Comment = ({ rating, onSelectRating, recID }: any) => {
  const handlePress = (value: any) => {
    if (onSelectRating) {
      onSelectRating(value);
    }
  };
  const [comments, setComments] = useState([]);
  const getRecComments = async () => {
    var res = await fetch(
      `http://127.0.0.1:8000/getRecComments?rec_id=${recID}`
    );
    var data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    async function fetchData() {
      await getRecComments();
    }
    fetchData();
  }, []);

  return (
    <View>
      <Text className="px-2 pb-2 font-jsemibold text-xl">Review Comments</Text>
      <View className="flex flex-col items-center justify-center"></View>
    </View>
  );
};

export default Comment;
