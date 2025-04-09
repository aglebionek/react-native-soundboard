import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AudioDataProvider } from '@/contexts/AudioDataContext';
import { useColorScheme } from 'react-native';
import { MainThemeColorsDark } from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? MainThemeColorsDark : DefaultTheme}>
      <AudioDataProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerTitle: "Szynszyla Soundboard", headerTitleAlign: 'center' }} />
        </Stack>
      </AudioDataProvider>
    </ThemeProvider>
  );
}
