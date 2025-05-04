import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { View } from 'react-native';

import { AudioDataProvider } from '@/contexts/AudioDataContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { Text } from '@/components/common';
import SplashScreen from '@/components/SplashScreen';


const Header = () => {
  const { COLORS, handleChangeTheme, theme } = useTheme();

  return (
    <View style={{
      justifyContent: 'center', alignItems: 'flex-end', height: 80, display: 'flex', flexDirection: 'row',
      borderBottomColor: COLORS.borderColor, borderBottomWidth: 1,
      width: '100%',
    }}>
      <View style={{ width: '85%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: '15%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>Szynszyla Soundboard</Text>
      </View>
      <View style={{ width: '15%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons
          name={theme === 'dark' ? 'moon' : 'sunny'}
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
  return (
    <ThemeProvider>
      <AudioDataProvider>
        <SplashScreen>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                header: () => <Header />,
                headerTransparent: true,
              }}
            />
          </Stack>
        </SplashScreen>
      </AudioDataProvider>
    </ThemeProvider>
  );
}
