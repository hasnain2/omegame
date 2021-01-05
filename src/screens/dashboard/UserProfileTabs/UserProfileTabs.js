

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_GAME, ICON_PHOTO, ICON_TAG, ICON_TEXT } from '../../../../assets/icons';
import { AppTheme } from '../../../config';
import { UserProfileExtras } from './UserProfileExtras';
import { UserProfileGridPosts } from './UserProfileGridPosts';
import { UserProfilePosts } from './UserProfilePosts';
import { UserProfileReviews } from './UserProfileReviews';
const Tab = createMaterialTopTabNavigator();
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const UserProfileTabs = ({ navigation, scrollPosition, autoPlay, userID }) => {

    useEffect(() => {

    }, [])
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    const ICONS_SIZE = RFValue(40);
                    const IMAGESTYLE = { height: ICONS_SIZE, width: ICONS_SIZE };
                    if (route.name === 'UserProfilePosts')
                        return (
                            <View style={{ flex: 1, }}>
                                <Image source={ICON_TEXT} style={{ ...IMAGESTYLE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                            </View>
                        )
                    else if (route.name === 'UserProfileGridPosts')
                        return (
                            <View style={{ flex: 1, }}>
                                <Image source={ICON_PHOTO} style={{ ...IMAGESTYLE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                            </View>
                        )
                    else if (route.name === 'UserProfileReviews')
                        return (
                            <View style={{ flex: 1, }}>
                                <Image source={ICON_GAME} style={{ ...IMAGESTYLE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                            </View>
                        )
                    else if (route.name === 'UserProfileExtras')
                        return (
                            <View style={{ flex: 1, }}>
                                <Image source={ICON_TAG} style={{ ...IMAGESTYLE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                            </View>
                        )
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
                    alignItems: 'center'
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
                    padding: 0,
                    margin: 0,
                },
            }}
        >
            <Tab.Screen name="UserProfilePosts"  >
                {(props) => (
                    <View style={{ flex: 1 }}>
                        <UserProfilePosts {...props}
                            style={{ backgroundColor: AppTheme.colors.background }}
                            userID={userID}
                            autoPlay={true} />
                    </View>
                )}
            </Tab.Screen>
            <Tab.Screen name="UserProfileGridPosts"  >
                {(props) => (
                    <View style={{ flex: 1 }}>
                        <UserProfileGridPosts {...props}
                            style={{ backgroundColor: AppTheme.colors.background }}
                            userID={userID}
                            autoPlay={autoPlay} />
                    </View>
                )}
            </Tab.Screen>
            <Tab.Screen name="UserProfileReviews"  >
                {(props) => (
                    <View style={{ flex: 1 }}>
                        <UserProfileReviews {...props}
                            style={{ backgroundColor: AppTheme.colors.background }}
                            userID={userID}
                            autoPlay={autoPlay} />
                    </View>
                )}
            </Tab.Screen>
            <Tab.Screen name="UserProfileExtras"  >
                {(props) => (
                    <View style={{ flex: 1 }}>
                        <UserProfileGridPosts {...props}
                            style={{ backgroundColor: AppTheme.colors.background }}
                            userID={userID}
                            autoPlay={autoPlay} />
                    </View>

                    // <View style={{ flex: 1 }}>
                    //     <UserProfileExtras {...props}
                    //         style={{ backgroundColor: AppTheme.colors.background }}
                    //         userID={userID}
                    //         scrollPosition={(dta) => {
                    //             scrollPosition ? scrollPosition(dta) : null
                    //         }}
                    //         autoPlay={autoPlay} />
                    // </View>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export { UserProfileTabs };
