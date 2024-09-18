import React, { Component, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { Text, ScrollView, SafeAreaView, View, Image, StyleSheet} from 'react-native'
import { FormField } from '@/components/FormField'
import { Redirect, router } from 'expo-router'

export default function SignIn() {
  const [form, setForm] = useState<any>(
    {
      email: "",
      password: ""
    }
  )
  function login() {
    auth().signInWithEmailAndPassword(form.email, form.email)
  }
    return (
      <SafeAreaView
        className="flex-1 text-2xl bg-white">
          <ScrollView className='h-full'>
            <View className='w-full justify-center items-center h-full px-4'>
              <View className='relative mt-5'>
                <Text 
                  style={styles.textWithShadow} 
                  className='text-7xl text-primary text-center font-jbold'>
                  Rex
                </Text>
              </View>
              <FormField 
                title={"Email"} 
                value={form.email} 
                handlePress={(e: any) => setForm({...form, email: e})} 
                containerStyles={"bg-primary w-full"} 
                textStyles={"text-white"} 
                type={"email-address"}
              />
              <FormField 
                title={"Password"} 
                value={form.password} 
                handlePress={(e: any) => setForm({...form, password: e})} 
                containerStyles={"bg-primary w-full"} 
                textStyles={"text-white"}
              />

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