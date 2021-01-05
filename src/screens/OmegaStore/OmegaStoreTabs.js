

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppGoldCoin, AppText } from '../../components';
import { AppTheme } from '../../config';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { Ionicons } from '../../utils/AppIcons';
import { OmegaStoreBackgroundsTab } from './OmegaStoreBackgroundsTab';
import { OmegaStoreCornersTab } from './OmegaStoreCornersTab';
import { OmegaStoreNicknameTab } from './OmegaStoreNicknameTab';
const Tab = createMaterialTopTabNavigator();

const OmegaStoreTabs = ({ navigation, route }) => {
    let { user } = useSelector(state => state.root)

    useEffect(() => {

    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 0.3 }}>
                        <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(10) }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <AppGoldCoin />
                        <AppText style={{ paddingLeft: RFValue(10) }}>{largeNumberShortify(user?.earnedCoins || 0)} OmegaCoins</AppText>
                    </View>
                    <View style={{ flex: 0.3 }} />
                </View>
                <Tab.Navigator
                    initialRouteName={route?.params?.name === 'Corners' ? "Corners" : route?.params?.name === 'nickNames' ? "Nickname" : "Backgrounds"}
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
