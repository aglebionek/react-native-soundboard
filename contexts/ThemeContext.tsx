import { DefaultTheme, ThemeProvider as NativeThemeProvider } from '@react-navigation/native';
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import useCache from "@/hooks/useCache";
import { Colors, MainThemeColorsDark } from '@/constants/Colors';

export type THEME = 'light' | 'dark';

type ThemeContextType = {
    COLORS: typeof Colors.light | typeof Colors.dark;
    handleChangeTheme: () => void;
    theme: THEME;
}

const ThemeContext = createContext<ThemeContextType>({
    COLORS: Colors.dark,
    handleChangeTheme: () => { },
    theme: 'dark',
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { readFileFromCache, saveDataToCache } = useCache('colormode.txt');

    const defaultTheme = useColorScheme() ?? 'dark';
    const [theme, setTheme] = useState<THEME>(defaultTheme);

    const COLORS = Colors[theme];

    useEffect(() => {
        const readThemeDataFromCache = async () => {
            try {
                const cachedTheme = await readFileFromCache() as THEME | null;
                if (cachedTheme) return setTheme(cachedTheme);
                saveDataToCache(defaultTheme);
            } catch (error) {
                console.error(`[ERROR] AudioDataProvider.readAudioDataFromCache \n ${error}`)
            }
        }
        readThemeDataFromCache()
    }, []);

    const handleChangeTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        saveDataToCache(newTheme);
    }

    return (
        <ThemeContext.Provider value={{ COLORS, handleChangeTheme, theme }}>
            <NativeThemeProvider value={theme === 'dark' ? MainThemeColorsDark : DefaultTheme}>
                {children}
            </NativeThemeProvider>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);