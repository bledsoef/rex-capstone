import {
  Pressable,
  View,
  Text,
} from "react-native";
export function SendingReceivedToggle({ onToggle, toggleStatus }: any) {
  return (
    <View className="w-full justify-center items-center">
      <View className="bg-gray-200 flex-row flex rounded-xl w-11/12">
        <Pressable
          onPress={() => onToggle("received")}
          className={`w-1/2 items-center py-1 px-2 ${
            toggleStatus == "received" && "bg-rex rounded-xl"
          }`}
        >
          <Text
            className={`font-jregular text-lg ${
              toggleStatus == "received" && "text-white"
            }`}
          >
            Received
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onToggle("sent")}
          className={`w-1/2 items-center py-1 px-2 ${
            toggleStatus == "sent" && "bg-rex text-white rounded-xl"
          }`}
        >
          <Text
            className={`font-jregular text-lg ${
              toggleStatus == "sent" && "text-white"
            }`}
          >
            Sent
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
