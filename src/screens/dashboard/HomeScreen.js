

import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    RefreshControl,
    View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AppLoadingView, AppPostsListings, AppText, HomeScreenHeader } from '../../components';
import { AppTheme } from '../../config';
import { setHomeFeed } from '../../redux/reducers/homeFeedSlice';
import { store } from '../../redux/store';
import { GetHomeFeed } from '../../services/postService';
import { initSocket } from '../../services/socketService';
let cursorArr = []
const HomeScreen = ({ route, navigation }) => {
    let [state, setState] = useState({
        loading: true,
        refreshing: false,
        data: []
    })
    let disptach = useDispatch();
    let { homeFeed, user } = useSelector(state => state.root);

    function getHomeFeedHelper(cursor) {
        if (!cursor)
            cursorArr = [];
        if (!cursorArr.includes(cursor)) {
            GetHomeFeed((res) => {
                if (res && res?.length > 0) {
                    let newArr = cursor ? [...store.getState().root.homeFeed, ...res] : res;

                    let uniqueArr = [...new Set(newArr.map(item => item?._id ? item : false))];
                    disptach(setHomeFeed(uniqueArr))
                }
                setState(prev => ({ ...prev, loading: false, refreshing: false }))
            }, cursor);
        } else {
            setState(prev => ({ ...prev, loading: false, refreshing: false }))
        }
        cursorArr.push(cursor)
    }
    useEffect(() => {
        initSocket(user.token);
        getHomeFeedHelper(false);
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {/* <AppGooglePlacesAutoFill /> */}
            <HomeScreenHeader navigation={navigation} route={route} />

            {!state.loading && homeFeed?.length < 1 ?
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={state.refreshing}
                            tintColor={'white'}
                            onRefresh={() => {
                                setState(prev => ({ ...prev, refreshing: true }))
                                getHomeFeedHelper(false);
                            }}
                        />
                    }
                    style={{}}>
                    <View style={{ paddingVertical: RFValue(100), justifyContent: 'center', alignItems: 'center' }}>
                        <AppText color={"grey"} >No posts found!</AppText>
                        <AppText onPress={() => {
                            navigation.navigate("Search", { type: 'users' });
                        }} color={AppTheme.colors.primary} >Follow users?</AppText>
                    </View>
                </ScrollView> :
                state.loading && homeFeed?.length < 1 ?
                    <AppLoadingView /> :
                    <AppPostsListings navigation={navigation}
                        data={homeFeed}
                        refreshing={state.refreshing}
                        loadMore={(offset, refreshControl) => {
                            if (refreshControl) {
                                setState(prev => ({ ...prev, refreshing: true }));
                                getHomeFeedHelper(false)
                            } else {
                                getHomeFeedHelper(offset)
                            };
                        }} />}
        </View>
    );
};

export { HomeScreen };
