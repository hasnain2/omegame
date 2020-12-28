

import React, { useEffect, useState } from 'react';
import {
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppLoadingView, AppNoDataFound, AppPostsListings, HomeScreenHeader } from '../../components';
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
                <AppNoDataFound /> :
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
