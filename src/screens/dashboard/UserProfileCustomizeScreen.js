import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Bar} from 'react-native-progress';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {BACKGROUND_IMG, DEFAULT_USER_PIC} from '../../../assets/images';
import {AppBackButton, AppGoldCoin, AppText, IsUserVerifiedCheck} from '../../components';
import {UserAvatar} from '../../components/UserAvatar';
import {AppTheme} from '../../config';
import {largeNumberShortify} from '../../utils/AppHelperMethods';
import {CustomizeTabs} from './CustomizeProfileTabs/CustomizeTabs';
const UserProfileCustomizeScreen = ({navigation, route}) => {
  let {user} = useSelector((state) => state.root);

  let [state, setState] = useState({
    loading: false,
    LHeight: 0,
    LWidth: 0,
    bioShowMoreLines: 3,
  });
  const TRANS_BLACK = 'rgba(0,0,0,0.0)';
  const BLACK = 'black';
  const COLORS_ARR = [
    AppTheme.colors.darkGrey,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    BLACK,
    BLACK,
  ];

  return (
    <View
      style={{flex: 1, backgroundColor: 'black'}}
      onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        setState((prev) => ({...prev, LHeight: height, LWidth: width}));
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}>
        <AppBackButton navigation={navigation} />
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{height: RFValue(450), width: state.LWidth}}>
          <FastImage
            source={user?.cover ? {uri: user.cover} : BACKGROUND_IMG}
            style={{height: RFValue(430), width: state.LWidth}}>
            <LinearGradient colors={COLORS_ARR} style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
              <UserAvatar
                corner={user?.corner || ''}
                color={user?.cornerColor}
                source={user?.pic ? {uri: user.pic} : DEFAULT_USER_PIC}
                size={120}
                screen={'profile'}
              />
              <View style={{flexDirection: 'row', paddingVertical: RFValue(15), alignItems: 'center'}}>
                <View style={{flexDirection: 'row', flex: 1, paddingLeft: RFValue(5)}}>
                  <AppGoldCoin />
                  <AppText size={2} style={{paddingHorizontal: RFValue(5)}}>
                    {largeNumberShortify(user?.earnedCoins || 0)}
                  </AppText>
                </View>
                <View style={{flex: 1, marginRight: RFValue(20)}}>
                  <Bar
                    height={RFValue(10)}
                    width={Platform.OS === 'ios' ? 150 : 150}
                    progress={(user?.earnedXps || 0) / 100}
                    // backgroundColor={'#C2C2C2'}
                    color={'#0f4FF5'}
                    unfilledColor="#47557B"
                    borderColor="none"
                  />
                  {/* <Bar
                    style={{height: RFValue(10), borderRadius: 3}}
                    progress={(user?.earnedXps || 0) / 100}
                    color={AppTheme.colors.primary}
                    color={'#0f4FF5'}
                    unfilledColor="#47557B"
                  /> */}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1, marginRight: RFValue(10)}}>
                  <AppText size={1} bold={true} style={{}}>
                    XP {largeNumberShortify(user?.earnedXps || 0)}/100
                  </AppText>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: RFValue(10),
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <AppText size={2} color={AppTheme.colors.white} bold={true} style={{}}>
                      {user?.userName}
                    </AppText>
                    <IsUserVerifiedCheck check={user?.isVerified} />
                  </View>
                  <AppText size={1} color={user?.nickNameColor ? user?.nickNameColor : AppTheme.colors.lightGrey}>
                    {user?.nickName || user?.firstName || user?.userName}
                  </AppText>
                </View>
                <View
                  style={{
                    borderRadius: RFValue(5),
                    borderWidth: 1,
                    justifyContent: 'center',
                    paddingVertical: RFValue(10),
                    paddingHorizontal: RFValue(20),
                    alignItems: 'center',
                    borderColor: AppTheme.colors.primary,
                  }}>
                  <AppText size={1} color={AppTheme.colors.primary} bold={true} style={{fontSize: 10}}>
                    LEVEL
                  </AppText>
                  <AppText size={4} color={AppTheme.colors.primary} bold={true} style={{fontSize: 26}}>
                    {user?.level}
                  </AppText>
                </View>
              </View>
            </LinearGradient>
          </FastImage>
        </View>
        <CustomizeTabs navigation={navigation} route={route} />
      </ScrollView>
    </View>
  );
};

export {UserProfileCustomizeScreen};
