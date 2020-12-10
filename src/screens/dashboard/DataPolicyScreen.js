

import React, { useState } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppHeaderCommon, AppText } from '../../components';
import { AppTheme } from '../../config';

const DataPolicyScreen = ({ navigation, route, }) => {
    let [state, setState] = useState({
        loading: false,
    })

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppHeaderCommon navigation={navigation} label={'DATA POLICY'} />
            <View style={{ flex: 1, padding: RFValue(20) }}>
                <AppText size={2} bold={true} color={'white'}>Data Policy</AppText>
                <View style={{ paddingTop: RFValue(10) }}>
                    <AppText style={{ paddingBottom: RFValue(10) }} color={AppTheme.colors.lightGrey} size={1}>Welcome to Omegame </AppText>
                    <AppText color={AppTheme.colors.lightGrey} size={1}>Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame,  </AppText>
                </View>
            </View>
        </View>

    );
};

export { DataPolicyScreen };
