import { Button, Text, View, StyleSheet } from 'react-native';
import { ScrollView, GestureHandlerRootView, FlatList } from 'react-native-gesture-handler';
import { useAudioData } from '@/contexts/AudioDataContext';

// @ts-ignore
const Item = ({ item }) => {
    return <View><Text >{item.title}</Text></View>;
};

const Favorites = () => {
    const { audioData } = useAudioData();

    return <GestureHandlerRootView>
        <View>
            <FlatList
                data={audioData.filter((el) => el.isFavorite)}
                numColumns={3}
                renderItem={Item}
            />
        </View>
    </GestureHandlerRootView>
}

export default Favorites;