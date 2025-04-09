import { Audio } from "expo-av";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import { AudioData } from "@/@types/AudioData";
import defaultData from "@/constants/defaultAudioData";
import soundMap from "@/constants/soundMap";
import useCache from "@/hooks/useCache";

type AudioDataContextType = {
    audioData: AudioData[];
    currentlyPlayingAudioUri: string | null;
    handleFavorite: (uri: string) => void;
    handlePlaySound: (uri: string) => void;
    setAudioData: React.Dispatch<React.SetStateAction<AudioData[]>>;
}

const AudioDataContext = createContext<AudioDataContextType>({
    audioData: defaultData,
    currentlyPlayingAudioUri: null,
    handleFavorite: () => { },
    handlePlaySound: () => { },
    setAudioData: () => { }
});


const AudioDataProvider = ({ children }: { children: React.ReactNode }) => {
    const { readFileFromCache, saveDataToCache } = useCache('data.json');

    const currentlyPlayingAudioObject = useRef<{current: Audio.Sound | null}>({current: null}).current;
    const soundFiles: Record<string, Audio.Sound> = useRef({}).current;

    const [audioData, setAudioData] = useState<AudioData[]>(defaultData);
    const [currentlyPlayingAudioUri, setCurrentlyPlayingAudioUri] = useState<string | null>(null);

    useEffect(() => {
        const readAudioDataFromCache = async () => {
            try {
                const data = await readFileFromCache();
                if (data) return setAudioData(JSON.parse(data));
                saveDataToCache(JSON.stringify(defaultData));
            } catch (error) {
                console.error(`[ERROR] AudioDataProvider.readAudioDataFromCache \n ${error}`)
            }
        }
        // could I cache those sounds? Would it make the loading faster?
        const loadSoundFilesToMemory = () => {
            Object.keys(soundMap).forEach(async (key) => {
                Audio.Sound.createAsync(soundMap[key]).then(({ sound }) => {
                    soundFiles[key] = sound;
                });
            })
        }
        loadSoundFilesToMemory();
        readAudioDataFromCache()
    }, []);

    const handlePlaySound = useCallback(async (uri: string) => {
        try {
            if (currentlyPlayingAudioObject.current) {
                await currentlyPlayingAudioObject.current.stopAsync();
                currentlyPlayingAudioObject.current = null;
                setCurrentlyPlayingAudioUri(null);
            }
            const sound = soundFiles[uri];
            await sound.playAsync();
            currentlyPlayingAudioObject.current = sound;
            setCurrentlyPlayingAudioUri(uri);
            sound.setOnPlaybackStatusUpdate((status) => {
                // @ts-ignore-next-line (the types don't show that these properties exist, even tho they do)
                if (status?.didJustFinish || status?.isPlaying === false) {
                    currentlyPlayingAudioObject.current = null;
                    setCurrentlyPlayingAudioUri(null);
                    sound.setOnPlaybackStatusUpdate(null);
                    sound.stopAsync();
                }
            })
        } catch (error) {
            console.error(`[ERROR] AudioDataProvider.handlePlaySound \n ${error}`)
        }
    }, [audioData])

    const handleFavorite = useCallback((uri: string) => {
        const newAudioData = audioData.map((el) => {
            if (el.uri === uri) return { ...el, isFavorite: !el.isFavorite }
            return el;
        })
        setAudioData(newAudioData);
        saveDataToCache(JSON.stringify(newAudioData));
    }, [audioData])

    return (
        <AudioDataContext.Provider value={{ audioData, currentlyPlayingAudioUri, handleFavorite, handlePlaySound, setAudioData }} >
            {children}
        </AudioDataContext.Provider>
    );
}

const useAudioData = () => useContext(AudioDataContext);

export { AudioDataProvider, useAudioData };