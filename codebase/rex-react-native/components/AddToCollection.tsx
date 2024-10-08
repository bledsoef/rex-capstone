import { View, Pressable, Text } from "react-native";
export default function AddToCollection({
  acceptedStatus,
  recID,
  userID,
}: any) {
  const addToCollection = async () => {
    const response = await fetch(`http://127.0.0.1:8000/addToCollection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recID: recID, userID: userID }),
    });
  };
  return (
    <View>
      {acceptedStatus != true && (
        <Pressable
          onPress={addToCollection}
          className="border rounded-xl border-rex p-2"
        >
          <Text className="text-rex font-jbold text-base">Accept Rec</Text>
        </Pressable>
      )}
      {acceptedStatus == true && (
        <Pressable className="border rounded-xl border-rex  bg-rex p-2">
          <Text className="text-white font-jbold text-base">Accepted</Text>
        </Pressable>
      )}
    </View>
  );
}
