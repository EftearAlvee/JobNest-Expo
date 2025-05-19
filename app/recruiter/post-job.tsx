import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PostJobScreen = () => {
  const [jobData, setJobData] = useState({
    job_type: 'Full-time',
    user_id: 0,
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
    skills: '',
    experience: '',
    deadline: '',
    contact_email: '',
  });

  const jobTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Temporary',
    'Internship',
    'Remote',
  ];

const handleSubmit = async () => {
  if (!jobData.title || !jobData.description || !jobData.requirements) {
    Alert.alert('Error', 'Please fill in all required fields');
    return;
  }

  try {
    const userId = await AsyncStorage.getItem('userId');
    setJobData({...jobData, user_id: userId ? parseInt(userId) : 0})
    const response = await fetch('http://192.168.0.103:8000/post-job.php?role=recruiter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...jobData,
        user_id: userId ? parseInt(userId) : null  // Ensure userId is not null before parsing
      }),
    });

    const result = await response.json();

    if (response.ok) {
      Alert.alert('Success', 'Job posted successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } else {
      Alert.alert('Error', result.error || 'Failed to post job');
    }
  } catch (error) {
    Alert.alert('Error', 'Network error. Please try again.');
    console.error(error);
  }
};


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="px-4 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">Post a New Job</Text>
          <Text className="text-gray-500">Fill in the details below to post your job listing</Text>
        </View>

        {/* Job Type Picker */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Job Type <Text className="text-red-500">*</Text></Text>
          <View className="border border-gray-300 rounded-lg bg-white">
            <Picker
              selectedValue={jobData.job_type}
              onValueChange={(itemValue) => setJobData({...jobData, job_type: itemValue})}
            >
              {jobTypes.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Job Title */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Job Title <Text className="text-red-500">*</Text></Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="e.g. Senior React Native Developer"
            value={jobData.title}
            onChangeText={(text) => setJobData({...jobData, title: text})}
          />
        </View>

        {/* Company Name */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Company Name <Text className="text-red-500">*</Text></Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="Your company name"
            value={jobData.company}
            onChangeText={(text) => setJobData({...jobData, company: text})}
          />
        </View>

        {/* Location */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Location</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="e.g. New York, NY or Remote"
            value={jobData.location}
            onChangeText={(text) => setJobData({...jobData, location: text})}
          />
        </View>

        {/* Salary */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Salary Range</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="e.g. $80,000 - $100,000 per year"
            value={jobData.salary}
            onChangeText={(text) => setJobData({...jobData, salary: text})}
          />
        </View>

        {/* Job Description */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Job Description <Text className="text-red-500">*</Text></Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white h-32 textAlignVertical='top'"
            placeholder="Describe the job responsibilities and expectations..."
            multiline
            numberOfLines={6}
            value={jobData.description}
            onChangeText={(text) => setJobData({...jobData, description: text})}
          />
        </View>

        {/* Requirements */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Requirements <Text className="text-red-500">*</Text></Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white h-32 textAlignVertical='top'"
            placeholder="List the required qualifications and skills..."
            multiline
            numberOfLines={6}
            value={jobData.requirements}
            onChangeText={(text) => setJobData({...jobData, requirements: text})}
          />
        </View>

        {/* Preferred Skills */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Preferred Skills</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="e.g. React Native, TypeScript, Redux"
            value={jobData.skills}
            onChangeText={(text) => setJobData({...jobData, skills: text})}
          />
        </View>

        {/* Experience Level */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Experience Level</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="e.g. 3+ years of experience"
            value={jobData.experience}
            onChangeText={(text) => setJobData({...jobData, experience: text})}
          />
        </View>

        {/* Application Deadline */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-2 font-medium">Application Deadline</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="e.g. December 31, 2023"
            value={jobData.deadline}
            onChangeText={(text) => setJobData({...jobData, deadline: text})}
          />
        </View>

        {/* Contact Email */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2 font-medium">Contact Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 bg-white"
            placeholder="hr@yourcompany.com"
            keyboardType="email-address"
            value={jobData.contact_email}
            onChangeText={(text) => setJobData({...jobData, contact_email: text})}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-600 rounded-lg p-4 items-center mb-10"
          onPress={handleSubmit}
        >
          <Text className="text-white font-bold text-lg">Post Job</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostJobScreen;