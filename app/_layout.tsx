import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';

import { AudioDataProvider } from '@/contexts/AudioDataContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Text } from '@/components/common';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Header = () => {
  const { COLORS, handleChangeTheme, theme } = useTheme();

  return (
    <View style={{
      justifyContent: 'center', alignItems: 'flex-end', height: 80, display: 'flex', flexDirection: 'row',
      borderBottomColor: COLORS.highlightPinkDark, borderBottomWidth: 1,
      width: '100%',
    }}>
      <View style={{ width: '85%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: '15%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>Szynszyla Soundboard</Text>
      </View>
      <View style={{ width: '15%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons
          name={theme === 'dark' ? 'sunny' : 'moon'}
          size={35}
          color={COLORS.tabIconSelected}
          style={{ marginBottom: 10 }}
          onPress={handleChangeTheme}
        />
      </View>
    </View >
  )
}

export default function RootLayout() {
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <AudioDataProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              header: () => <Header />,
              headerTransparent: true,
            }}
          />
        </Stack>
      </AudioDataProvider>
    </ThemeProvider>
  );
}
