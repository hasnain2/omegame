
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppBackButton, AppPostsListings } from '../../components';
import { setSavedPosts } from '../../redux/reducers/savedPostsSlice';
import { GetBookmarkPosts } from '../../services/postService';
import { RemoveDuplicateObjectsFromArray } from '../../utils/AppHelperMethods';
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
                    let newArr = bookmarkResponse?.data;
                    dispatch(setSavedPosts(RemoveDuplicateObjectsFromArray(newArr)))
                }
                setState(prev => ({ ...prev, loading: false, refreshing: false, cursor: bookmarkResponse?.cursor || '' }))
            }, cursor);
        }
        cursorArr.push(cursor);
    }
    useEffect(() => {
        getbookmarkpostshelper(false);
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppBackButton navigation={navigation} name={"SAVED POSTS"} />

            <View style={{ flex: 1, }}>
                <AppPostsListings navigation={navigation}
                    loading={state.loading}
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
                    data={savedPosts.filter(io => io.isSaved)} />
            </View>
        </View>
    );
};

export { UserSavedPosts };
