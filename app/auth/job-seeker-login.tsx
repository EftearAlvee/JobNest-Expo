import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function JobSeekerLogin() {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };  

    const handleLogin = () => {
      console.log(password);
      router.push('/seeker');
    };

  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc]">
      <View className="flex-1 justify-center px-6 pt-10">
        {/* Header */}
        <View className="items-center mb-12">
          <Image 
            source={require('../../assets/images/icon.png')}
            className="w-32 h-32 mb-4"
          />
          <Text className="text-3xl font-bold text-[#3b82f6]">Welcome Back</Text>
          <Text className="text-gray-500 mt-2">Sign in to continue your job search</Text>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Email Input */}
          <View>
            <Text className="text-gray-700 mb-2">Email</Text>
            <TextInput
              className="w-full h-14 px-5 bg-white rounded-xl border border-gray-200 text-gray-700"
              placeholder="Enter your email"
              keyboardType="email-address"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Password Input */}
          <View>
        <Text className="text-gray-700 mb-2">Password</Text>
        <View className="relative">
          <TextInput
            className="w-full h-14 px-5 bg-white rounded-xl border border-gray-200 text-gray-700 pr-12" // Added pr-12 for icon spacing
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            className="absolute right-4 top-4"
          >
            {showPassword ? (
              <MaterialCommunityIcons name="eye-off-outline"  size={24} color="#40189D" />
            ) : (
              <MaterialCommunityIcons name="eye-outline"  size={24} color="#40189D" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="self-end mt-2 mb-2">
          <Text className="text-[#3b82f6] text-sm">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

          {/* Login Button */}
          <TouchableOpacity className="w-full h-14 bg-primary rounded-xl items-center justify-center shadow-lg shadow-blue-200" onPress={handleLogin}>
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="px-4 text-gray-500">OR</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Login */}
          <View className="flex-row justify-center gap-10 space-x-4">
            <TouchableOpacity className="w-24 h-14 bg-white rounded-xl items-center justify-center shadow-sm border border-gray-100">
              <Image 
                source={require('../../assets/images/google.png')}
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="w-24 h-14 bg-white rounded-xl items-center justify-center shadow-sm border border-gray-100">
              <Image 
                source={require('../../assets/images/facebook.png')}
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/job-seeker-signup')}>
            <Text className="text-[#3b82f6] font-medium">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView> 
  );
}