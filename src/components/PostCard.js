import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {DEFAULT_IMAGE_PLACEHOLDER} from '../../assets/images';
import {AppText} from '../components';
import {AppTheme} from '../config';
import {AppVideoPlayer} from './AppVideoPlayer';
import {PostPoolBottomBar} from './PostPoolBottomBar';
import {PostPoolTopBar} from './PostPoolTopBar';
import ImageModal from 'react-native-image-modal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Keyboard} from 'react-native';

const PostCard = ({item, startPlaying, goBack, navigation, controls}) => {
  let [state, setState] = useState({
    stopPlaying: false,
    imageLoaded: false,
  });
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View
      style={
        {
          // borderBottomColor: AppTheme.colors.darkGrey,
          // borderBottomWidth: 0.5,
          // marginLeft: RFValue(16),
          // marginRight: RFValue(16),
          // marginTop: RFValue(16),
          // backgroundColor: 'red',
          // paddingHorizontal: RFValue(10),
        }
      }>
      <PostPoolTopBar goBack={goBack} item={item} navigation={navigation} />
      {item.text ? (
        <AppText
          size={2}
          style={{
            paddingLeft: RFValue(10),
            paddingVertical: RFValue(5),
            lineHeight: RFValue(20),
          }}>
          {item.text}
        </AppText>
      ) : null}

      {item.location?.addressName ? (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: RFValue(2),
            padding: RFValue(5),
            flexWrap: 'wrap',
          }}>
          <AppText size={0} color={'grey'} style={{paddingTop: 0, paddingLeft: RFValue(10)}}>
            Location: {item.location?.addressName || ''}, {item.location?.country || ''}
          </AppText>
        </View>
      ) : null}

      {item.tagged?.length > 0 ? (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {item.tagged.map((iii, ind) => (
            <AppText
              onPress={() => {
                if (iii?._id) navigation.push('UserProfileScreen', {userID: iii?._id});
              }}
              key={`${iii?.userName}${ind}`}
              size={0}
              color={AppTheme.colors.primary}
              style={{
                paddingHorizontal: RFValue(10),
                padding: RFValue(5),
              }}>
              @{iii?.userName},{' '}
            </AppText>
          ))}
        </View>
      ) : null}

      {item?.attachments && item?.attachments?.length > 0 ? (
        <Pressable
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('PostDetailScreenWithComments', {post: item});
          }}>
          <View style={{height: RFValue(300), width: '100%'}}>
            {item?.attachments[0]?.type.includes('video') ? (
              <AppVideoPlayer
                source={{uri: item?.attachments[0]?.url}}
                startPlaying={startPlaying && !state.stopPlaying}
                controls={controls}
              />
            ) : (
              // <FastImage
              // source={
              //   state.imageLoaded
              //     ? {
              //         uri: item?.attachments[0]?.url,
              //       }
              //     : DEFAULT_IMAGE_PLACEHOLDER
              // }
              //   style={{height: RFValue(300)}}
              //   // fallback
              // onLoadEnd={(res) => {
              //   setState((prev) => ({...prev, imageLoaded: true}));
              // }}
              //   // defaultSource={DEFAULT_IMAGE_PLACEHOLDER}
              //   resizeMode="cover"
              // />
              <ImageModal
                swipeToDismiss={false}
                resizeMode="cover"
                modalImageResizeMode="contain"
                imageBackgroundColor="#000000"
                disabled={keyboardVisible}
                style={{
                  width: Dimensions.get('window').width,
                  height: RFValue(300),
                }}
                source={
                  state.imageLoaded
                    ? {
                        uri: item?.attachments[0]?.url,
                      }
                    : DEFAULT_IMAGE_PLACEHOLDER
                }
                onLoadEnd={(res) => {
                  setState((prev) => ({...prev, imageLoaded: true}));
                }}
              />
            )}
          </View>
        </Pressable>
      ) : null}
      <View style={{height: RFValue(50)}}>
        <PostPoolBottomBar
          item={item}
          navigation={navigation}
          stopPlaying={(val) => {
            setState((prev) => ({...prev, stopPlaying: val}));
          }}
        />
      </View>
    </View>
  );
};

export {PostCard};
