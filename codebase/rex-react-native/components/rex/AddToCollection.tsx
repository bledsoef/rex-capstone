import { useEffect, useState } from "react";
import { View, Pressable, Text } from "react-native";
export default function AddToCollection({
  recID,
  userID,
}: any) {
  const [isAccepted, setIsAccepted] = useState<any>(false)
  const addToCollection = async () => {
    const response = await fetch(`http://127.0.0.1:8000/addToCollection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recID: recID, userID: userID }),
    });
    fetchData()
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/checkPostStatus?rec_id=${recID}&user_id=${userID}`
      );
      const data = await response.json();
      if (!data) {
        setIsAccepted(false);
      } else {
        setIsAccepted(true)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <View>
      {isAccepted != true && (
        <Pressable
          onPress={addToCollection}
          className="border rounded-xl border-rex p-2"
        >
          <Text className="text-rex font-jbold text-base">Accept Rec</Text>
        </Pressable>
      )}
      {isAccepted == true && (
        <Pressable className="border rounded-xl border-rex  bg-rex p-2">
          <Text className="text-white font-jbold text-base">Accepted</Text>
        </Pressable>
      )}
    </View>
  );
}
