import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Pressable, StyleSheet } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';

import { Text } from '@/components/common';
import { useAudioData } from '@/contexts/AudioDataContext';
import useThemeColors from '@/hooks/useThemeColors';

const AudioList = () => {
  const { audioData, currentlyPlayingAudioUri, handleFavorite, handlePlaySound } = useAudioData();
  const Colors = useThemeColors();

  return (
    <GestureHandlerRootView>
      <View>
        <ScrollView>
          {audioData.map(el => {
            const isElPlaying = el.uri === currentlyPlayingAudioUri;
            const elPlayIconColor = isElPlaying ? Colors.tabIconSelected : Colors.tabIconDefault;
            const elFavoriteIconColor = el.isFavorite ? Colors.tabIconSelected : Colors.tabIconDefault;

            return (
              <View key={el.uri} style={{ ...styles.view, borderBottomColor: Colors.highlightPinkDark }}>
                <Pressable onPress={() => handlePlaySound(el.uri)} style={styles.pressable}>
                  <Ionicons size={30} color={elPlayIconColor} name={isElPlaying ? 'pause' : 'play'} />
                  <Text style={styles.text}>{el.title}</Text>
                </Pressable>
                <Ionicons size={30} color={elFavoriteIconColor} name={el.isFavorite ? 'heart' : 'heart-outline'} onPress={() => handleFavorite(el.uri)} />
              </View>
            )
          })}
        </ScrollView>
      </View>
    </GestureHandlerRootView >
  )
}


const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  pressable: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    gap: 5,
  },
  text: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
  }
});

export default AudioList;