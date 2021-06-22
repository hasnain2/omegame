import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppPostsListingsGrid} from '../../../components';
import {AppTheme} from '../../../config';
import {GetExploreMediaOnlyPosts} from '../../../services';
import {RemoveDuplicateObjectsFromArray} from '../../../utils/AppHelperMethods';

let enableReset = true;
let cursorArrMedia = [];
const SearchTabsMedia = ({navigation}) => {
  const {query} = useSelector((state) => state.root);
  let [state, setState] = useState({
    loading: false,
    loadingMedia: true,
    refreshingMedia: false,
    mediaPosts: [],
  });

  function getexploremediaonlypostshelper(cursor, searchQuery) {
    if (!cursor) cursorArrMedia = [];

    if (!cursorArrMedia.includes(cursor)) {
      GetExploreMediaOnlyPosts(
        (postResponse) => {
          if (postResponse && (postResponse.length || enableReset)) {
            let tempData = postResponse;
            setState((prev) => ({
              ...prev,
              loadingMedia: false,
              refreshingMedia: false,
              loading: false,
              mediaPosts: RemoveDuplicateObjectsFromArray(tempData),
            }));
          } else {
            setState((prev) => ({...prev, loadingMedia: false, refreshingMedia: false, loading: false}));
          }
        },
        cursor,
        searchQuery,
      );
      cursorArrMedia.push(cursor);
    } else {
      setState((prev) => ({...prev, refreshingMedia: false}));
    }
  }

  useEffect(() => {
    enableReset = true;
    cursorArrMedia = [];
    getexploremediaonlypostshelper(false, query);
  }, [query]);
  return (
    <View style={{flex: 1}}>
      <AppPostsListingsGrid
        navigation={navigation}
        data={state.mediaPosts}
        loading={state.loadingMedia}
        refreshing={state.refreshingMedia}
        loadMore={(cursor, refreshControl) => {
          enableReset = false;
          if (refreshControl) {
            setState((prev) => ({...prev, refreshingMedia: true}));
            getexploremediaonlypostshelper(false, query);
          } else {
            getexploremediaonlypostshelper(cursor, query);
          }
        }}
        style={{backgroundColor: AppTheme.colors.background}}
      />
    </View>
  );
};

export {SearchTabsMedia};
