
import React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppText } from '../components';
import { Ionicons } from '../utils/AppIcons';

const AppHeader = ({ navigation, label }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 0.3 }}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(10) }} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {label ?
                    <AppText style={{ paddingLeft: RFValue(10) }}>{label}</AppText>
                    : null}
            </View>
            <View style={{ flex: 0.3 }}>

            </View>
        </View>
    );
};

export { AppHeader };
