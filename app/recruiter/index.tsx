import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const RecruiterDashboardScreen = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting = 'Good Morning';

  if (hours >= 12 && hours < 17) {
    greeting = 'Good Afternoon';
  } else if (hours >= 17 || hours < 5) {
    greeting = 'Good Evening';
  }

  const recentApplications = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Frontend Developer',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'David Smith',
      role: 'UI/UX Designer',
      status: 'Shortlisted',
    },
    {
      id: 3,
      name: 'Maria Gonzales',
      role: 'Backend Developer',
      status: 'Interview Scheduled',
    },
  ];

  const jobStats = {
    totalPosts: 12,
    totalApplications: 87,
    shortlisted: 21,
    interviews: 14,
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="px-5 pt-6" showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-500 text-lg font-medium">{greeting}</Text>
            <Text className="text-2xl font-bold text-gray-800">Welcome, Recruiter!</Text>
          </View>
          <TouchableOpacity className="border-2 border-blue-100 rounded-full p-1" onPress={() => router.push('/recruiter/profile')}>
            <Image
              source={require('../../assets/images/alvee2.jpg')}
              className="w-12 h-12 rounded-full"
            />
          </TouchableOpacity>
        </View>

        {/* Post a Job Button */}
        <TouchableOpacity 
          className="bg-blue-600 rounded-xl py-3 mb-6"
          onPress={() => router.push('/recruiter/profile')}
        >
          <Text className="text-center text-white font-bold text-lg">+ Post a New Job</Text>
        </TouchableOpacity>

        {/* Job Stats */}
        <View className="flex-row flex-wrap justify-between mb-8">
          <View className="bg-white p-4 rounded-xl w-[48%] mb-4 shadow-sm border border-gray-200">
            <Text className="text-2xl font-bold text-blue-600 text-center">{jobStats.totalPosts}</Text>
            <Text className="text-center text-gray-600 mt-1">Total Jobs</Text>
          </View>
          <View className="bg-white p-4 rounded-xl w-[48%] mb-4 shadow-sm border border-gray-200">
            <Text className="text-2xl font-bold text-green-600 text-center">{jobStats.totalApplications}</Text>
            <Text className="text-center text-gray-600 mt-1">Applications</Text>
          </View>
          <View className="bg-white p-4 rounded-xl w-[48%] shadow-sm border border-gray-200">
            <Text className="text-2xl font-bold text-purple-600 text-center">{jobStats.shortlisted}</Text>
            <Text className="text-center text-gray-600 mt-1">Shortlisted</Text>
          </View>
          <View className="bg-white p-4 rounded-xl w-[48%] shadow-sm border border-gray-200">
            <Text className="text-2xl font-bold text-yellow-600 text-center">{jobStats.interviews}</Text>
            <Text className="text-center text-gray-600 mt-1">Interviews</Text>
          </View>
        </View>

        {/* Recent Applications */}
        <View className="mb-24">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Recent Applications</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">View all</Text>
            </TouchableOpacity>
          </View>
          <View className="space-y-4">
            {recentApplications.map((applicant) => (
              <View key={applicant.id} className="bg-white p-5 rounded-xl shadow-sm shadow-gray-300 border border-gray-100 mb-5 ">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-lg font-bold text-gray-800">{applicant.name}</Text>
                  <MaterialIcons name="more-vert" size={20} color="#9CA3AF" />
                </View>
                <Text className="text-gray-600">{applicant.role}</Text>
                <Text className={`mt-2 text-sm font-medium ${applicant.status === 'Pending' ? 'text-yellow-500' : applicant.status === 'Shortlisted' ? 'text-green-600' : 'text-blue-600'}`}>
                  {applicant.status}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-around py-3 px-2 shadow-md shadow-gray-400">
        <TouchableOpacity className="items-center">
          <Ionicons name="home" size={24} color="#3B82F6" />
          <Text className="text-blue-500 text-xs mt-1 font-medium">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <MaterialIcons name="work-outline" size={24} color="#9CA3AF" />
          <Text className="text-gray-500 text-xs mt-1">Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="people-outline" size={24} color="#9CA3AF" />
          <Text className="text-gray-500 text-xs mt-1">Applicants</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={() => router.push('/recruiter/profile')}>
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
          <Text className="text-gray-500 text-xs mt-1">Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecruiterDashboardScreen;