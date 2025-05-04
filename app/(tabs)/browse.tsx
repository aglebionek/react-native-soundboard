import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Pressable, StyleSheet } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';

import { Text } from '@/components/common';
import { useAudioData } from '@/contexts/AudioDataContext';
import { useTheme } from '@/contexts/ThemeContext';

const AudioList = () => {
  const { audioData, currentlyPlayingAudioUri, handleFavorite, handlePlaySound } = useAudioData();
  const { COLORS } = useTheme();

  return (
    <GestureHandlerRootView>
      <ScrollView>
        {audioData.map(el => {
          const isElPlaying = el.uri === currentlyPlayingAudioUri;
          const elPlayIconColor = isElPlaying ? COLORS.tabIconSelected : COLORS.tabIconDefault;
          const elFavoriteIconColor = el.isFavorite ? COLORS.tabIconSelected : COLORS.tabIconDefault;

          return (
            <View key={el.uri} style={{ ...styles.view, borderBottomColor: `${COLORS.borderColor}99` }}>
              <Pressable onPress={() => handlePlaySound(el.uri)} style={styles.pressable}>
                <Ionicons size={30} color={elPlayIconColor} name={isElPlaying ? 'pause' : 'play'} />
                <Text style={styles.text}>{el.title}</Text>
              </Pressable>
              <Ionicons size={30} color={elFavoriteIconColor} name={el.isFavorite ? 'heart' : 'heart-outline'} onPress={() => handleFavorite(el.uri)} />
            </View>
          )
        })}
      </ScrollView>
    </GestureHandlerRootView >
  )
}


const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 42,
    marginHorizontal: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
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