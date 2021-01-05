import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_ARROW_LEFT } from '../../assets/icons';
import { AppText } from './AppText';

const size = RFValue(40);
const AppBackButton = ({ navigation, onPress, name }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {
                if (onPress)
                    onPress()
                else
                    navigation.goBack()
            }} style={{ padding: RFValue(8), width: RFValue(65) }}>
                <Image source={ICON_ARROW_LEFT} style={{ tintColor: 'white', height: size, width: size }} />
            </TouchableOpacity>
            {name && <AppText size={2} color={'grey'} >{name}</AppText>}
        </View>
    );
};

export { AppBackButton };
