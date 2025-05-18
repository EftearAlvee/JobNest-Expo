import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

function RecruiterSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'recruiter'
  });

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

const handleSignup = async () => {
  try {
    const response = await fetch('http://192.168.0.104:8000/signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      Alert.alert('Success', result.message);

      if (result.user.role === "recruiter") {
        await AsyncStorage.setItem('user', JSON.stringify(result.user));
        await AsyncStorage.setItem('userRole', result.user.role);
        await AsyncStorage.setItem('userEmail', result.user.email);
        // Convert userId to string before storing
        await AsyncStorage.setItem('userId', String(result.user.id));

        console.log(result.user);
        
        router.push('/recruiter');
      }
    } else {
      Alert.alert('Error', result.message);
    }
  } catch (error) {
    Alert.alert('Error', 'Network request failed');
    console.error(error);
  }
};

  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc] justify-center">
        <View className='justify-center p-4 mb-12'>
                    {/* Header */}
        <View className="mb-8 items-center">
          <Text className="text-3xl font-bold text-[#3b82f6]">Create Account</Text>
          <Text className="text-gray-500 mt-2">Fill in your details to get started</Text>
        </View>

        {/* Form */}
        <View className="space-y-5">
          {/* Name Row */}
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-gray-700 mb-2">First Name</Text>
              <TextInput
                className="w-full h-14 px-4 bg-white rounded-xl border border-gray-200 text-gray-700"
                placeholder="John"
                value={formData.firstName}
                onChangeText={(text) => handleChange('firstName', text)}
                placeholderTextColor="#9ca3af"
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 mb-2">Last Name</Text>
              <TextInput
                className="w-full h-14 px-4 bg-white rounded-xl border border-gray-200 text-gray-700"
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={(text) => handleChange('lastName', text)}
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          {/* Email */}
          <View>
            <Text className="text-gray-700 mb-2">Email</Text>
            <TextInput
              className="w-full h-14 px-4 bg-white rounded-xl border border-gray-200 text-gray-700"
              placeholder="john.doe@example.com"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Phone */}
          <View>
            <Text className="text-gray-700 mb-2">Phone Number</Text>
            <TextInput
              className="w-full h-14 px-4 bg-white rounded-xl border border-gray-200 text-gray-700"
              placeholder="+1 (123) 456-7890"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => handleChange('phone', text)}
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Password */}
          <View>
            <Text className="text-gray-700 mb-2">Password</Text>
            <View className="relative">
              <TextInput
                className="w-full h-14 px-4 bg-white rounded-xl border border-gray-200 text-gray-700 pr-12"
                placeholder="Create password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity 
                onPress={togglePasswordVisibility}
                className="absolute right-4 top-4"
              >
                {showPassword ? (
                  <EyeSlashIcon size={24} color="#9ca3af" />
                ) : (
                  <EyeIcon size={24} color="#9ca3af" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View>
            <Text className="text-gray-700 mb-2">Confirm Password</Text>
            <View className="relative">
              <TextInput
                className="w-full h-14 px-4 bg-white rounded-xl border border-gray-200 text-gray-700 pr-12"
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity 
                onPress={toggleConfirmPasswordVisibility}
                className="absolute right-4 top-4"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon size={24} color="#9ca3af" />
                ) : (
                  <EyeIcon size={24} color="#9ca3af" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity 
            className="w-full h-14 bg-[#3b82f6] rounded-xl items-center justify-center mt-6 shadow-lg shadow-blue-200"
            onPress={handleSignup}
          >
            <Text className="text-white font-bold text-lg">Sign Up</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/job-seeker-login')}>
              <Text className="text-[#3b82f6] font-medium">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
    </SafeAreaView>
  );
}

export default RecruiterSignup;