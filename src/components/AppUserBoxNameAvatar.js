import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppText} from '../components';
import {AppTheme} from '../config';
import {IsUserVerifiedCheck} from './IsUserVerifiedCheck';
import {UserAvatar} from './UserAvatar';
import moment from 'moment';
import {largeNumberShortify} from '../utils/AppHelperMethods';
import {useTranslation} from 'react-i18next';

const AppUserBoxNameAvatar = ({navigation, createdAt, item}) => {
  const {t, i18n} = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{paddingRight: RFValue(8)}}>
        <UserAvatar
          corner={item?.corner || ''}
          color={item?.cornerColor}
          onPress={() => {
            if (item?._id) navigation.navigate('UserProfileScreen', {userID: item?._id});
          }}
          source={item?.pic ? {uri: item?.pic} : false}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{flex: 1}}
        onPress={() => {
          if (item?._id) navigation.navigate('UserProfileScreen', {userID: item?._id});
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AppText bold={true} size={1} color={AppTheme.colors.white}>
              {item?.userName}
            </AppText>
            <IsUserVerifiedCheck check={item?.isVerified} />
            <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{paddingLeft: RFValue(5)}}>
              {largeNumberShortify(item?.level || item?.xp || 0)}
            </AppText>
            {createdAt && (
              <AppText size={1} color={AppTheme.colors.lightGrey}>
                {' '}
                - {t(moment(createdAt).fromNow(true))}
              </AppText>
            )}
          </View>
          <AppText size={1} color={item?.nickNameColor ? item.nickNameColor : AppTheme.colors.lightGrey}>
            {item?.nickName || item?.userName || ''}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export {AppUserBoxNameAvatar};
