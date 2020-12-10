

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { GOLD_ICON } from '../../../assets/icons';
import { AppGoldCoin, AppText } from '../../components';
import { AppTheme } from '../../config';
import { Ionicons } from '../../utils/AppIcons';
import { OmegaStoreBackgroundsTab } from './OmegaStoreBackgroundsTab';
import { OmegaStoreCornersTab } from './OmegaStoreCornersTab';
import { OmegaStoreNicknameTab } from './OmegaStoreNicknameTab';
const Tab = createMaterialTopTabNavigator();

const OmegaStoreTabs = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 0.3 }}>
                        <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(10) }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <AppGoldCoin />
                        <AppText style={{ paddingLeft: RFValue(10) }}>1234 OmegaCoins</AppText>
                    </View>
                    <View style={{ flex: 0.3 }} />
                </View>
                <Tab.Navigator
                    tabBarOptions={{
                        showLabel: true,
                        showIcon: false,
                        activeTintColor: AppTheme.colors.primary,
                        inactiveTintColor: '#616161',
                        labelStyle: {
                            fontSize: RFValue(12),
                        },
                        tabStyle: {
                            // height: RFValue(79),
                            // width: RFValue(79)
                        },
                        indicatorStyle: {
                            backgroundColor: AppTheme.colors.primary
                        },
                        style: {
                            backgroundColor: 'black',

                        },
                    }}
                >
                    <Tab.Screen name="Backgrounds" component={OmegaStoreBackgroundsTab} />
                    <Tab.Screen name="Corners" component={OmegaStoreCornersTab} />
                    <Tab.Screen name="Nickname" component={OmegaStoreNicknameTab} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
};


export { OmegaStoreTabs };
