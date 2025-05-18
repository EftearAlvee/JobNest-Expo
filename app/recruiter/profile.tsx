import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center py-6 bg-white shadow-sm">
          <View className="relative">
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
              <Text className="text-white">✏️</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold mt-4 text-gray-800">John Doe</Text>
          <Text className="text-gray-500">john.doe@example.com</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-around py-4 bg-white mt-2 mx-4 rounded-lg shadow-sm">
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">124</Text>
            <Text className="text-gray-500">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">1.2K</Text>
            <Text className="text-gray-500">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">530</Text>
            <Text className="text-gray-500">Following</Text>
          </View>
        </View>

        {/* Profile Details */}
        <View className="mx-4 mt-6 bg-white p-6 rounded-lg shadow-sm">
          <Text className="text-xl font-bold mb-4 text-gray-800">Personal Information</Text>
          
          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Username</Text>
            <Text className="text-gray-800 text-lg">johndoe</Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Phone</Text>
            <Text className="text-gray-800 text-lg">+1 (555) 123-4567</Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Location</Text>
            <Text className="text-gray-800 text-lg">San Francisco, CA</Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 text-sm">Member Since</Text>
            <Text className="text-gray-800 text-lg">January 2020</Text>
          </View>
        </View>

        {/* Actions */}
        <View className="mx-4 mt-6 mb-8">
          <TouchableOpacity className="bg-blue-500 py-3 rounded-lg items-center mb-3">
            <Text className="text-white font-bold">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-gray-300 py-3 rounded-lg items-center">
            <Text className="text-gray-700 font-bold">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}