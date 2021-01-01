

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_ADD_FRIEND, ICON_PHOTO, ICON_TEXT } from '../../../../assets/icons';
import { AppPostsListings, AppPostsListingsGrid, AppUserListingWithFollowButtons } from '../../../components';
import { AppTheme } from '../../../config';
import { GetAllTrendingUsers, GetExploreMediaOnlyPosts, GetExplorePosts } from '../../../services';
import { AppLogger, RemoveDuplicateObjectsFromArray } from '../../../utils/AppHelperMethods';
const Tab = createMaterialTopTabNavigator();
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const ICON_SIZE = RFValue(36);

let cursorArrPosts = [];
let cursorArrMedia = [];
let cursorArrUsers = [];
const SearchTabs = ({ navigation, query }) => {
    // query = query.replaceAll(':', "%")
    AppLogger('----QUERY----', query)
    let [state, setState] = useState({
        loading: false,
        loadingPosts: true, refreshingPosts: false,
        loadingMedia: true, refreshingMedia: false,
        loadingAllUsers: true, refreshingAllUsers: false,
        mediaPosts: [],
        allPosts: [],
        usersList: []
    });

    function getexploremediaonlypostshelper(cursor, searchQuery) {
        if (!cursor)
            cursorArrMedia = []

        if (!cursorArrMedia.includes(cursor)) {
            GetExploreMediaOnlyPosts((postResponse) => {
                if (postResponse && postResponse.length > 0) {
                    let tempData = postResponse
                    setState(prev => ({ ...prev, loadingMedia: false, refreshingMedia: false, loading: false, mediaPosts: RemoveDuplicateObjectsFromArray(tempData) }))
                } else {
                    setState(prev => ({ ...prev, loadingMedia: false, refreshingMedia: false, loading: false }))
                }
            }, cursor, searchQuery);
            cursorArrMedia.push(cursor)
        } else {
            setState(prev => ({ ...prev, refreshingMedia: false }))
        }
    }

    function getexplorepostshelper(cursor, searchQuery) {
        if (!cursor)
            cursorArrPosts = []

        if (!cursorArrPosts.includes(cursor)) {
            GetExplorePosts((postResponse) => {
                if (postResponse && postResponse.length > 0) {
                    let tempData = postResponse
                    setState(prev => ({ ...prev, loadingPosts: false, refreshingPosts: false, loading: false, allPosts: RemoveDuplicateObjectsFromArray(tempData) }))
                } else {
                    setState(prev => ({ ...prev, loadingPosts: false, refreshingPosts: false, loading: false }))
                }
            }, cursor, searchQuery);

            cursorArrPosts.push(cursor)
        } else {
            setState(prev => ({ ...prev, refreshingPosts: false }))
        }
    }

    function getalltrendingusers(cursor, searchQuery) {
        let newQuery = searchQuery.split('&')
        let newQuery2 = newQuery.find(ii => ii.includes('search')) || '';

        if (!cursor)
            cursorArrPosts = []

        if (!cursorArrUsers.includes(cursor)) {
            GetAllTrendingUsers((postResponse) => {
                if (postResponse) {
                    let tempData = postResponse;
                    setState(prev => ({ ...prev, loadingAllUsers: false, loading: false, refreshingAllUsers: false, usersList: RemoveDuplicateObjectsFromArray(tempData) }))
                } else {
                    setState(prev => ({ ...prev, loadingAllUsers: false, loading: false, refreshingAllUsers: false, }))
                }
                debugger
            }, cursor, `${newQuery2}`)

        } else {
            setState(prev => ({ ...prev, refreshingPosts: false }))
        }
    }

    useEffect(() => {
        cursorArrPosts = [];
        cursorArrMedia = [];
        cursorArrUsers = [];
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
                        <AppPostsListings {...props}
                            data={state.allPosts}
                            loading={state.loadingPosts}
                            refreshing={state.refreshingPosts}
                            loadMore={(cursor, refreshControl) => {
                                if (refreshControl) {
                                    setState(prev => ({ ...prev, refreshingPosts: true }));
                                    getexplorepostshelper(false, query)
                                } else {
                                    getexplorepostshelper(cursor, query)
                                };
                            }}
                            style={{ backgroundColor: AppTheme.colors.background }} />
                    </View>
                )}
            </Tab.Screen>
            <Tab.Screen name="TabMedia"  >
                {(props) => (
                    <View style={{ flex: 1, maxHeight: SCREEN_HEIGHT }}>
                        <AppPostsListingsGrid {...props}
                            data={state.mediaPosts}
                            loading={state.loadingMedia}
                            refreshing={state.refreshingMedia}
                            loadMore={(cursor, refreshControl) => {
                                if (refreshControl) {
                                    setState(prev => ({ ...prev, refreshingMedia: true }));
                                    getexploremediaonlypostshelper(false, query)
                                } else {
                                    getexploremediaonlypostshelper(cursor, query)
                                };
                            }}
                            style={{ backgroundColor: AppTheme.colors.background }} />
                    </View>
                )}
            </Tab.Screen>
            <Tab.Screen name="TabUsers"  >
                {(props) => (
                    <View style={{ flex: 1, maxHeight: SCREEN_HEIGHT }}>
                        <AppUserListingWithFollowButtons
                            {...props}
                            data={state.usersList}
                            loading={state.loadingAllUsers}
                            refreshing={state.refreshingAllUsers}
                            loadMore={(cursor, refreshControl) => {
                                if (refreshControl) {
                                    setState(prev => ({ ...prev, refreshingAllUsers: true }));
                                    getalltrendingusers(false, query)
                                } else {
                                    getalltrendingusers(cursor, query)
                                };
                            }}
                            style={{ backgroundColor: AppTheme.colors.background }} />
                    </View>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};


export { SearchTabs };
