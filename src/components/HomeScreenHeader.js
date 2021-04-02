import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {ICON_CHAT, ICON_NOTIFICATION} from '../../assets/icons';
import {DEFAULT_USER_PIC} from '../../assets/images';
import {UserAvatar} from '../components/UserAvatar';
import {AppTheme} from '../config';
import {setSettings} from '../redux/reducers/settingsSlice';
import {store} from '../redux/store';
import {AppBadge} from './AppBadge';

const HomeScreenHeader = ({route, navigation}) => {
  let {user, settings} = useSelector((state) => state.root);
  return (
    <View
      style={{
        backgroundColor: AppTheme.colors.darkGrey,
        padding: RFValue(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: RFValue(56),
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (user?._id) navigation.navigate('UserProfileScreen', {userID: user?._id});
        }}>
        <View pointerEvents={'none'} style={{padding: RFValue(5)}}>
          <AppBadge count={0} />
          <UserAvatar
            corner={user?.corner || ''}
            color={user?.cornerColor || false}
            source={user?.pic ? {uri: user.pic} : DEFAULT_USER_PIC}
            size={30}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('NotificationScreen');
          store.dispatch(
            setSettings({
              notiCount: 0,
            }),
          );
        }}>
        <View pointerEvents={'none'} style={{}}>
          <AppBadge count={settings.notiCount} />
          <FastImage source={ICON_NOTIFICATION} style={{height: RFValue(40), width: RFValue(40)}} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('InboxScreen');
        }}>
        <View pointerEvents={'none'} style={{}}>
          <AppBadge count={settings.chatCount} />
          <FastImage source={ICON_CHAT} style={{height: RFValue(40), width: RFValue(40)}} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export {HomeScreenHeader};
