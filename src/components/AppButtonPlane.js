import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppTheme } from '../config/AppTheme';
import { AppText } from './AppText';

const AppButtonPlane = ({ onPress, label }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={{ borderRadius: 90, paddingHorizontal: RFValue(30), overflow: 'hidden', backgroundColor: AppTheme.colors.yellow }}>
                <AppText size={1} bold={true} style={{ textAlign: 'center', padding: RFValue(10), color: 'black', overflow: 'hidden' }}>{label.toUpperCase()}</AppText>
            </View>
        </TouchableOpacity>
    )
}
export { AppButtonPlane };
