import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/job-seeker-login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/recruiter-login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/job-seeker-signup" options={{ headerShown: false }} />
        <Stack.Screen name="auth/recruiter-signup" options={{ headerShown: false }} />
        <Stack.Screen name="seeker/index" options={{ headerTitle: 'Job Seeker', headerShown: true }} />
        <Stack.Screen name="recruiter/index" options={{ headerTitle: 'Recruiter', headerShown: true }} />
        <Stack.Screen name="seeker/seekerProfile" options={{ headerTitle: 'Profile', headerShown: true }} />

      </Stack>
  );
}
