import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_ARROW_LEFT } from '../../assets/icons';

const size = RFValue(40);
const AppBackButton = ({ navigation, onPress }) => {
    return (
        <TouchableOpacity onPress={() => {
            if (onPress)
                onPress()
            else
                navigation.goBack()
        }} style={{ padding: RFValue(8), width: RFValue(65) }}>
            <Image source={ICON_ARROW_LEFT} style={{ tintColor: 'white', height: size, width: size }} />
        </TouchableOpacity>
    );
};

export { AppBackButton };
