import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function index() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAF6FF] items-center justify-start">
      {/* Logo */}
      <View className="items-center mt-20 mb-10">
        <View className="w-44 h-44 rounded-full bg-[#4116B1] items-center justify-center mb-5">
          <Text className="text-white text-[120px] font-bold italic ml-5 mt-2">J</Text>
        </View>
        <Text className="text-[48px] font-bold italic text-[#333] mb-1">Jobie</Text>
        <Text className="text-[20px] text-[#222] opacity-70 mb-2">Job Portal iOS App</Text>
      </View>

      <View className="w-full items-start mt-8">
      <Text className="text-[36px] mx-6 text-start font-bold text-[#111] mb-2">Continue as</Text>
        <Text className="text-[18px] text-[#555] text-start mx-8 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Text>
      </View>

      {/* Continue as */}
      <View className="w-full items-center mt-8">
        {/* Job Seekers Card */}
        <TouchableOpacity className="flex-row items-center bg-white rounded-3xl p-6 my-2 w-11/12 shadow-lg shadow-[#4116B1]/10" 
        onPress={() => router.push('/auth/job-seeker-login')}>
            
          <Text className="text-[64px] mr-4">👩‍💼</Text>
          <View className="flex-1">
            <Text className="text-[22px] font-bold text-[#4116B1] mb-1 tracking-wider">JOB SEEKERS</Text>
            <Text className="text-[17px] text-[#222]">Finding a job here never been easier than before</Text>
          </View>
        </TouchableOpacity>

        {/* Company Card */}
        <TouchableOpacity className="flex-row items-center bg-white rounded-3xl p-6 my-2 w-11/12 shadow-lg shadow-[#4116B1]/10"
        onPress={() => router.push('/auth/recruiter-login')}>
          <Text className="text-[64px] mr-4">👨‍💼</Text>
          <View className="flex-1">
            <Text className="text-[22px] font-bold text-[#4116B1] mb-1 tracking-wider">COMPANY</Text>
            <Text className="text-[17px] text-[#222]">Let&apos;s recruit your great candidate faster here</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}