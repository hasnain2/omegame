

import React, { useEffect, useState } from 'react';
import {
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppLoadingView, AppNoDataFound, AppPostsListings, HomeScreenHeader } from '../../components';
import { setHomeFeed } from '../../redux/reducers/homeFeedSlice';
import { GetHomeFeed } from '../../services/postService';
const HomeScreen = ({ route, navigation }) => {
    let [state, setState] = useState({
        loading: true,
        data: []
    })
    let disptach = useDispatch();
    let homeFeed = useSelector(state => state.root.homeFeed)
    console.log('-------------HOME FEEDS--------', homeFeed[0])
    useEffect(() => {
        GetHomeFeed((res) => {
            if (res) {
                disptach(setHomeFeed(res))
            }
            setState(prev => ({ ...prev, loading: false }))
        });
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {/* <AppGooglePlacesAutoFill /> */}
            <HomeScreenHeader navigation={navigation} route={route} />

            {state.loading && homeFeed.length < 1 ?
                <AppLoadingView /> : null}

            {!state.loading && homeFeed.length < 1 ?
                <AppNoDataFound /> : <AppPostsListings navigation={navigation} data={homeFeed} />}
        </View>
    );
};

export { HomeScreen };
