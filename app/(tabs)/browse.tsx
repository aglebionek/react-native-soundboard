import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Pressable, Text } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemedView } from '@/components/ThemedView';
import { useAudioData } from '@/contexts/AudioDataContext';

const AudioList = () => {
  const { audioData, currentlyPlayingAudioUri, handleFavorite, handlePlaySound } = useAudioData();
  
  return <GestureHandlerRootView>
    <ScrollView>
      <ThemedView>
        {audioData.map((el) => <View key={el.uri} className='flex flex-row justify-between h-8'>
          <Pressable onPress={() => handlePlaySound(el.uri)} className='flex flex-row gap-2 w-[90%]'>
            <Ionicons size={30} color="black" name={el.uri === currentlyPlayingAudioUri ? 'pause' : 'play'} />
            <Text className='font-bold text-zinc-100'>{el.title}</Text>
          </Pressable>
          <Ionicons size={30} color={el.isFavorite ? "yellow" : "black"} name="heart" onPress={() => handleFavorite(el.uri)} />
        </View>
        )}
      </ThemedView >
    </ScrollView>
  </GestureHandlerRootView>
}

export default AudioList;