import {
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  View,
  Text,
  ScrollView,
} from "react-native";
import { RecIcon } from "@/components/rex/RecIcon";
export default function RexCollectionRow({ recs, title }: any) {
  return (
    <>
      <Text className="text-lg mt-2 font-jsemibold">{title}</Text>
      <ScrollView
        horizontal
        nestedScrollEnabled={true}
        className="flex flex-row" // h-[285px]
      >
        {recs.length > 0 &&
          recs.map((item: any, index: number) => (
            <RecIcon
              key={index}
              rec={item.rec}
              sender={item.user}
              media={item.media}
              mediaCreators={item.media_creators}
            />
          ))}
        {!(recs.length > 0) && (
          <View className="">
            <Text className="text-base font-jsemibold text-gray-600">
              No Recs to display
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}
