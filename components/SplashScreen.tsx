import { useFonts } from 'expo-font';
import * as NativeSplash from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useTheme } from '@/contexts/ThemeContext';
import { useAudioData } from '@/contexts/AudioDataContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
NativeSplash.preventAutoHideAsync();

const SplashScreen = ({ children }: { children: React.ReactNode }) => {
    const { audioDataLoaded } = useAudioData();
    const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
    const { themeLoaded } = useTheme();

    const [loadedEverything, setLoadedEverything] = useState(false);

    useEffect(() => {
        if (loaded && themeLoaded) {
            setLoadedEverything(true);
            NativeSplash.hideAsync();
        }
    }, [audioDataLoaded, loaded, themeLoaded]);

    return (
        <>
            {loadedEverything ? children : null}
        </>
    )
}

export default SplashScreen;