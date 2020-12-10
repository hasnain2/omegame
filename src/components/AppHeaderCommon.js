
import React, { useState } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppText } from '../components';
import { AppTheme } from '../config';
import { Ionicons } from '../utils/AppIcons';
import { AppBackButton } from './AppBackButton';

const AppHeaderCommon = ({ navigation, onPress, label, }) => {
    let [state, setState] = useState({
        loading: false,
    })

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppBackButton navigation={navigation} onPress={onPress} />
            {label &&
                <AppText color={AppTheme.colors.lightGrey} bold={true} size={1}>{label}</AppText>}
        </View>
    );
};

export { AppHeaderCommon };
