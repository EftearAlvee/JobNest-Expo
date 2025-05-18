import { router } from "expo-router";
import { BadgeDollarSign, Check, Star } from "lucide-react-native";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RecruiterProfileScreen() {
  // Sample recruiter data
  const recruiter = {
    companyName: "QuickHelp Solutions",
    contactPerson: "Sarah Johnson",
    email: "sarah@quickhelp.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    memberSince: "March 2019",
    rating: 4.9,
    jobsPosted: 128,
    hiresCompleted: 342,
    companyBio: "We connect businesses with reliable temporary workers for all kinds of tasks and projects. Specializing in quick turnaround staffing solutions.",
    verified: true,
    paymentVerified: true
  };

  const activeJobs = [
    { id: 1, title: "Warehouse Assistant", date: "Posted 2 days ago", applicants: 8 },
    { id: 2, title: "Event Staff", date: "Posted 1 week ago", applicants: 15 },
    { id: 3, title: "Office Cleaner", date: "Posted 2 weeks ago", applicants: 5 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center py-6 bg-white shadow-sm">
          <View className="relative">
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
            {recruiter.verified && (
              <View className="absolute top-0 right-0 bg-blue-500 p-1 rounded-full">
                <Check size={20} color="white" />
              </View>
            )}
          </View>
          <Text className="text-2xl font-bold mt-4 text-gray-800">{recruiter.contactPerson}</Text>
          <Text className="text-xl text-gray-700">{recruiter.companyName}</Text>
          <Text className="text-gray-500">{recruiter.email}</Text>
          
          {/* Rating - using same blue color scheme */}
          <View className="flex-row items-center mt-2">
            <Star size={20} fill="#F59E0B" color="#F59E0B" />
            <Text className="ml-1 text-gray-800 font-semibold">
              {recruiter.rating} <Text className="text-gray-500 font-normal">({recruiter.hiresCompleted} hires)</Text>
            </Text>
          </View>
        </View>

        {/* Verification Badges - using blue instead of multiple colors */}
        <View className="mx-4 mt-4 flex-row justify-center space-x-4">
          {recruiter.verified && (
            <View className="flex-row items-center bg-blue-100 px-3 py-1 rounded-full">
              <Check size={16} color="#1d4ed8" />
              <Text className="ml-1 text-blue-700 text-sm">Verified</Text>
            </View>
          )}
          {recruiter.paymentVerified && (
            <View className="flex-row items-center bg-blue-100 px-3 py-1 rounded-full">
              <BadgeDollarSign size={16} color="#1d4ed8" />
              <Text className="ml-1 text-blue-700 text-sm">Payment Verified</Text>
            </View>
          )}
        </View>

        {/* Stats - consistent with job seeker profile */}
<View className="flex-row justify-between mb-6">
  <View className="bg-white p-3 rounded-xl w-[32%] items-center shadow-sm shadow-blue-100 border border-gray-100">
    <Text className="text-2xl font-bold text-blue-600">{recruiter.jobsPosted}</Text>
    <Text className="text-gray-600 text-center text-xs mt-1">Jobs Posted</Text>
  </View>
  <View className="bg-white p-3 rounded-xl w-[32%] items-center shadow-sm shadow-green-100 border border-gray-100">
    <Text className="text-2xl font-bold text-green-600">{recruiter.hiresCompleted}</Text>
    <Text className="text-gray-600 text-center text-xs mt-1">Total Hires</Text>
  </View>
  <View className="bg-white p-3 rounded-xl w-[32%] items-center shadow-sm shadow-purple-100 border border-gray-100">
    <Text className="text-2xl font-bold text-purple-600">92%</Text>
    <Text className="text-gray-600 text-center text-xs mt-1">Repeat Rate</Text>
  </View>
</View>
        {/* Company Bio */}
        <View className="mx-4 mt-6 bg-white p-6 rounded-lg shadow-sm">
          <Text className="text-xl font-bold mb-2 text-gray-800">About Our Company</Text>
          <Text className="text-gray-800">{recruiter.companyBio}</Text>
        </View>

        {/* Active Job Listings */}
        <View className="mx-4 mt-6 bg-white p-6 rounded-lg shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Active Job Listings</Text>
            <TouchableOpacity 
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Post New</Text>
            </TouchableOpacity>
          </View>
          
          {activeJobs.map((job) => (
            <TouchableOpacity 
              key={job.id} 
              className="mb-4 pb-3 border-b border-gray-100 last:border-0 last:mb-0"
            >
              <Text className="text-lg font-semibold text-blue-700">{job.title}</Text>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500 text-sm">{job.date}</Text>
                <Text className="text-blue-600 font-medium text-sm">{job.applicants} applicants</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Information */}
        <View className="mx-4 mt-6 bg-white p-6 rounded-lg shadow-sm">
          <Text className="text-xl font-bold mb-4 text-gray-800">Contact Information</Text>
          <View className="mb-3">
            <Text className="text-gray-500 text-sm">Phone</Text>
            <Text className="text-gray-800 text-lg">{recruiter.phone}</Text>
          </View>
          <View className="mb-3">
            <Text className="text-gray-500 text-sm">Email</Text>
            <Text className="text-gray-800 text-lg">{recruiter.email}</Text>
          </View>
          <View>
            <Text className="text-gray-500 text-sm">Location</Text>
            <Text className="text-gray-800 text-lg">{recruiter.location}</Text>
          </View>
        </View>

        {/* Actions - matching original design */}
        <View className="mx-4 mt-6 mb-8">
          <TouchableOpacity 
            className="bg-blue-500 py-3 rounded-lg items-center mb-3"
          >
            <Text className="text-white font-bold">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="border border-gray-300 py-3 rounded-lg items-center"
            onPress={() => router.push('/')}
          >
            <Text className="text-gray-700 font-bold">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}