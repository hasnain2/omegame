import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICON_COMMENT, ICON_SAVE_POST, ICON_SHARE} from '../../assets/icons';
import {AppText} from '../components';
import {AppTheme} from '../config';
import {UpdatePostFromReduxStore} from '../services/mutateReduxState';
import {LikePost, SaveOrBookMarkPost, SharePost} from '../services/postService';
import {DEEP_LINK_TYPES, SHARE_STATUS_TYPES} from '../utils/AppConstants';
import {DEEP_LINK} from '../utils/AppEndpoints';
import {AppShareContents, largeNumberShortify} from '../utils/AppHelperMethods';
import {FontAwesome} from '../utils/AppIcons';
const PostPoolBottomBar = ({item, navigation, stopPlaying}) => {
  let [state, setState] = useState({
    isShared: item.isShared || false,
    isLiked: false,
    isSaved: item.isSaved || false,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isShared: item.isShared || false,
      isLiked: item.isLiked || false,
      isSaved: item.isSaved || false,
    }));
    // setStateItem(item)
  }, [item.isLiked, item.isSaved, item.isShared]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          paddingHorizontal: RFValue(20),
          // backgroundColor: '#1C1C22',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            let temp = {...item};
            console.log(temp);
            let computed = [...item.computed];
            let newComp = {};
            computed.map((item, index) => {
              if (item.key === 'LIKE') {
                newComp = {...computed[index]};
                newComp.value = !state.isLiked ? newComp.value + 1 : newComp.value - 1;
                computed[index] = newComp;
              }
            });
            UpdatePostFromReduxStore({...item, isLiked: !state.isLiked, computed: computed});
            LikePost(
              () => {
                //console.log('you have successfully liked unliked the post');
              },
              item?._id,
              {
                type: state.isLiked ? 'UN_LIKE' : 'LIKE',
              },
            );
            setState((prev) => ({...prev, isLiked: !state.isLiked}));
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingRight: RFValue(30),
              paddingLeft: RFValue(0),
              alignItems: 'center',
            }}>
            <FontAwesome
              name="heart-o"
              style={{
                fontSize: RFValue(15),
                paddingRight: RFValue(5),
                color: state.isLiked ? AppTheme.colors.primary : AppTheme.colors.white,
              }}
            />
            <AppText size={1} color={AppTheme.colors.lightGrey}>
              {largeNumberShortify(item?.computed?.find((ii) => ii.key === 'LIKE')?.value || (state.isLiked ? 1 : 0))}
            </AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('PostDetailScreenWithComments', {post: item});
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: RFValue(30)}}>
            {/* <Ionicons name="chatbubble-outline" style={{ fontSize: RFValue(20), paddingRight: RFValue(5), color: 'white' }} /> */}
            <FastImage
              source={ICON_COMMENT}
              tintColor={AppTheme.colors.white}
              style={{height: RFValue(25), width: RFValue(25)}}
            />
            <AppText size={1} color={AppTheme.colors.lightGrey}>
              {largeNumberShortify(item?.computed?.find((ii) => ii.key === 'COMMENTS')?.value || 0)}
            </AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (stopPlaying) stopPlaying(true);
            SharePost(() => {}, item?._id, {
              platform: SHARE_STATUS_TYPES.FACEBOOK,
            });

            AppShareContents((res) => {
              if (stopPlaying) stopPlaying(false);
              setState((prev) => ({...prev, isShared: res}));
            }, `Hey you might wanna check this post out on OmeGame.\n${DEEP_LINK}?${DEEP_LINK_TYPES.POST_ID}=${item?._id}`);
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: RFValue(30)}}>
            <FastImage
              source={ICON_SHARE}
              tintColor={AppTheme.colors.white}
              style={{height: RFValue(25), width: RFValue(25)}}
            />
            <AppText size={1} color={AppTheme.colors.lightGrey}>
              {largeNumberShortify(
                item?.computed?.find((ii) => ii.key === 'SHARE')?.value + (state.isShared ? 1 : 0) ||
                  (state.isShared ? 1 : 0),
              )}
            </AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            UpdatePostFromReduxStore({...item, isSaved: !state.isSaved});
            SaveOrBookMarkPost((res) => {}, item?._id, {
              bookmark: !state.isSaved,
            });
            setState((prev) => ({...prev, isSaved: !state.isSaved}));
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={ICON_SAVE_POST}
              style={{
                height: RFValue(25),
                width: RFValue(25),
                tintColor: state.isSaved ? AppTheme.colors.primary : AppTheme.colors.white,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: '#333333',
          borderBottomWidth: 0.5,
          marginVertical: RFValue(5),
        }}></View>
    </View>
  );
};

export {PostPoolBottomBar};
