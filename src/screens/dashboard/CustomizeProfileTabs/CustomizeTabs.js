import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppTheme} from '../../../config';
import {CustomizeBackgroundTab} from './CustomizeBackgroundTab';
import {CustomizeCornersTab} from './CustomizeCornersTab';
import {CustomizeNicknameTab} from './CustomizeNicknameTab';
const Tab = createMaterialTopTabNavigator();

const CustomizeTabs = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: true,
            showIcon: false,
            activeTintColor: AppTheme.colors.primary,
            inactiveTintColor: '#616161',
            labelStyle: {
              fontSize: RFValue(12),
              margin: 0,
              fontWeight: 'bold',
            },
            tabStyle: {
              margin: 1,
              padding: 0,
              paddingHorizontal: RFValue(10),
              width: 'auto',
            },
            indicatorStyle: {
              backgroundColor: AppTheme.colors.primary,
            },
            style: {
              backgroundColor: 'black',
              marginHorizontal: RFValue(30),
            },
          }}>
          <Tab.Screen name="Backgrounds" component={CustomizeBackgroundTab} />
          <Tab.Screen name="Corners" component={CustomizeCornersTab} />
          <Tab.Screen name="Nickname" component={CustomizeNicknameTab} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export {CustomizeTabs};
