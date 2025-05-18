import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type SkillLevel = 'Beginner' | 'Intermediate' | 'Expert';

type Skill = {
  id: number;
  name: string;
  level: SkillLevel;
};

const skillSuggestions = [
  'JavaScript',
  'React',
  'Python',
  'Node.js',
  'MongoDB',
  'MySQL',
  'Java',
  'Docker',
  'AWS',
  'TypeScript',
  'GraphQL',
  'Kubernetes',
  'React Native',
  'Swift',
  'Kotlin',
  'Git',
  'Redux',
  'HTML',
  'CSS',
  'Express.js',
];
// 192.168.0.104
const BASE_URL = 'http://192.168.0.104:8000'; // Replace with your API base URL


const ProfileScreen = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Beginner');
  const [tempSkills, setTempSkills] = useState<Skill[]>([]);
  const [aboutMe, setAboutMe] = useState('');
  const [editAboutMeVisible, setEditAboutMeVisible] = useState(false);
  const [tempAboutMe, setTempAboutMe] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [editProfilePicVisible, setEditProfilePicVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);




  const recentWorks = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      role: 'Senior Developer',
      review: 'Henry delivered exceptional work on our e-commerce platform.',
      rating: 4.8,
      duration: 'Jan 2023 - Present',
    },
    {
      id: 2,
      company: 'Digital Creatives',
      role: 'Frontend Lead',
      review: 'Great team player with excellent React skills.',
      rating: 4.5,
      duration: 'Mar 2021 - Dec 2022',
    },
  ];

  const stats = {
    jobsCompleted: 42,
    clientSatisfaction: '98%',
    experience: '5+ years',
  };

  // Fetch complete profile on component mount
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        // Get userId from AsyncStorage
        const storedUserId = await AsyncStorage.getItem('userId');
        console.log(storedUserId);
        const parsedUserId = storedUserId ? parseInt(storedUserId) : null;
        setUserId(parsedUserId);

        // Get userRole from AsyncStorage
        const storedUserRole = await AsyncStorage.getItem('userRole');
        setUserRole(storedUserRole || '');

      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error appropriately (e.g., show error message)
      }

    }
    const fetchCompleteProfile = async () => {
      setLoading(true);
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        const response = await fetch(`${BASE_URL}/profile/complete_profile.php?user_id=${storedUserId}`, {
          method: 'GET',
          headers: {
            'X-User-Role': userRole || 'job_seeker', // Provide default role
          },
        });

        console.log("Profile API Response Status:", response.status);
        const data = await response.json();
        console.log("Full profile API response:", data);

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }

        // Handle both possible response formats:
        // 1. Direct fields (about_me, skills, etc)
        // 2. Nested profile object
        const profileData = data.profile || data;

        setAboutMe(profileData.about_me || profileData.aboutMe || '');
        setProfileImage(profileData.profile_picture || profileData.profileImage || null);

        // Handle skills data - could be array or object with levels
        if (Array.isArray(profileData.skills)) {
          setSkills(profileData.skills);
        } else if (profileData.skills && typeof profileData.skills === 'object') {
          // Convert skills object {Beginner: [], Intermediate: []} to flat array
          const allSkills = Object.entries(profileData.skills).flatMap(
            ([level, skills]) => (skills as string[]).map(name => ({
              name,
              level: level as SkillLevel,
              id: Math.random() // Temporary ID
            }))
          );
          setSkills(allSkills);
        } else {
          setSkills([]);
        }

      } catch (error) {
        console.error('Profile fetch error:', error);

        let errorMessage = 'Network error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }

        Alert.alert('Error', errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchUserRole();
    fetchCompleteProfile();

  }, []);






  const handleAddSkill = () => {
    if (skillName.trim() === '') return;
    const newSkill: Skill = {
      name: skillName.trim(),
      level: skillLevel,
      id: 0
    };
    setTempSkills((prev) => [...prev, newSkill]);
    setSkillName('');
    setSkillLevel('Beginner');
  };

  const handleSaveSkills = async () => {
    if (tempSkills.length === 0) return;
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/profile/skills.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Role': userRole,
        },
        body: JSON.stringify({
          user_id: userId,
          skills: tempSkills,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSkills((prev) => [...prev, ...tempSkills]);
        setTempSkills([]);
        setModalVisible(false);
        Alert.alert('Success', 'Skills added successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to add skills');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = async (index: number) => {
    const skillToRemove = tempSkills[index];
    if (!skillToRemove) return;

    // If the skill is already saved in the backend, call DELETE API
    const existingSkill = skills.find((s) => s.name === skillToRemove.name);
    if (existingSkill) {
      setLoading(true);
      try {
        // Assuming the backend assigns an ID to skills; you'll need to adjust based on actual API response
        // For this example, I'll assume you have a skill ID or can identify by name/user_id
        const response = await fetch(`${BASE_URL}/profile/skills.php?id=${existingSkill.id || index}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Role': userRole,
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setSkills((prev) => prev.filter((s) => s.name !== skillToRemove.name));
          setTempSkills((prev) => prev.filter((_, i) => i !== index));
          Alert.alert('Success', 'Skill removed successfully');
        } else {
          Alert.alert('Error', data.message || 'Failed to remove skill');
        }
      } catch (error) {
        Alert.alert('Error', 'Network error occurred');
      } finally {
        setLoading(false);
      }
    } else {
      // If it's a temporary skill not yet saved, just remove locally
      setTempSkills((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // About Me handlers
  const handleEditAboutMe = () => {
    setTempAboutMe(aboutMe);
    setEditAboutMeVisible(true);
  };

  const handleSaveAboutMe = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      const response = await fetch(`${BASE_URL}/profile/about_me.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Role': 'job_seeker',
        },
        body: JSON.stringify({
          user_id: userId,
          about_text: tempAboutMe, // Note: changed from about_me to about_text
          title: userRole // Make sure to include title
        }),
      });

      const data = await response.json();
      console.log('API Response:', data); // Debug log

      if (response.ok && data.success) {
        setAboutMe(tempAboutMe);
        setEditAboutMeVisible(false);
        Alert.alert('Success', data.message || 'About Me updated successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to update About Me');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Profile picture handlers
  const uploadProfilePicture = async (uri: string) => {
    setLoading(true);
    try {
      // In a real app, you'd upload the image to your server or a storage service and get a URL
      // For this example, I'll assume the URI is sent directly or uploaded separately
      const response = await fetch(`${BASE_URL}/profile/profile_picture.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Role': userRole,
        },
        body: JSON.stringify({
          user_id: userId,
          image_url: uri, // Adjust based on how your backend expects the image
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setProfileImage(uri);
        Alert.alert('Success', 'Profile picture updated successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to upload profile picture');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await uploadProfilePicture(uri);
      setEditProfilePicVisible(false);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await uploadProfilePicture(uri);
      setEditProfilePicVisible(false);
    }
  };

  const filteredSuggestions = skillSuggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(skillName.toLowerCase()) &&
      !tempSkills.find((skill) => skill.name === suggestion) &&
      !skills.find((skill) => skill.name === suggestion)
  );

  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'Intermediate':
        return 'bg-blue-100 border-blue-500 text-blue-800';
      case 'Expert':
        return 'bg-red-100 border-red-500 text-red-800';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getLevelButtonColor = (level: SkillLevel, currentLevel: SkillLevel) => {
    if (level !== currentLevel) return 'bg-gray-200 text-gray-700';
    switch (level) {
      case 'Beginner':
        return 'bg-green-500 text-white';
      case 'Intermediate':
        return 'bg-blue-500 text-white';
      case 'Expert':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {loading && (
        <View className="absolute inset-0 bg-black/30 justify-center items-center">
          <Text className="text-white text-lg">Loading...</Text>
        </View>
      )}
      <ScrollView
        className="px-5 pt-6 pb-32"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Profile Header */}
        <View className="items-center mb-6">
          <TouchableOpacity onPress={() => setEditProfilePicVisible(true)}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="w-28 h-28 rounded-full border-2 border-blue-200"
              />
            ) : (
              <View className="w-28 h-28 rounded-full bg-blue-100 items-center justify-center mb-4 border-2 border-blue-200">
                <Text className="text-3xl font-bold text-blue-600">HK</Text>
              </View>
            )}
            <View className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800">Henry Kanwil</Text>
          <Text className="text-gray-500 mb-2">Senior Software Engineer</Text>

          {/* Rating */}
          <View className="flex-row items-center bg-blue-50 px-4 py-2 rounded-full mt-2">
            <AntDesign name="star" size={16} color="#F59E0B" />
            <Text className="text-amber-600 font-medium ml-1">4.7 (28 reviews)</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-white p-3 rounded-xl w-[32%] items-center shadow-sm shadow-blue-100 border border-gray-100">
            <Text className="text-2xl font-bold text-blue-600">{stats.jobsCompleted}</Text>
            <Text className="text-gray-600 text-center text-xs mt-1">Jobs Done</Text>
          </View>
          <View className="bg-white p-3 rounded-xl w-[32%] items-center shadow-sm shadow-green-100 border border-gray-100">
            <Text className="text-2xl font-bold text-green-600">{stats.clientSatisfaction}</Text>
            <Text className="text-gray-600 text-center text-xs mt-1">Satisfaction</Text>
          </View>
          <View className="bg-white p-3 rounded-xl w-[32%] items-center shadow-sm shadow-purple-100 border border-gray-100">
            <Text className="text-2xl font-bold text-purple-600">{stats.experience}</Text>
            <Text className="text-gray-600 text-center text-xs mt-1">Experience</Text>
          </View>
        </View>

        {/* About Me Section */}
        <View className="bg-white p-5 rounded-xl shadow-sm shadow-gray-200 border border-gray-100 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-800">About Me</Text>
            <TouchableOpacity onPress={handleEditAboutMe}>
              <Ionicons name="pencil-outline" size={18} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-700 leading-6">{aboutMe}</Text>
        </View>

        {/* Skills Section */}
        <View className="bg-white p-5 rounded-xl shadow-sm shadow-gray-200 border border-gray-100 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Skills</Text>
            <TouchableOpacity
              className="flex-row items-center bg-blue-50 px-3 py-1 rounded-full"
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="add" size={16} color="#3B82F6" />
              <Text className="text-blue-600 text-sm ml-1">Add Skill</Text>
            </TouchableOpacity>
          </View>

          {/* Skills by Level */}
          {(['Beginner', 'Intermediate', 'Expert'] as SkillLevel[]).map((level) => {
            const levelSkills = skills.filter((skill) => skill.level === level);
            if (levelSkills.length === 0) return null;

            return (
              <View key={level} className="mb-4">
                <Text className="font-medium text-gray-700 mb-2">{level}</Text>
                <View className="flex-row flex-wrap">
                  {levelSkills.map((skill) => (
                    <View
                      key={skill.name}
                      className={`px-3 py-2 rounded-full mr-2 mb-2 border ${getLevelColor(skill.level)}`}
                    >
                      <Text className="font-medium">{skill.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        {/* Recent Work Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4 px-2">
            <Text className="text-lg font-bold text-gray-800">Recent Work</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">See More</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4 gap-5">
            {recentWorks.map((work) => (
              <View
                key={work.id}
                className="bg-white p-5 rounded-xl shadow-sm shadow-gray-200 border border-gray-100"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="font-bold text-gray-800 text-lg">{work.company}</Text>
                    <Text className="text-gray-600">{work.role}</Text>
                  </View>
                  <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded-full">
                    <AntDesign name="star" size={14} color="#F59E0B" />
                    <Text className="text-amber-700 font-medium ml-1">{work.rating}</Text>
                  </View>
                </View>

                <Text className="text-gray-500 text-sm mb-3">{work.duration}</Text>

                <View className="bg-gray-50 p-3 rounded-lg">
                  <Text className="text-gray-700 italic">"{work.review}"</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Modal for Adding Skill */}
        <Modal visible={modalVisible} animationType="slide">
          <View className="flex-1 bg-white p-6">
            <Text className="text-xl font-bold mb-4 text-center">Add Skill</Text>

            <Text className="text-gray-700 font-semibold mb-1">Skill Name</Text>
            <TextInput
              value={skillName}
              onChangeText={setSkillName}
              placeholder="Enter skill..."
              className="border border-gray-300 p-3 rounded-md mb-2"
              autoFocus
            />

            {skillName.length > 0 && filteredSuggestions.length > 0 && (
              <View className="max-h-40 border border-gray-200 rounded-md mb-4">
                <FlatList
                  data={filteredSuggestions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-3 border-b border-gray-100"
                      onPress={() => {
                        setSkillName(item);
                      }}
                    >
                      <Text className="text-gray-600">{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            <Text className="text-gray-700 font-semibold mb-1">Level</Text>
            <View className="flex-row justify-between mb-4">
              {['Beginner', 'Intermediate', 'Expert'].map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => setSkillLevel(level as SkillLevel)}
                  className={`px-4 py-2 rounded-full ${getLevelButtonColor(level as SkillLevel, skillLevel)}`}
                >
                  <Text className="font-medium">{level}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              className={`bg-green-500 p-3 rounded-md mb-4 ${skillName.trim() === '' ? 'opacity-50' : ''}`}
              onPress={handleAddSkill}
              disabled={skillName.trim() === ''}
            >
              <Text className="text-white font-semibold text-center">Add Skill</Text>
            </TouchableOpacity>

            {tempSkills.length > 0 && (
              <View className="mb-4">
                <Text className="text-lg font-bold mb-2">Added Skills:</Text>
                {tempSkills.map((skill, index) => (
                  <View key={index} className="flex-row justify-between items-center p-2 bg-gray-50 rounded mb-1">
                    <Text className="text-gray-700">
                      {skill.name} ({skill.level})
                    </Text>
                    <TouchableOpacity onPress={() => handleRemoveSkill(index)}>
                      <Ionicons name="close" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <View className="flex-row justify-between mt-auto">
              <TouchableOpacity
                className="px-6 py-3 border border-gray-300 rounded-md"
                onPress={() => {
                  setModalVisible(false);
                  setTempSkills([]);
                }}
              >
                <Text className="text-gray-700 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`px-6 py-3 bg-blue-500 rounded-md ${tempSkills.length === 0 ? 'opacity-50' : ''}`}
                onPress={handleSaveSkills}
                disabled={tempSkills.length === 0 || loading}
              >
                <Text className="text-white font-medium">Save Skills</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for Editing About Me */}
        <Modal visible={editAboutMeVisible} animationType="slide">
          <View className="flex-1 bg-white p-6">
            <Text className="text-xl font-bold mb-4 text-center">Edit About Me</Text>

            <TextInput
              value={tempAboutMe}
              onChangeText={setTempAboutMe}
              placeholder="Tell us about yourself..."
              className="border border-gray-300 p-3 rounded-md mb-4 h-40 text-align-top"
              multiline
              textAlignVertical="top"
              autoFocus
            />

            <View className="flex-row justify-between mt-auto">
              <TouchableOpacity
                className="px-6 py-3 border border-gray-300 rounded-md"
                onPress={() => setEditAboutMeVisible(false)}
              >
                <Text className="text-gray-700 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`px-6 py-3 bg-blue-500 rounded-md ${loading ? 'opacity-50' : ''}`}
                onPress={handleSaveAboutMe}
                disabled={loading}
              >
                <Text className="text-white font-medium">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for Profile Picture */}
        <Modal visible={editProfilePicVisible} transparent={true} animationType="fade">
          <View className="flex-1 bg-black/50 justify-center items-center">
            <View className="bg-white p-5 rounded-xl w-80">
              <Text className="text-lg font-bold mb-4 text-center">Change Profile Picture</Text>

              <TouchableOpacity
                className={`bg-blue-500 p-3 rounded-md mb-3 ${loading ? 'opacity-50' : ''}`}
                onPress={pickImage}
                disabled={loading}
              >
                <Text className="text-white font-medium text-center">Choose from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`bg-green-500 p-3 rounded-md mb-3 ${loading ? 'opacity-50' : ''}`}
                onPress={takePhoto}
                disabled={loading}
              >
                <Text className="text-white font-medium text-center">Take Photo</Text>
              </TouchableOpacity>

              {profileImage && (
                <TouchableOpacity
                  className={`bg-red-500 p-3 rounded-md mb-3 ${loading ? 'opacity-50' : ''}`}
                  onPress={() => {
                    setProfileImage(null);
                    setEditProfilePicVisible(false);
                    // Optionally call API to remove profile picture
                  }}
                  disabled={loading}
                >
                  <Text className="text-white font-medium text-center">Remove Photo</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                className="border border-gray-300 p-3 rounded-md"
                onPress={() => setEditProfilePicVisible(false)}
              >
                <Text className="text-gray-700 font-medium text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-around py-3 px-2 shadow-md shadow-gray-400">
        <TouchableOpacity className="items-center" onPress={() => router.push('/seeker')}>
          <Ionicons name="home-outline" size={24} color="#9CA3AF" />
          <Text className="text-gray-500 text-xs mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FontAwesome name="calendar" size={20} color="#9CA3AF" />
          <Text className="text-gray-500 text-xs mt-1">Interviews</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#9CA3AF" />
          <Text className="text-gray-500 text-xs mt-1">Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="person" size={24} color="#3B82F6" />
          <Text className="text-blue-500 text-xs mt-1">Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;