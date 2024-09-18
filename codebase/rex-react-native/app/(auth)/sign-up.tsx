import React, { Component, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { Text, ScrollView, SafeAreaView, View, Image, StyleSheet} from 'react-native'
import { RexButton } from '@/components/RexButton'
import { Redirect, router } from 'expo-router'

export default function SignUp() {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  function login() {
    auth().signInWithEmailAndPassword(email, password)
  }
    return (
      <SafeAreaView
        className="flex-1 text-2xl bg-white">
          <ScrollView className='h-full'>
            <View className='w-full justify-center items-center h-full px-4'>
              <View className='relative mt-5'>
                <Text style={styles.textWithShadow} className='text-7xl text-primary text-center font-jbold'>
                  Rex
                </Text>
              </View>
              <RexButton title={"Log In"} handlePress={() => router.push('/sign-in')} containerStyles={"bg-primary w-full"} textStyles={"text-white"}/>
              <RexButton title={"Sign Up"} handlePress={() => router.push('/sign-up')} containerStyles={"bg-white w-full"} textStyles={"text-primary"}/>
            </View>
          </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  textWithShadow: {
    textShadowColor: '#D3D3D3', // Color of the shadow
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset (x and y)
    textShadowRadius: 1, // Shadow blur radius
  },
});