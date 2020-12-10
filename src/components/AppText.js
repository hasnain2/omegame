
import * as React from 'react';
import { Text } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
const AppText = ({ children, onPress, size, color, bold, style, lines }) => {
    let SIZE = size === 0 ? RFValue(10) : size === 1 ? RFValue(12) : size === 2 ? RFValue(14) : size === 3 ? RFValue(16) : RFValue(18);
    return (
        <Text numberOfLines={lines || 10} onPress={onPress} style={[{ fontSize: SIZE, color: color ? color : 'white', fontWeight: bold ? 'bold' : 'normal' }, style ? style : null]} >{children}</Text>
    )
}
export { AppText };
