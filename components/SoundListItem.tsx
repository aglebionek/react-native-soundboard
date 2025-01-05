import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

const SoundListItem = ({ title, uri, isFavorite, handlePlaySound, handleFavorite }) => {
    return <View key={uri}>
        <Pressable onPress={() => handlePlaySound(uri)} className='flex flex-row gap-2 w-full'>
            <Ionicons size={30} color="black" name="play" />
            <Text>{title}</Text>
        </Pressable>
        <Ionicons size={30} color={isFavorite ? "yellow" : "black"} name="heart" onPress={() => handleFavorite(uri)} />
    </View>
}

export default SoundListItem;