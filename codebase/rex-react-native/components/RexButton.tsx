import { Link } from 'expo-router';
import { type ComponentProps } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export function RexButton({ title, handlePress, containerStyles, textStyles, isLoading }: any) {
    return (
    <TouchableOpacity
        className={`rounded-xl justify-center items-center ${containerStyles}`}
        onPress={handlePress}
        activeOpacity={0.7}
        >
        <Text className={`font-jsemibold text-2xl p-4 ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
    )
}
