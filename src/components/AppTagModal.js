import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector, useDispatch} from 'react-redux';
import {DEFAULT_USER_PIC} from '../../assets/images';
import {AppTheme} from '../config';
import {setFriends} from '../redux/reducers/friendsSlice';
import {store} from '../redux/store';
import {GetUserList} from '../services/profileService';
import {GET_FRIEND_LIST_TYPES} from '../utils/AppConstants';
import {largeNumberShortify} from '../utils/AppHelperMethods';
import {AntDesign} from '../utils/AppIcons';
import {AppBackButton} from './AppBackButton';
import {AppModal} from './AppModal';
import {AppNoDataFound} from './AppNoDataFound';
import {AppSearchBar} from './AppSearchBar';
import {AppText} from './AppText';
import {IsUserVerifiedCheck} from './IsUserVerifiedCheck';
import {UserAvatar} from './UserAvatar';

const SkelPlaceHolder = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
const AppTagModal = ({show, toggle, selectedContacts, chosenContacts = [], showDone}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  let friends = useSelector((state) => state.root.friends);
  let disp = useDispatch();
  function getUserList(cursor) {
    setLoading(true);
    GetUserList(
      (response) => {
        if (response) {
          setUser(response.data);
        }
        setLoading(false);
      },
      10,
      'DESC',
      searchQuery,
      '',
    );
  }

  useEffect(() => {
    getUserList(false);
  }, [searchQuery]);
  return (
    <AppModal show={show} toggle={toggle}>
      <View style={{flex: 1, width: '100%', backgroundColor: 'black', paddingVertical: RFValue(20)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <AppBackButton onPress={() => toggle()} />

          {showDone ? (
            <AppText
              onPress={() => {
                toggle();
              }}
              size={3}
              color={AppTheme.colors.primary}
              style={{padding: RFValue(20)}}>
              Done
            </AppText>
          ) : null}
        </View>

        <View style={{paddingHorizontal: RFValue(20)}}>
          <AppSearchBar
            hideFilter={true}
            onChangeText={(val) => {
              setSearchQuery(val);
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={user}
            initialNumToRender={2}
            windowSize={2}
            removeClippedSubviews={true}
            maxToRenderPerBatch={2}
            bounces={false}
            keyExtractor={(ii) => (ii?._id || '') + 'you'}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  selectedContacts(item);
                  toggle();
                }}>
                <View
                  style={{
                    padding: RFValue(20),
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: AppTheme.colors.divider,
                    alignItems: 'center',
                  }}>
                  <UserAvatar
                    corner={item?.corner || ''}
                    color={item?.cornerColor}
                    source={item?.pic ? {uri: item?.pic} : DEFAULT_USER_PIC}
                    size={50}
                  />
                  <View style={{flex: 1, paddingLeft: RFValue(10)}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <AppText bold={true} size={1} color={'white'}>
                        {item?.firstName || item?.userName}
                      </AppText>
                      <IsUserVerifiedCheck check={item?.isVerified} />
                      <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{paddingLeft: RFValue(5)}}>
                        {largeNumberShortify(item?.level || 0)}
                      </AppText>
                    </View>
                    <AppText size={1} color={item?.nickNameColor ? item?.nickNameColor : AppTheme.colors.lightGrey}>
                      {item?.nickName || item?.userName}
                    </AppText>
                  </View>
                  {chosenContacts.find((ii) => ii?._id === item?._id) ? (
                    <AntDesign name={'check'} style={{fontSize: RFValue(20), color: AppTheme.colors.green}} />
                  ) : null}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </AppModal>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
  },
});
export {AppTagModal};
