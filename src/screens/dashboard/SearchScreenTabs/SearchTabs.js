import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICON_ADD_FRIEND, ICON_PHOTO, ICON_TEXT} from '../../../../assets/icons';
import {AppTheme} from '../../../config';
import {SearchTabsMedia} from './SearchTabsMedia';
import {SearchTabsPosts} from './SearchTabsPosts';
import {SearchTabsUsers} from './SearchTabsUsers';
const Tab = createMaterialTopTabNavigator();
const ICON_SIZE = RFValue(36);

const SearchTabs = ({navigation, type}) => {
  useEffect(() => {}, [type]);
  return (
    <Tab.Navigator
      initialRouteName={type === 'users' ? 'TabUsers' : 'TabPosts'}
      sceneContainerStyle={{
        backgroundColor: '#1C1C22',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'TabPosts')
            return (
              <Image
                source={ICON_TEXT}
                resizeMode={'cover'}
                style={{
                  alignSelf: 'center',
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey,
                }}
              />
            );
          else if (route.name === 'TabMedia')
            return (
              <Image
                source={ICON_PHOTO}
                resizeMode={'cover'}
                style={{
                  alignSelf: 'center',
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey,
                }}
              />
            );
          else if (route.name === 'TabUsers')
            return (
              <Image
                source={ICON_ADD_FRIEND}
                resizeMode={'cover'}
                style={{
                  alignSelf: 'center',
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey,
                }}
              />
            );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        activeTintColor: 'white',
        inactiveTintColor: '#616161',
        labelStyle: {
          fontSize: 15,
        },
        tabStyle: {
          height: RFValue(56),
          justifyContent: 'center',
          alignItems: 'center',
          // width: RFValue(79)
        },
        indicatorStyle: {
          backgroundColor: AppTheme.colors.primary,
          color: 'red',
        },
        style: {
          backgroundColor: AppTheme.colors.searchPage,
          borderBottomColor: 'black',
          borderBottomWidth: RFValue(2),
        },
      }}>
      <Tab.Screen name="TabPosts">{(props) => <SearchTabsPosts {...props} />}</Tab.Screen>
      <Tab.Screen name="TabMedia">{(props) => <SearchTabsMedia {...props} />}</Tab.Screen>
      <Tab.Screen name="TabUsers">{(props) => <SearchTabsUsers {...props} />}</Tab.Screen>
    </Tab.Navigator>
  );
};

export {SearchTabs};
