import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {DEFAULT_REQ} from '../../../assets/images';
import {AppBackButton, AppButton, AppLoadingView, AppNoDataFound, AppText} from '../../components';
import {UserAvatar} from '../../components/UserAvatar';
import {AppTheme} from '../../config';
import {setNotifications} from '../../redux/reducers/notificationsSlice';
import {ActionsOnUsers, GetNotificationHistory, GetPostByCommentID, ReadUpdateNotificationStatus} from '../../services';
import {FRIEND_STATUSES_ACTIONS, NOTIFICATION_TYPES} from '../../utils/AppConstants';
import {AppLogger, AppShowToast, RemoveDuplicateObjectsFromArray} from '../../utils/AppHelperMethods';
import {AntDesign} from '../../utils/AppIcons';

let tempRequests = [];
const NotificationScreen = ({navigation, route}) => {
  let {notifications} = useSelector((state) => state.root);

  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: true,
    limitRequests: 2,
    isFollowingArray: [],
  });
  function getnotificationhistoryhelper(cursor) {
    GetNotificationHistory((notificatioHistoryResponse) => {
      if (notificatioHistoryResponse) {
        tempRequests = notificatioHistoryResponse.filter((ii) => ii?.portion === 'upper');
        let tempArr = [];
        tempRequests.forEach((io) => {
          if (io?.createdBy?.isFollowing) tempArr.push(io.createdBy._id);
        });
        setState((prev) => ({...prev, isFollowingArray: tempArr}));
        let tempPlanNotifications = notificatioHistoryResponse.filter((ii) => ii?.portion === 'lower');

        dispatch(
          setNotifications({
            requests: RemoveDuplicateObjectsFromArray(tempRequests),
            otherNotifications: RemoveDuplicateObjectsFromArray(tempPlanNotifications),
          }),
        );
        setState((prev) => ({...prev, loading: false}));
      } else {
        setState((prev) => ({...prev, loading: false}));
      }
    }, cursor);
  }

  const IsFollowingHelper = (item) => {
    let tempData = state.isFollowingArray;
    let doesExists = tempData.findIndex((io) => io === item?.createdBy?._id);
    if (doesExists > -1) {
      tempData.splice(doesExists, 1);
      AppShowToast('Unfollowed!');
    } else {
      AppShowToast('Follow request sent!');
      tempData.push(item?.createdBy?._id);
    }
    setState((prev) => ({...prev, isFollowingArray: tempData}));
  };

  function acceptOrDenyRequest(userID, accept, index) {
    let tempData = notifications.requests.slice();
    tempData.splice(index, 1);
    dispatch(setNotifications({requests: tempData}));

    ActionsOnUsers(
      (dta) => {
        if (accept) getnotificationhistoryhelper(false);
      },
      userID,
      accept ? FRIEND_STATUSES_ACTIONS.ACCEPT_FOLLOW_REQUEST : FRIEND_STATUSES_ACTIONS.DENY_FOLLOW_REQUEST,
    );
    AppShowToast(accept ? 'Request accepted!' : 'Request denied!');
  }
  async function handlenotificationclick(item) {
    if (!item?.read) {
      let tempData = [...notifications?.otherNotifications?.slice()];
      let foundIndex = tempData?.findIndex((ii) => ii?._id === item?._id);
      if (foundIndex && foundIndex > -1) {
        tempData[foundIndex] = {...item, read: true};
        dispatch(
          setNotifications({
            otherNotifications: RemoveDuplicateObjectsFromArray(tempData),
          }),
        );
      }
      ReadUpdateNotificationStatus(item?._id);
    }

    if (item?.type === NOTIFICATION_TYPES.FOLLOW_REQUESTS) {
      if (item?.createdBy?._id)
        navigation.navigate('UserProfileScreen', {
          userID: item?.createdBy?._id,
        });
    } else if (item?.type === NOTIFICATION_TYPES.COMMENT) {
      if (item?.comment) {
        try {
          const post = await GetPostByCommentID(item?.comment);
          navigation.navigate('PostDetailScreenWithComments', {
            postID: post?._id,
          });
        } catch (err) {}
      }
    } else if (item?.type === NOTIFICATION_TYPES.POST) {
      if (item?.post) {
        navigation.navigate('PostDetailScreenWithComments', {
          postID: item?.post,
        });
      }
    } else if (item?.type === NOTIFICATION_TYPES.CHAT) {
      if (item?.createdBy) navigation.navigate('ChatWindow', {friend: item?.createdBy});
    }
  }
  useEffect(() => {
    getnotificationhistoryhelper(false);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <AppBackButton navigation={navigation} />

      <View style={{padding: RFValue(5), flex: 1}}>
        <View>
          {state.loading || notifications?.requests?.length < 1 ? null : (
            <View>
              <AppText size={1} bold={true} style={{paddingVertical: RFValue(10)}} color={AppTheme.colors.lightGrey}>
                FOLLOW REQUESTS
              </AppText>
              <FlatList
                data={notifications?.requests?.slice(0, state.limitRequests)}
                initialNumToRender={10}
                windowSize={3}
                contentContainerStyle={{justifyContent: 'center'}}
                // removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                // bounces={false}
                keyExtractor={(ii) => (ii?._id || '') + 'you'}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{paddingBottom: RFValue(15)}}
                      onPress={() => {
                        handlenotificationclick(item);
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          padding: RFValue(10),
                          borderBottomWidth: 0.5,
                          borderBottomColor: '#213A57',
                        }}>
                        <View>
                          <View>
                            <UserAvatar
                              corner={item?.createdBy?.corner || ''}
                              color={item?.createdBy?.cornerColor}
                              source={item?.createdBy?.pic ? {uri: item?.createdBy?.pic} : DEFAULT_REQ}
                              size={50}
                            />
                            <View
                              style={{
                                position: 'absolute',
                                bottom: RFValue(2),
                                right: RFValue(2),
                                backgroundColor: 'white',
                                borderRadius: 90,
                              }}>
                              {state.isFollowingArray.includes(item?.createdBy?._id) ? (
                                <AntDesign
                                  name={'minus'}
                                  onPress={() => {
                                    AppLogger('-----------', JSON.stringify(item.createdBy));
                                    IsFollowingHelper(item);
                                    ActionsOnUsers(() => {}, item?.createdBy?._id, FRIEND_STATUSES_ACTIONS.UNFOLLOW);
                                  }}
                                  style={{
                                    fontSize: RFValue(15),
                                    padding: RFValue(2),
                                    color: AppTheme.colors.primary,
                                  }}
                                />
                              ) : (
                                <AntDesign
                                  name={'pluscircle'}
                                  onPress={() => {
                                    AppLogger('-----------', JSON.stringify(item.createdBy));
                                    IsFollowingHelper(item);
                                    ActionsOnUsers(() => {}, item?.createdBy?._id, FRIEND_STATUSES_ACTIONS.FOLLOW);
                                  }}
                                  style={{
                                    fontSize: RFValue(15),
                                    padding: RFValue(2),
                                    color: AppTheme.colors.primary,
                                  }}
                                />
                              )}
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            paddingLeft: RFValue(10),
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <AppText size={2} bold="bold">
                              {item.body.split(' ')[0]}
                            </AppText>
                            <AppText size={2} style={{textAlign: 'left'}}>
                              {' wants to follow you.'}
                            </AppText>
                          </View>
                          <View
                            style={{
                              justifyContent: 'flex-end',
                              flexDirection: 'row',
                              paddingVertical: RFValue(5),
                            }}>
                            <View style={{flex: 0.3}} />
                            <View style={{flex: 0.5}}>
                              <AppButton
                                fill={true}
                                onPress={() => {
                                  if (!item?.read) ReadUpdateNotificationStatus(item?._id);
                                  acceptOrDenyRequest(item?.createdBy?._id, true, index);
                                }}
                                label={'ACCEPT'}
                                size="small"
                              />
                            </View>
                            <View style={{flex: 0.5, paddingLeft: RFValue(5)}}>
                              <AppButton
                                onPress={() => {
                                  if (!item?.read) ReadUpdateNotificationStatus(item?._id);
                                  acceptOrDenyRequest(item?.createdBy?._id, false, index);
                                }}
                                size="small"
                                label={'DENY'}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}

          {notifications?.requests?.length > 2 ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setState((prev) => ({
                  ...prev,
                  limitRequests: state.limitRequests > 2 ? 2 : 10,
                }));
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText
                  size={3}
                  color={AppTheme.colors.lightGrey}
                  style={{textAlign: 'center', paddingVertical: RFValue(10)}}>
                  {state.limitRequests > 2 ? 'Show Less' : 'Show more'}
                </AppText>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={{flex: 1}}>
          <AppText
            size={1}
            bold={true}
            color={AppTheme.colors.lightGrey}
            style={{paddingVertical: RFValue(10), paddingLeft: RFValue(8)}}>
            NOTIFICATIONS
          </AppText>

          {!state.loading && notifications?.otherNotifications?.length < 1 ? (
            <View style={{flex: 1, minHeight: RFValue(200)}}>
              <AppNoDataFound msg={'All caught up!'} />
            </View>
          ) : (
            <FlatList
              data={notifications?.otherNotifications}
              initialNumToRender={2}
              windowSize={2}
              // removeClippedSubviews={true}
              maxToRenderPerBatch={2}
              // bounces={false}
              keyExtractor={(ii) => (ii._id || '') + 'you'}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handlenotificationclick(item);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: RFValue(10),
                      borderBottomWidth: 0.5,
                      borderBottomColor: '#333333',
                    }}>
                    <UserAvatar
                      corner={item?.createdBy?.corner || ''}
                      color={item?.createdBy?.cornerColor}
                      source={item?.createdBy?.pic ? {uri: item?.createdBy?.pic} : DEFAULT_REQ}
                      size={40}
                    />
                    <View style={{flex: 1, paddingHorizontal: RFValue(10)}}>
                      {console.log(item)}
                      <AppText color={item.read ? AppTheme.colors.lightGrey : 'white'} size={2}>
                        {item.body}{' '}
                        <AppText color={AppTheme.colors.lightGrey} size={2}>
                          {moment(item.createdAt).fromNow(true)}
                        </AppText>
                      </AppText>
                    </View>
                    {/* {item?.post && item?.post?.attatchment ?
                                <FastImage source={{ uri: item.image }} style={{ height: RFValue(50), width: RFValue(60), borderRadius: 5 }} />
                                : null} */}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
      {state.loading ? <AppLoadingView /> : null}
    </View>
  );
};

export {NotificationScreen};
