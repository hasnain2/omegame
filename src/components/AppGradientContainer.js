import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme } from '../config/AppTheme';

const AppGradientContainer = ({ onPress, disabled, children, style }) => {

    return (
        <TouchableOpacity activeOpacity={0.7}  disabled={disabled} onPress={onPress}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[AppTheme.colors.gradientA, AppTheme.colors.gradientB]} style={[style ? style : null]}>
                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}
export { AppGradientContainer };
