import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Platform, RefreshControl, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppTheme} from '../config';
import {AppBlurView} from './AppBlurView';
import {AppBoxCard} from './AppBoxCard';
import {AppLoadingView} from './AppLoadingView';
import {AppModal} from './AppModal';
import {AppNoDataFound} from './AppNoDataFound';
import {AppVideoPlayer} from './AppVideoPlayer';
import {PostPoolBottomBar} from './PostPoolBottomBar';
import {PostPoolTopBar} from './PostPoolTopBar';
var uuid = require('react-native-uuid');

const {height, width} = Dimensions.get('screen');
let POST_DATA = null;
const NUMBER_OF_COLUMNS = 3;
const AppPostsListingsGrid = ({navigation, data, style, loading, refreshing, loadMore}) => {
  const PADDING = RFValue(2);
  const CARD_SIZE = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - PADDING * RFValue(2);

  let [state, setState] = useState({
    currentItemIndex: 0,
    showPost: false,
  });

  return (
    <View
      style={[{flex: 1, paddingTop: RFValue(10), backgroundColor: AppTheme.colors.background}, style ? style : null]}>
      {!loading && data.length < 1 ? <AppNoDataFound /> : null}
      {loading ? <AppLoadingView /> : null}
      <FlatList
        data={data}
        numColumns={NUMBER_OF_COLUMNS}
        style={{flex: 1}}
        nestedScrollEnabled={true}
        windowSize={Platform.OS === 'ios' ? 3 : 2}
        initialNumToRender={Platform.OS === 'ios' ? 10 : 3}
        maxToRenderPerBatch={Platform.OS === 'ios' ? 10 : 3}
        keyboardShouldPersistTaps={'always'}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={'white'}
            onRefresh={() => {
              if (loadMore) loadMore(false, true);
            }}
          />
        }
        onEndReached={() => {
          if (loadMore) {
            loadMore(data[data.length - 1]?._id, false);
          }
        }}
        onEndReachedThreshold={0.5}
        keyExtractor={(ii) => ii?._id + uuid.v1()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('PostDetailScreenWithComments', {post: item});
            }}
            onPressOut={() => {
              setState((prev) => ({...prev, showPost: false}));
            }}
            onLongPress={() => {
              POST_DATA = item;
              setState((prev) => ({...prev, showPost: true}));
            }}>
            <View style={{padding: PADDING}}>
              <AppBoxCard item={item} navigation={navigation} size={CARD_SIZE} />
            </View>
          </TouchableOpacity>
        )}
      />

      <AppModal show={state.showPost} toggle={() => setState((prev) => ({...prev, showPost: false}))}>
        <AppBlurView style={{width}}>
          <TouchableOpacity style={{flex: 1, width}} onPress={() => setState((prev) => ({...prev, showPost: false}))}>
            <View style={{width, flex: 1, justifyContent: 'center'}}>
              <View style={{borderBottomColor: AppTheme.colors.darkGrey, borderBottomWidth: 0.5}}>
                <PostPoolTopBar item={POST_DATA} navigation={navigation} />

                {POST_DATA?.attachments && POST_DATA?.attachments?.length > 0 ? (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setState((prev) => ({...prev, showPost: false}));
                      navigation.navigate('PostDetailScreenWithComments', {post: POST_DATA});
                    }}>
                    <View style={{height: RFValue(300), width: '100%'}}>
                      {POST_DATA?.attachments[0]?.type.includes('video') ? (
                        <AppVideoPlayer source={{uri: POST_DATA?.attachments[0]?.url}} startPlaying={true} />
                      ) : (
                        <FastImage
                          source={{
                            uri: POST_DATA?.attachments[0]?.url,
                            // cache: FastImage.cacheControl.cacheOnly
                          }}
                          style={{height: RFValue(300)}}
                          resizeMode="cover"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ) : null}
                <PostPoolBottomBar item={POST_DATA} navigation={navigation} />
              </View>
            </View>
          </TouchableOpacity>
        </AppBlurView>
      </AppModal>
    </View>
  );
};

export {AppPostsListingsGrid};
