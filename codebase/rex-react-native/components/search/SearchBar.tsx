import {
  View,
  TextInput,
} from "react-native";

export function SearchBar({
  handleChangeText,
  otherStyles,
  placeholder,
  value,
  type
}: any) {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="border-2 flex flex-row items-center px-4 border-gray-100 w-full h-16 bg-gray-100 rounded-2xl focus:border-primary">
        <TextInput
          className="text-base flex-1 font-jregular w-full"
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          value={value}
          onChangeText={handleChangeText}
          keyboardType={type}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}
