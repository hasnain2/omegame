import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICON_GAME, ICON_PHOTO, ICON_TAG, ICON_TEXT} from '../../../../assets/icons';
import {AppTheme} from '../../../config';
import {UserProfileGridPosts} from './UserProfileGridPosts';
import {UserProfilePosts} from './UserProfilePosts';
import {UserProfileReviews} from './UserProfileReviews';
import {UserProfileTaggedInPosts} from './UserProfileTaggedInPosts';
const Tab = createMaterialTopTabNavigator();

const UserProfileTabs = ({navigation, autoPlay, userID}) => {
  useEffect(() => {}, [autoPlay]);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const ICONS_SIZE = RFValue(40);
          const IMAGESTYLE = {height: ICONS_SIZE, width: ICONS_SIZE};
          if (route.name === 'UserProfilePosts')
            return (
              <View style={{flex: 1}}>
                <Image
                  source={ICON_TEXT}
                  style={{...IMAGESTYLE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey}}
                />
              </View>
            );
          else if (route.name === 'UserProfileGridPosts')
            return (
              <View style={{flex: 1}}>
                <Image
                  source={ICON_PHOTO}
                  style={{...IMAGESTYLE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey}}
                />
              </View>
            );
          else if (route.name === 'UserProfileReviews')
            return (
              <View style={{flex: 1}}>
                <Image
                  source={ICON_GAME}
                  style={{...IMAGESTYLE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey}}
                />
              </View>
            );
          else if (route.name === 'UserProfileExtras')
            return (
              <View style={{flex: 1}}>
                <Image
                  source={ICON_TAG}
                  style={{...IMAGESTYLE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey}}
                />
              </View>
            );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        activeTintColor: 'white',
        inactiveTintColor: '#616161',
        labelStyle: {
          fontSize: RFValue(20),
        },
        iconStyle: {
          flex: 1,
          height: RFValue(40),
          width: RFValue(40),
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabStyle: {
          // height: RFValue(79),
          // width: RFValue(79)
        },
        indicatorStyle: {
          backgroundColor: AppTheme.colors.primary,
        },
        style: {
          backgroundColor: 'black',
          padding: 0,
          margin: 0,
        },
      }}>
      <Tab.Screen name="UserProfilePosts">
        {(props) =>
          props.navigation.isFocused() ? (
            <UserProfilePosts
              {...props}
              style={{backgroundColor: AppTheme.colors.background}}
              userID={userID}
              autoPlay={autoPlay}
            />
          ) : (
            <View style={{maxHeight: 20}}></View>
          )
        }
      </Tab.Screen>
      <Tab.Screen name="UserProfileGridPosts">
        {(props) =>
          props.navigation.isFocused() ? (
            <UserProfileGridPosts
              {...props}
              style={{backgroundColor: AppTheme.colors.background}}
              userID={userID}
              autoPlay={autoPlay}
            />
          ) : (
            <View style={{maxHeight: 20}}></View>
          )
        }
      </Tab.Screen>
      <Tab.Screen name="UserProfileReviews">
        {(props) =>
          props.navigation.isFocused() ? (
            <UserProfileReviews
              {...props}
              style={{backgroundColor: AppTheme.colors.background}}
              userID={userID}
              autoPlay={autoPlay}
            />
          ) : (
            <View style={{maxHeight: 20}}></View>
          )
        }
      </Tab.Screen>
      <Tab.Screen name="UserProfileExtras">
        {(props) =>
          props.navigation.isFocused() ? (
            <UserProfileTaggedInPosts
              {...props}
              style={{backgroundColor: AppTheme.colors.background}}
              userID={userID}
              autoPlay={autoPlay}
            />
          ) : (
            <View style={{maxHeight: 20}}></View>
          )
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export {UserProfileTabs};
