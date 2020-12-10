

import React, { useEffect, useState } from 'react';
import {
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppLoadingView, AppGooglePlacesAutoFill, AppPostsListings, HomeScreenHeader } from '../../components';
import { AppTheme } from '../../config';
import { setHomeFeed } from '../../redux/reducers/homeFeedSlice';
import { GetHomeFeed } from '../../services/postService';
const HomeScreen = ({ route, navigation }) => {
    let [state, setState] = useState({
        loading: true,
        data: []
    })
    let disptach = useDispatch();
    let homeFeed = useSelector(state => state.root.homeFeed)
    
    useEffect(() => {
        GetHomeFeed((res) => {
            if (res) {
                disptach(setHomeFeed(res))
            }
            setState(prev => ({ ...prev, loading: false }))
        });
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: AppTheme.colors.background }}>
            {state.loading && homeFeed.length < 1 ?
                <AppLoadingView /> : null}

            {/* <AppGooglePlacesAutoFill /> */}
            <HomeScreenHeader navigation={navigation} route={route} />
            <AppPostsListings navigation={navigation} data={homeFeed} />
        </View>
    );
};

export { HomeScreen };
