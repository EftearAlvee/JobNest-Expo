import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DashboardScreen = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting = 'Good Morning';

  if (hours >= 12 && hours < 17) {
    greeting = 'Good Afternoon';
  } else if (hours >= 17 || hours < 5) {
    greeting = 'Good Evening';
  }

  const recommendedJobs = [
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      salary: '$500 - $1,000',
      location: 'Jakarta, Indonesia'
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Creative Minds',
      salary: '$600 - $1,200',
      location: 'Bandung, Indonesia'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Innovate Co.',
      salary: '$800 - $1,500',
      location: 'Singapore'
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Junior Software Engineer',
      company: 'Highspeed Studios',
      salary: '$500 - $1,000',
      location: 'Jakarta, Indonesia'
    },
    {
      id: 2,
      title: 'Database Engineer',
      company: 'Lunar Digia Corp.',
      salary: '$500 - $1,000',
      location: 'London, United Kingdom'
    },
    {
      id: 3,
      title: 'Senior Software Engineer',
      company: 'Darksear Studios',
      salary: '$500 - $1,000',
      location: 'Medan, Indonesia'
    }
  ];

  const categories = ['All', 'Design', 'Development', 'Marketing', 'Business', 'Finance', 'Remote'];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Header with Greeting */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-500 text-lg font-medium">{greeting}</Text>
            <Text className="text-2xl font-bold text-gray-800">Henry Kamwil</Text>
          </View>
          <TouchableOpacity className="border-2 border-blue-100 rounded-full p-1" onPress={() => router.push('/seeker/seekerProfile')}>
            <Image
              source={require('../../assets/images/alvee2.jpg')}
              className="w-12 h-12 rounded-full"
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
       <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-8 border-2 border-blue-200 shadow-sm shadow-blue-100">
  <MaterialIcons name="search" size={24} color="#3B82F6" />
  <TextInput
    className="flex-1 ml-2 text-gray-700 text-base"
    placeholder="Search job here..."
    placeholderTextColor="#9CA3AF"
  />
  <TouchableOpacity className="ml-2">
    <MaterialIcons name="tune" size={24} color="#3B82F6" />
  </TouchableOpacity>
</View>

        {/* Stats Cards */}
        <View className="flex-row justify-between mb-8">
          <View className="bg-white p-5 rounded-xl w-[48%] shadow-sm shadow-blue-200 border border-blue-100">
            <Text className="text-2xl font-bold text-center text-blue-600">29</Text>
            <Text className="text-gray-600 text-center mt-1">Jobs Applied</Text>
          </View>
          <View className="bg-white p-5 rounded-xl w-[48%] shadow-sm shadow-green-200 border border-green-100">
            <Text className="text-2xl font-bold text-center text-green-600">23</Text>
            <Text className="text-gray-600 text-center mt-1">Interviews</Text>
          </View>
        </View>

        {/* Categories Section */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={category} 
                className={`px-4 py-2 rounded-full mr-3 ${index === 0 ? 'bg-blue-100 border border-blue-200' : 'bg-white border border-gray-200'}`}
              >
                <Text className={`${index === 0 ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended Jobs - Horizontal Scroll */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Recommended Jobs</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-4">
            {recommendedJobs.map((job) => (
              <View key={job.id} className="bg-white p-5 rounded-xl mr-4 w-64 shadow-sm shadow-gray-300 border border-gray-100">
                <View className="flex-row justify-between items-start mb-3">
                  <Text className="font-bold text-gray-800">{job.company}</Text>
                  <MaterialIcons name="bookmark-border" size={24} color="#9CA3AF" />
                </View>
                <Text className="text-lg font-bold text-gray-800 mb-1">{job.title}</Text>
                <Text className="text-gray-500 mb-2">{job.location}</Text>
                <Text className="text-blue-600 font-bold">{job.salary}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Jobs */}
        <View className="mb-24">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Recent Jobs</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">View all</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {recentJobs.map((job) => (
              <View key={job.id} className="bg-white p-5 rounded-xl shadow-sm shadow-gray-300 border border-gray-100 mb-5">
                <View className="flex-row justify-between items-start mb-3">
                  <Text className="font-bold text-gray-800">{job.company}</Text>
                  <MaterialIcons name="bookmark-border" size={24} color="#9CA3AF" />
                </View>
                <Text className="text-lg font-bold text-gray-800 mb-1">{job.title}</Text>
                <Text className="text-gray-500 mb-2">{job.location}</Text>
                <Text className="text-blue-600 font-bold">{job.salary}</Text>
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
          <FontAwesome name="calendar" size={20} color="#9CA3AF" />
          <Text className="text-gray-500 text-xs mt-1">Interviews</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#9CA3AF" />
          <Text className="text-gray-500 text-xs mt-1">Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center" onPress={() => router.push('/seeker/seekerProfile')}>
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
          <Text className="text-gray-500 text-xs mt-1">Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;