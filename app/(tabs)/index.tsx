import { GestureHandlerRootView, FlatList } from 'react-native-gesture-handler';

import { useAudioData } from '@/contexts/AudioDataContext';
import FavSoundListItem from '@/components/FavSoundListItem';

const Favorites = () => {
  const { audioData, currentlyPlayingAudioUri, handlePlaySound } = useAudioData();

  const filteredData = audioData.filter((el) => el.isFavorite);

  return (
    <GestureHandlerRootView>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.uri}
        numColumns={3}
        contentContainerStyle={{
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 10,
          gap: 10,
        }}
        renderItem={({ item }) => <FavSoundListItem currentlyPlayingAudioUri={currentlyPlayingAudioUri} el={item} handlePlaySound={handlePlaySound} />}
      />
    </GestureHandlerRootView>
  )
}

export default Favorites;