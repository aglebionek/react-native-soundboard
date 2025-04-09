import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/components/common';
import useThemeColors from '@/hooks/useThemeColors';

type SoundListItemProps = {
    currentlyPlayingAudioUri: string | null;
    el: {
        title: string;
        uri: string;
    };
    handlePlaySound: (uri: string) => void;
};

const FavSoundListItem = ({ currentlyPlayingAudioUri, el, handlePlaySound }: SoundListItemProps) => {
    const COLORS = useThemeColors();

    const isElPlaying = el.uri === currentlyPlayingAudioUri;
    const cutTitle = el.title.length > 16 ? `${el.title.slice(0, 10)}...` : el.title;

    return (
        <View key={el.uri} style={{ ...styles.view, backgroundColor: COLORS.highlightPinkDark }}>
            <Pressable onPress={() => handlePlaySound(el.uri)} style={styles.pressable}>
                <Ionicons size={30} color={isElPlaying ? COLORS.tabIconSelected : 'white'} name={isElPlaying ? 'pause' : 'play'} />
                <Text>{cutTitle}</Text>
            </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    view: {
        margin: 5,
        padding: 10,
    },
    pressable: {
        display: 'flex',
        flexDirection: 'column',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default FavSoundListItem;