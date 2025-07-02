import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DashboardScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  type Job = {
    id: number;
    title: string;
    company: string;
    salary: string;
    location: string;
    description?: string;
    requirements?: string;
    skills?: string;
    experience?: string;
    deadline?: string;
    contact_email?: string;
    job_type?: string;
  };

  const [jobs, setJobs] = useState<Job[]>([]);

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
      location: 'Jakarta, Indonesia',
      description: 'We are looking for a skilled software engineer to join our team...',
      requirements: 'Bachelor\'s degree in Computer Science, 2+ years experience...',
      job_type: 'Full-time'
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Creative Minds',
      salary: '$600 - $1,200',
      location: 'Bandung, Indonesia',
      description: 'Join our design team to create beautiful user experiences...',
      requirements: 'Portfolio required, 3+ years design experience...',
      job_type: 'Contract'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Innovate Co.',
      salary: '$800 - $1,500',
      location: 'Singapore',
      description: 'Lead product development from conception to launch...',
      requirements: '5+ years product management experience...',
      job_type: 'Full-time'
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Junior Software Engineer',
      company: 'Highspeed Studios',
      salary: '$500 - $1,000',
      location: 'Jakarta, Indonesia',
      description: 'Entry-level position for recent graduates...',
      requirements: 'Computer Science degree or equivalent...',
      job_type: 'Full-time'
    },
    {
      id: 2,
      title: 'Database Engineer',
      company: 'Lunar Digia Corp.',
      salary: '$500 - $1,000',
      location: 'London, United Kingdom',
      description: 'Manage and optimize our database systems...',
      requirements: 'Experience with SQL and NoSQL databases...',
      job_type: 'Remote'
    },
    {
      id: 3,
      title: 'Senior Software Engineer',
      company: 'Darksear Studios',
      salary: '$500 - $1,000',
      location: 'Medan, Indonesia',
      description: 'Lead technical projects and mentor junior engineers...',
      requirements: '5+ years software development experience...',
      job_type: 'Full-time'
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await fetch("http://192.168.0.101:8000/get-all-job.php?role=recruiter", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
    
        const data = await response.json();
        if (response.ok) {
          setJobs(data.jobs);
          console.log(data);
        } else {
          Alert.alert('Error', data.error || 'Failed to fetch jobs');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  const categories = ['All', 'Design', 'Development', 'Marketing', 'Business', 'Finance', 'Remote'];

  const handleJobPress = (job: Job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const handleApply = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch("http://192.168.0.101:8000/apply.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: selectedJob?.id,
          user_id: userId
        })
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Application submitted successfully!');
        setModalVisible(false);
      } else {
        Alert.alert('Error', data.error || 'Failed to apply for job');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

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
              <TouchableOpacity key={job.id} onPress={() => handleJobPress(job)}>
                <View className="bg-white p-5 rounded-xl mr-4 w-64 shadow-sm shadow-gray-300 border border-gray-100">
                  <View className="flex-row justify-between items-start mb-3">
                    <Text className="font-bold text-gray-800">{job.company}</Text>
                    <MaterialIcons name="bookmark-border" size={24} color="#9CA3AF" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800 mb-1">{job.title}</Text>
                  <Text className="text-gray-500 mb-2">{job.location}</Text>
                  <Text className="text-blue-600 font-bold">{job.salary}</Text>
                </View>
              </TouchableOpacity>
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
            {jobs.map((job) => (
              <TouchableOpacity key={job.id} onPress={() => handleJobPress(job)}>
                <View className="bg-white p-5 rounded-xl shadow-sm shadow-gray-300 border border-gray-100 mb-5">
                  <View className="flex-row justify-between items-start mb-3">
                    <Text className="font-bold text-gray-800">{job.company}</Text>
                    <MaterialIcons name="bookmark-border" size={24} color="#9CA3AF" />
                  </View>
                  <Text className="text-lg font-bold text-gray-800 mb-1">{job.title}</Text>
                  <Text className="text-gray-500 mb-2">{job.location}</Text>
                  <Text className="text-blue-600 font-bold">{job.salary}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Job Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg p-6 w-11/12 max-h-[80%]">
            <ScrollView>
              <View className="flex-row justify-between items-start mb-4">
                <Text className="text-2xl font-bold text-gray-800">{selectedJob?.title}</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>
              
              <Text className="text-lg font-semibold text-gray-700 mb-2">{selectedJob?.company}</Text>
              <Text className="text-gray-500 mb-4">{selectedJob?.location}</Text>
              
              <View className="flex-row justify-between mb-4">
                <Text className="text-blue-600 font-bold">{selectedJob?.salary}</Text>
                <Text className="text-gray-500">{selectedJob?.job_type || 'Full-time'}</Text>
              </View>
              
              <View className="mb-4">
                <Text className="text-gray-700 font-medium mb-1">Job Description</Text>
                <Text className="text-gray-600">{selectedJob?.description || 'No description provided'}</Text>
              </View>
              
              <View className="mb-4">
                <Text className="text-gray-700 font-medium mb-1">Requirements</Text>
                <Text className="text-gray-600">{selectedJob?.requirements || 'No requirements provided'}</Text>
              </View>
              
              {selectedJob?.skills && (
                <View className="mb-4">
                  <Text className="text-gray-700 font-medium mb-1">Preferred Skills</Text>
                  <Text className="text-gray-600">{selectedJob.skills}</Text>
                </View>
              )}
              
              {selectedJob?.experience && (
                <View className="mb-4">
                  <Text className="text-gray-700 font-medium mb-1">Experience</Text>
                  <Text className="text-gray-600">{selectedJob.experience}</Text>
                </View>
              )}
              
              {selectedJob?.deadline && (
                <View className="mb-4">
                  <Text className="text-gray-700 font-medium mb-1">Application Deadline</Text>
                  <Text className="text-gray-600">{selectedJob.deadline}</Text>
                </View>
              )}
              
              {selectedJob?.contact_email && (
                <View className="mb-6">
                  <Text className="text-gray-700 font-medium mb-1">Contact Email</Text>
                  <Text className="text-gray-600">{selectedJob.contact_email}</Text>
                </View>
              )}
            </ScrollView>
            
            <TouchableOpacity
              className="bg-blue-600 rounded-lg p-3 items-center mt-4"
              onPress={handleApply}
            >
              <Text className="text-white font-bold text-lg">Apply Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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