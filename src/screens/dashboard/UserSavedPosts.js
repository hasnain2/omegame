
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AppLoadingView, AppPostsListings, AppText } from '../../components';
import { AppTheme } from '../../config';
import { setSavedPosts } from '../../redux/reducers/savedPostsSlice';
import { GetBookmarkPosts } from '../../services/postService';
import { Ionicons } from '../../utils/AppIcons';

const UserSavedPosts = ({ navigation, route, }) => {
    let [state, setState] = useState({
        loading: true,
    })
    let dispatch = useDispatch();
    let savedPosts = useSelector(state => state.root.savedPosts)
    useEffect(() => {
        GetBookmarkPosts((bookmarkResponse) => {
            if (bookmarkResponse) {
                setState(prev => ({ ...prev, loading: false }))
                dispatch(setSavedPosts(bookmarkResponse))
            } else
                setState(prev => ({ ...prev, loading: false }))
        })
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            {state.loading && savedPosts.length < 1 ?
                <AppLoadingView />
                : null}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(10) }} />
                <AppText color={AppTheme.colors.lightGrey} bold={true} size={1}>SAVED POSTS</AppText>
            </View>

            <View style={{ flex: 1, }}>
                <AppPostsListings navigation={navigation} route={route} style={{ backgroundColor: 'black' }} data={savedPosts} />
            </View>
        </View>

    );
};

export { UserSavedPosts };
