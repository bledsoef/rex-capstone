import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
} from "react-native";
import { FormField } from "@/components/FormField";
import { useState } from "react";
export default function Search() {
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [results, setResults] = useState<any[]>([]);
  return (
    <SafeAreaView className="bg-white min-h-screen">
      <View className={"p-5"}>
        <FormField
          title={"Username"}
          placeholder={"Search"}
          value={searchQuery}
          handleChangeText={(e: any) => setSearchQuery(e)}
          otherStyles={"py-1"}
        />
        {results?.map((result, index) => (
          <Text/>
        ))}
      </View>
    </SafeAreaView>
  );
}
