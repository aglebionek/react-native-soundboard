import { Audio, AVPlaybackSource } from "expo-av";
import { cacheDirectory, readAsStringAsync, writeAsStringAsync } from "expo-file-system";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { AudioData } from "@/@types/AudioData";
import defaultData from "@/data/defaultAudioData";
import soundMap from "@/data/soundMap";

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


const cachedDataFilePath = `${cacheDirectory}data.json`;

const AudioDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [audioData, setAudioData] = useState<AudioData[]>(defaultData);
    const [currentlyPlayingAudioUri, setCurrentlyPlayingAudioUri] = useState<string | null>(null);
    const [currentlyPlayingAudioObject, setCurrentlyPlayingSoundObject] = useState<Audio.Sound | null>(null);
    const [soundFiles, setSoundFiles] = useState<Record<string, Audio.Sound>>({});

    useEffect(() => {
        const readAudioDataFromCache = async () => {
            try {
                const info = await readAsStringAsync(cachedDataFilePath);
                setAudioData(JSON.parse(info))
            } catch (error) {
                await writeAsStringAsync(cachedDataFilePath, JSON.stringify(defaultData))
            }
        }
        const loadSoundFilesToMemory = async () => {
            Object.keys(soundMap).forEach(async (key) => {
                const { sound } = await Audio.Sound.createAsync(soundMap[key]);
                setSoundFiles((prev) => ({ ...prev, [key]: sound }))
            })
        }
        loadSoundFilesToMemory();
        readAudioDataFromCache()
    }, []);

    const handlePlaySound = useCallback(async (uri: string) => {
        try {
            if (currentlyPlayingAudioObject) {
                await currentlyPlayingAudioObject.stopAsync();
                setCurrentlyPlayingSoundObject(null);
                setCurrentlyPlayingAudioUri(null);
            }
            const sound = soundFiles[uri];
            await sound.playAsync();
            setCurrentlyPlayingSoundObject(sound);
            setCurrentlyPlayingAudioUri(uri);
            sound.setOnPlaybackStatusUpdate((status) => {
                // @ts-ignore-next-line (the types don't show that these properties exist, even tho they do)
                if (status?.didJustFinish || status?.isPlaying === false) {
                    setCurrentlyPlayingSoundObject(null);
                    setCurrentlyPlayingAudioUri(null);
                    sound.setOnPlaybackStatusUpdate(null);
                    sound.stopAsync();
                }
            })
        } catch (error) {
            console.error(`[ERROR] AudioDataProvider.handlePlaySound \n ${error}`)
        }
    }, [audioData, currentlyPlayingAudioObject, soundFiles])

    const handleFavorite = useCallback((uri: string) => {
        const newAudioData = audioData.map((el) => {
            if (el.uri === uri) return { ...el, isFavorite: !el.isFavorite }
            return el;
        })
        setAudioData(newAudioData)
        writeAsStringAsync(cachedDataFilePath, JSON.stringify(newAudioData))
    }, [audioData])

    return (
        <AudioDataContext.Provider value={{ audioData, currentlyPlayingAudioUri, handleFavorite, handlePlaySound, setAudioData }} >
            {children}
        </AudioDataContext.Provider>
    );
}

const useAudioData = () => useContext(AudioDataContext);

export { AudioDataProvider, useAudioData };