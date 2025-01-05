import { Button, Text, View, StyleSheet, Pressable } from 'react-native';
import { ScrollView, GestureHandlerRootView, FlatList } from 'react-native-gesture-handler';
import { useAudioData } from '@/contexts/AudioDataContext';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

const Favorites = () => {
  const { audioData, currentlyPlayingAudioUri, handleFavorite, handlePlaySound } = useAudioData();

  const filteredData = audioData.filter((el) => el.isFavorite);

  return <GestureHandlerRootView>
    <ScrollView>
      <ThemedView>
        {filteredData.map((el) => <View key={el.uri} className='flex flex-row justify-between h-8'>
          <Pressable onPress={() => handlePlaySound(el.uri)} className='flex flex-row gap-2'>
            <Ionicons size={30} color="black" name={el.uri === currentlyPlayingAudioUri ? 'pause' : 'play'} />
            <Text className='font-bold'>{el.title}</Text>
          </Pressable>
        </View>
        )}
      </ThemedView >
    </ScrollView>
  </GestureHandlerRootView>
}

export default Favorites;