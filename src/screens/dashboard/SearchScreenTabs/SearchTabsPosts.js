import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {AppPostsListings} from '../../../components';
import {AppTheme} from '../../../config';
import {GetExplorePosts} from '../../../services';
import {RemoveDuplicateObjectsFromArray} from '../../../utils/AppHelperMethods';

let enableReset = true;
let cursorArrPosts = [];
const SearchTabsPosts = ({navigation}) => {
  const {query} = useSelector((state) => state.root);
  let [state, setState] = useState({
    loading: false,
    loadingPosts: true,
    refreshingPosts: false,
    allPosts: [],
  });

  function getexplorepostshelper(cursor, searchQuery) {
    if (!cursor) cursorArrPosts = [];

    if (!cursorArrPosts.includes(cursor)) {
      GetExplorePosts(
        (postResponse) => {
          if (postResponse && (postResponse.length || enableReset)) {
            let tempData = postResponse;
            setState((prev) => ({
              ...prev,
              loadingPosts: false,
              refreshingPosts: false,
              loading: false,
              allPosts: RemoveDuplicateObjectsFromArray(tempData),
            }));
          } else {
            setState((prev) => ({
              ...prev,
              loadingPosts: false,
              refreshingPosts: false,
              loading: false,
            }));
          }
        },
        cursor,
        searchQuery,
      );
      cursorArrPosts.push(cursor);
    } else {
      setState((prev) => ({...prev, refreshingPosts: false}));
    }
  }

  useEffect(() => {
    enableReset = true;
    cursorArrPosts = [];
    getexplorepostshelper(false, query);
  }, [query]);
  return (
    <View style={{flex: 1}}>
      <AppPostsListings
        navigation={navigation}
        data={state.allPosts}
        loading={state.loadingPosts}
        refreshing={state.refreshingPosts}
        screenType="search"
        loadMore={(cursor, refreshControl) => {
          enableReset = false;
          if (refreshControl) {
            setState((prev) => ({...prev, refreshingPosts: true}));
            getexplorepostshelper(false, query);
          } else {
            getexplorepostshelper(cursor, query);
          }
        }}
        style={{backgroundColor: AppTheme.colors.background}}
      />
    </View>
  );
};

export {SearchTabsPosts};
