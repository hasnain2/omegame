
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AppLoadingView, AppNoDataFound, AppPostsListings, AppText } from '../../components';
import { AppTheme } from '../../config';
import { setSavedPosts } from '../../redux/reducers/savedPostsSlice';
import { store } from '../../redux/store';
import { GetBookmarkPosts } from '../../services/postService';
import { RemoveDuplicateObjectsFromArray } from '../../utils/AppHelperMethods';
import { Ionicons } from '../../utils/AppIcons';
let cursorArr = [];
const UserSavedPosts = ({ navigation, route }) => {
    let [state, setState] = useState({
        loading: true,
        refreshing: false,
        cursor: ''
    });

    let dispatch = useDispatch();
    let { savedPosts } = useSelector(state => state.root);

    function getbookmarkpostshelper(cursor) {
        if (!cursor)
            cursorArr = [];
        if (!cursorArr.includes(cursor)) {
            GetBookmarkPosts((bookmarkResponse) => {
                if (bookmarkResponse?.data && bookmarkResponse?.data?.length > 0) {
                    let newArr = cursor ? [...store.getState().root.savedPosts, ...bookmarkResponse?.data] : bookmarkResponse?.data;

                    dispatch(setSavedPosts(RemoveDuplicateObjectsFromArray(newArr)))
                }
                setState(prev => ({ ...prev, loading: false, refreshing: false, cursor: bookmarkResponse?.cursor || '' }))
            }, cursor);
        }
        cursorArr.push(cursor);
    }
    useEffect(() => {
        getbookmarkpostshelper(false)
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(10) }} />
                <AppText color={AppTheme.colors.lightGrey} bold={true} size={1}>SAVED POSTS</AppText>
            </View>

            {state.loading && savedPosts.length < 1 ?
                <AppLoadingView />
                : null}

            {!state.loading && savedPosts.length < 1 ?
                <AppNoDataFound />
                :
                <View style={{ flex: 1, }}>
                    <AppPostsListings navigation={navigation}
                        route={route} style={{ backgroundColor: 'black' }}
                        refreshing={state.refreshing}
                        loadMore={(offset, refreshControl) => {
                            if (refreshControl) {
                                setState(prev => ({ ...prev, refreshing: true }));
                                getbookmarkpostshelper(false)
                            } else {
                                getbookmarkpostshelper(state.cursor)
                            };
                        }}
                        data={savedPosts} />
                </View>}
        </View>
    );
};

export { UserSavedPosts };
