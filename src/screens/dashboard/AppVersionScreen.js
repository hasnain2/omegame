

import React from 'react';
import { Image, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { APP_LOGO } from '../../../assets/images';
import { AppBackButton, AppText } from '../../components';

const AppVersionScreen = ({ navigation, route, }) => {
    let { user } = useSelector(state => state.root);

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppBackButton navigation={navigation} name={"APP VERSION"} />
            </View>
            <View style={{ padding: RFValue(15), flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={APP_LOGO} style={{ height: RFValue(100), width: RFValue(100) }} />
                <AppText style={{ padding: RFValue(10) }} >{DeviceInfo.getApplicationName()}</AppText>
                <AppText size={3} color={'grey'} >App Version: {DeviceInfo.getVersion()}</AppText>

                <AppText size={3} color={'grey'}>Build Number: {DeviceInfo.getBuildNumber()}</AppText>
            </View>

        </View>
    );
};

export { AppVersionScreen };
