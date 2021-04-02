import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {ICON_NEW_MESSAGE} from '../../../assets/icons';
import {DEFAULT_REQ} from '../../../assets/images';
import {
  AppBackButton,
  AppBadge,
  AppFriendsListModal,
  AppLoadingView,
  AppNoDataFound,
  AppRadioButton,
  AppSearchBar,
  AppText,
  IsUserVerifiedCheck,
} from '../../components';
import {UserAvatar} from '../../components/UserAvatar';
import {AppTheme} from '../../config';
import {setInbox} from '../../redux/reducers/inboxSlice';
import {setSettings} from '../../redux/reducers/settingsSlice';
import {store} from '../../redux/store';
import {GetInboxList} from '../../services';
import {AppLogger, largeNumberShortify} from '../../utils/AppHelperMethods';
import {AntDesign} from '../../utils/AppIcons';

let originalInboxList = [];
const InboxScreen = ({navigation, route}) => {
  const {user, inbox} = useSelector((state) => state.root);

  let dipatch = useDispatch();
  let [state, setState] = useState({
    loading: true,
    refreshing: false,
    deletionEnabled: '',
    showFriendsListModal: false,
  });

  const searchText = (e) => {
    let text = e?.toLowerCase() || '';
    let inboxx = originalInboxList;
    let filteredName = inboxx.filter((item) => {
      return (
        item?.message?.from?.firstName?.toLowerCase().match(text) ||
        item?.message?.from?.userName?.toLowerCase().match(text) ||
        item?.message?.to?.firstName?.toLowerCase().match(text) ||
        item?.message?.to?.userName?.toLowerCase().match(text)
      );
    });
    if (!text || text === '') {
      dipatch(setInbox(originalInboxList));
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      dipatch(setInbox([]));
    } else if (Array.isArray(filteredName)) {
      dipatch(setInbox(filteredName));
    }
  };

  getinboxlisthelper = (cursor) => {
    GetInboxList((inboxListRes) => {
      if (inboxListRes) {
        dipatch(setInbox(inboxListRes));
        originalInboxList = inboxListRes;
        let totalUnreadMessages = 0;
        if (inboxListRes.length) {
          inboxListRes.forEach((item) => {
            totalUnreadMessages += item?.count || 0;
          });
        }
        dipatch(setSettings({chatCount: totalUnreadMessages}));
      }
      setState((prev) => ({...prev, refreshing: false, loading: false}));
    }, cursor);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getinboxlisthelper(0);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingLeft: RFValue(16),
        paddingRight: RFValue(16),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AppBackButton navigation={navigation} />
        {!state.deletionEnabled ? (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{flex: 1}}
              onPress={() => {
                setState((prev) => ({...prev, showFriendsListModal: true}));
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={ICON_NEW_MESSAGE}
                  style={{
                    height: RFValue(30),
                    width: RFValue(25),
                    tintColor: '#02aaff',
                  }}
                />
                <AppText size={2} color={'#02aaff'}>
                  {' '}
                  New Message
                </AppText>
              </View>
            </TouchableOpacity>
            <View style={{flex: 0.3}} />
          </>
        ) : (
          <View
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              paddingHorizontal: RFValue(10),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                Alert.alert(
                  'Delete all',
                  'Are you sure to delete all of your conversations?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => AppLogger('', 'Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'DELETE',
                      onPress: () => {
                        setState((prev) => ({...prev, deletionEnabled: ''}));
                        store.dispatch(setInbox([]));
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  flex: 1,
                  paddingHorizontal: RFValue(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AntDesign
                  name={'close'}
                  style={{fontSize: RFValue(25), color: AppTheme.colors.red}}
                />
                <AppText size={3} color={AppTheme.colors.red}>
                  {' '}
                  DELETE ALL
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{padding: RFValue(15), paddingTop: RFValue(5)}}>
        <AppSearchBar
          onChangeText={(val) => {
            searchText(val);
          }}
          hideFilter={true}
        />
      </View>

      {/* <AppText
        size={2}
        color={AppTheme.colors.lightGrey}
        bold={true}
        style={{padding: RFValue(15)}}>
        MESSAGES:
      </AppText> */}

      {state.loading && inbox.length < 1 ? <AppLoadingView /> : null}
      {!state.loading && inbox.length < 1 ? <AppNoDataFound /> : null}

      <FlatList
        data={inbox}
        initialNumToRender={2}
        windowSize={2}
        removeClippedSubviews={true}
        maxToRenderPerBatch={2}
        bounces={false}
        keyExtractor={(ii) => (ii?._id || '') + 'you'}
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            tintColor={'white'}
            onRefresh={() => {
              setState((prev) => ({...prev, refreshing: true}));
              getinboxlisthelper(0);
            }}
          />
        }
        renderItem={({item, index}) => {
          let newUser =
            user?._id === item?.message?.from?._id
              ? item?.message?.to
              : item?.message?.from;
          let inboxItem = {
            _id: item?.message?._id,
            createdAt: item?.message?.createdAt,
            seen: item?.message?.seen,
            delivered: item?.message?.delivered,
            chatId: item?.message?.chatId,
            message: item?.message?.text,
            user: {
              ...newUser,
              chatId: item?.message?.chatId,
            },
          };
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('ChatWindow', {friend: inboxItem?.user});
              }}
              onLongPress={() => {
                setState((prev) => ({...prev, deletionEnabled: index + ''}));
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: RFValue(5),
                }}>
                <View style={{flex: 1}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <UserAvatar
                      corner={inboxItem?.user?.corner || ''}
                      color={inboxItem?.user?.cornerColor}
                      source={
                        inboxItem?.user?.pic
                          ? {uri: inboxItem?.user?.pic}
                          : DEFAULT_REQ
                      }
                      size={50}
                    />
                    <View style={{flex: 1, paddingLeft: RFValue(10)}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AppText
                          bold={true}
                          size={1}
                          color={AppTheme.colors.lightGrey}>
                          {inboxItem?.user?.firstName ||
                            inboxItem?.user?.userName}
                        </AppText>
                        <IsUserVerifiedCheck
                          check={inboxItem?.user?.isVerified}
                        />
                        <AppText
                          size={1}
                          bold={true}
                          color={AppTheme.colors.primary}
                          style={{paddingLeft: RFValue(5)}}>
                          {largeNumberShortify(inboxItem?.user?.level)}
                        </AppText>
                        <AppText size={1} color={AppTheme.colors.lightGrey}>
                          {' '}
                          - {moment(inboxItem.createdAt).fromNow(true)}
                        </AppText>
                      </View>
                      <AppText
                        size={1}
                        color={
                          inboxItem?.user?.nickNameColor
                            ? inboxItem?.user?.nickNameColor
                            : AppTheme.colors.lightGrey
                        }>
                        {inboxItem?.user?.nickName || inboxItem?.user?.userName}
                      </AppText>
                    </View>
                    {state.deletionEnabled ? (
                      <AppRadioButton
                        color={AppTheme.colors.red}
                        val={state.deletionEnabled === index + ''}
                        onPress={() => {
                          setState((prev) => ({
                            ...prev,
                            deletionEnabled: index + '',
                          }));
                        }}
                        size={20}
                      />
                    ) : null}
                  </View>
                  <AppText
                    lines={2}
                    size={2}
                    style={{
                      paddingVertical: RFValue(5),
                      paddingLeft: RFValue(3),
                    }}>
                    {inboxItem?.message}
                  </AppText>
                </View>
                <View style={{}}>
                  {item?.count ? (
                    <AppBadge count={largeNumberShortify(item?.count)} />
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <AppFriendsListModal
        show={state.showFriendsListModal}
        toggle={() =>
          setState((prev) => ({...prev, showFriendsListModal: false}))
        }
        selectedContacts={(contact) => {
          setState((prev) => ({...prev, showFriendsListModal: false}));
          navigation.navigate('ChatWindow', {friend: contact});
        }}
      />
    </View>
  );
};

export {InboxScreen};
