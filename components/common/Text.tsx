import { Text as NativeText, type TextProps } from 'react-native';

import useThemeColors from '@/hooks/useThemeColors';

const Text = (props: TextProps) => {
    const COLORS = useThemeColors();
    return <NativeText {...props} style={[{ color: COLORS.text }, props.style]} />;
}

export default Text;