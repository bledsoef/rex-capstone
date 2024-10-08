import { Link } from "expo-router";
import { useState, type ComponentProps } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Pressable,
  Image
} from "react-native";

import { icons } from "@/constants";

export function FormField({
  title,
  handleChangeText,
  otherStyles,
  placeholder,
  value,
  type
}: any) {
  const [showPassword, setShowPassword] = useState<any>();
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-base text-gray-900 font-jregular rounded-xl`}>
        {title}
      </Text>
      <View className="border-2 flex flex-row items-center px-4 border-gray-100 w-full h-16 bg-gray-100 rounded-2xl focus:border-rex">
        <TextInput
          className="text-base flex-1 font-jregular w-full"
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title.includes("Password") && !showPassword}
          keyboardType={type}
          autoCapitalize="none"
        />
        {title.includes("Password") && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Image className='w-6 h-6' resizeMode="contain" source={!showPassword ? icons.eye : icons.eyeHide}/>
          </Pressable>
        )}
      </View>
    </View>
  );
}
