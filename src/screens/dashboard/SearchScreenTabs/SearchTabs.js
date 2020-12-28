

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_ADD_FRIEND, ICON_PHOTO, ICON_TEXT } from '../../../../assets/icons';
import { AppPostsListings, AppPostsListingsGrid, AppUserListingWithFollowButtons } from '../../../components';
import { AppTheme } from '../../../config';
import { GetAllTrendingUsers, GetExploreMediaOnlyPosts, GetExplorePosts, GetMediaOnlyPosts } from '../../../services';
import { AppLogger } from '../../../utils/AppHelperMethods';
const Tab = createMaterialTopTabNavigator();
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const ICON_SIZE = RFValue(36)
const SearchTabs = ({ navigation, query }) => {
    // query = query.replaceAll(':', "%")
    AppLogger('----QUERY----', query)
    let [state, setState] = useState({
        loading: false,
        mediaPosts: [],
        allPosts: [],
        usersList: []
    });

    function getexploremediaonlypostshelper(cursor, searchQuery) {
        GetExploreMediaOnlyPosts((postResponse) => {
            if (postResponse) {
                setState(prev => ({ ...prev, loading: false, mediaPosts: postResponse }))
            } else {
                setState(prev => ({ ...prev, loading: false }))
            }
        }, cursor, searchQuery)
    }

    function getexplorepostshelper(cursor, searchQuery) {
        GetExplorePosts((postResponse) => {
            if (postResponse) {
                setState(prev => ({ ...prev, loading: false, allPosts: postResponse }))
            } else {
                setState(prev => ({ ...prev, loading: false }))
            }
        }, cursor, searchQuery)
    }

    function getalltrendingusers(cursor, searchQuery) {
        let newQuery = searchQuery.split('&')
        let newQuery2 = newQuery.find(ii => ii.includes('search'));

        GetAllTrendingUsers((postResponse) => {
            if (postResponse) {
                setState(prev => ({ ...prev, loading: false, usersList: postResponse }))
            } else {
                setState(prev => ({ ...prev, loading: false }))
            }
        }, cursor, newQuery2)
    }

    useEffect(() => {

        AppLogger('--------QUERY-------\n', query)
        getexploremediaonlypostshelper(false, query)
        getexplorepostshelper(false, query)
        getalltrendingusers(false, query)
    }, [query])
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'TabPosts')
                        return <Image source={ICON_TEXT} resizeMode={"cover"} style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                    else if (route.name === 'TabMedia')
                        return <Image source={ICON_PHOTO} resizeMode={"cover"} style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                    else if (route.name === 'TabUsers')
                        return <Image source={ICON_ADD_FRIEND} resizeMode={"cover"} style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: focused ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
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
                    height: RFValue(60),
                    justifyContent: 'center',
                    alignItems: 'center'
                    // width: RFValue(79)
                },
                indicatorStyle: {
                    backgroundColor: AppTheme.colors.primary,
                },
                style: {
                    backgroundColor: AppTheme.colors.background,
                },
            }} >
            <Tab.Screen name="TabPosts"  >
                {(props) => (
                    <View style={{ flex: 1, maxHeight: SCREEN_HEIGHT }}>
                        <AppPostsListings {...props} data={state.allPosts} style={{ backgroundColor: AppTheme.colors.background }} />
                    </View>
                )}
            </Tab.Screen>
            <Tab.Screen name="TabMedia"  >
                {(props) => (
                    <View style={{ flex: 1, maxHeight: SCREEN_HEIGHT }}>
                        <AppPostsListingsGrid {...props} data={state.mediaPosts} style={{ backgroundColor: AppTheme.colors.background }} />
                    </View>
                )}
            </Tab.Screen>
            <Tab.Screen name="TabUsers"  >
                {(props) => (
                    <View style={{ flex: 1, maxHeight: SCREEN_HEIGHT }}>
                        <AppUserListingWithFollowButtons data={state.usersList} {...props} style={{ backgroundColor: AppTheme.colors.background }} />
                    </View>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};


export { SearchTabs };
