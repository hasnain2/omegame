

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppBackButton, AppButton, AppNoDataFound, AppText } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { setNotifications } from '../../redux/reducers/notificationsSlice';
import { ActionsOnUsers, GetNotificationHistory, ReadUpdateNotificationStatus } from '../../services';
import { FRIEND_STATUSES_ACTIONS, NOTIFICATION_TYPES } from '../../utils/AppConstants';
import { AppShowToast, RemoveDuplicateObjectsFromArray } from '../../utils/AppHelperMethods';
import { AntDesign } from '../../utils/AppIcons';

const NotificationScreen = ({ navigation, route, }) => {
    let { user, notifications } = useSelector(state => state.root);
    let dispatch = useDispatch();
    let [state, setState] = useState({
        loading: true,
        limitRequests: 2,
    });
    function getnotificationhistoryhelper(cursor) {
        GetNotificationHistory((notificatioHistoryResponse) => {
            if (notificatioHistoryResponse) {
                let tempRequests = notificatioHistoryResponse.filter(ii => (ii?.portion === "upper"));
                let tempPlanNotifications = notificatioHistoryResponse.filter(ii => (ii?.portion === "lower"));

                dispatch(setNotifications({
                    requests: RemoveDuplicateObjectsFromArray(tempRequests),
                    otherNotifications: RemoveDuplicateObjectsFromArray(tempPlanNotifications)
                }))
                setState(prev => ({ ...prev, loading: false }));
            } else {
                setState(prev => ({ ...prev, loading: false }))
            }
        }, cursor)
    }

    function acceptOrDenyRequest(userID, accept, index) {
        let tempData = notifications.requests.slice();
        tempData.splice(index, 1)
        dispatch(setNotifications({ requests: tempData }))
        if (!accept) {
            ActionsOnUsers((dta) => { }, userID, accept ? FRIEND_STATUSES_ACTIONS.ACCEPT_FOLLOW_REQUEST : FRIEND_STATUSES_ACTIONS.DENY_FOLLOW_REQUEST)
        } else {
            ActionsOnUsers((dta) => {
                getnotificationhistoryhelper(false);
            }, userID, accept ? FRIEND_STATUSES_ACTIONS.ACCEPT_FOLLOW_REQUEST : FRIEND_STATUSES_ACTIONS.DENY_FOLLOW_REQUEST);
        }
        AppShowToast(accept ? "Request accepted!" : "Request denied!");
    }
    function handlenotificationclick(item) {
        if (!item?.read)
            ReadUpdateNotificationStatus(item?._id)
        if (item?.type === NOTIFICATION_TYPES.FOLLOW_REQUESTS) {
            navigation.navigate("UserProfileScreen", { userID: item?.createdBy?._id })
        } else if (item?.type === NOTIFICATION_TYPES.COMMENT) {
            navigation.navigate("UserProfileScreen", { userID: item?.createdBy?._id })
        } else if (item?.type === NOTIFICATION_TYPES.POST) {
            navigation.navigate("UserProfileScreen", { userID: item?.createdBy?._id })
        } else if (item?.type === NOTIFICATION_TYPES.CHAT) {
            navigation.navigate("UserProfileScreen", { userID: item?.createdBy?._id })
        }
    }
    useEffect(() => {
        getnotificationhistoryhelper(false);
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppBackButton navigation={navigation} />

            <View style={{ padding: RFValue(10) }}>
                <AppText size={1} bold={true} style={{ paddingVertical: RFValue(10) }} color={AppTheme.colors.lightGrey}>FOLLOW REQUESTS</AppText>

                <View style={{ minHeight: state.limitRequests < 4 ? RFValue(150) : RFValue(250), maxHeight: RFValue(Dimensions.get('screen')?.height / 2) }}>
                    {!state.loading && notifications?.requests?.length < 1 ?
                        <AppNoDataFound msg={"No follow requests found!"} />
                        : <FlatList
                            data={notifications?.requests}
                            initialNumToRender={10}
                            windowSize={3}
                            contentContainerStyle={{ justifyContent: 'center' }}
                            // removeClippedSubviews={true}
                            maxToRenderPerBatch={10}
                            // bounces={false}
                            keyExtractor={ii => (ii?._id || '') + 'you'}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity activeOpacity={0.8} style={{ paddingBottom: RFValue(15) }} onPress={() => {
                                        handlenotificationclick(item)
                                    }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: RFValue(10), borderBottomWidth: 0.5, borderBottomColor: 'grey' }}>
                                            <View  >
                                                <View  >
                                                    <UserAvatar corner={item?.createdBy?.corner || ''} color={item?.createdBy?.cornerColor} source={item?.createdBy?.pic ? { uri: item?.createdBy?.pic } : DEFAULT_USER_PIC} size={50} />
                                                    <View style={{ position: 'absolute', bottom: RFValue(2), right: RFValue(2), backgroundColor: 'white', borderRadius: 90, }}>
                                                        <AntDesign name={"pluscircle"} style={{ fontSize: RFValue(15), color: AppTheme.colors.primary }} />
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: RFValue(10) }}>
                                                <AppText size={2} >{item.body}</AppText>
                                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingVertical: RFValue(5) }}>
                                                    <View style={{ flex: 0.3 }} />
                                                    <View style={{ flex: 0.5, }}>
                                                        <AppButton fill={true} onPress={() => {
                                                            if (!item?.read)
                                                                ReadUpdateNotificationStatus(item?._id)
                                                            acceptOrDenyRequest(item?.createdBy?._id, true, index)
                                                        }} label={"ACCEPT"} />
                                                    </View>
                                                    <View style={{ flex: 0.5, paddingLeft: RFValue(5) }}>
                                                        <AppButton onPress={() => {
                                                            if (!item?.read)
                                                                ReadUpdateNotificationStatus(item?._id)
                                                            acceptOrDenyRequest(item?.createdBy?._id, false, index)
                                                        }} label={"DENY"} />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }} />}
                </View>
                {notifications?.requests?.length > 3 ?
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, limitRequests: state.limitRequests > 2 ? 2 : 10 }));
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <AppText size={3} color={AppTheme.colors.lightGrey} style={{ textAlign: 'center', paddingVertical: RFValue(10) }}>{state.limitRequests > 2 ? "Show Less" : "Show more"}</AppText>
                        </View>
                    </TouchableOpacity> : null}

                <AppText size={1} bold={true} color={AppTheme.colors.lightGrey} style={{ paddingVertical: RFValue(10) }}>NOTIFICATIONS</AppText>

                {!state.loading && notifications?.otherNotifications?.length < 1 ?
                    <View style={{ flex: 1, minHeight: RFValue(200) }}>
                        <AppNoDataFound msg={"All caught up!"} />
                    </View> :

                    <FlatList
                        data={notifications?.otherNotifications}
                        initialNumToRender={2}
                        windowSize={2}
                        // removeClippedSubviews={true}
                        maxToRenderPerBatch={2}
                        // bounces={false}
                        keyExtractor={ii => (ii._id || '') + 'you'}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                handlenotificationclick(item)
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(10), borderBottomWidth: 0.5, borderBottomColor: 'grey' }}>
                                    <UserAvatar corner={item?.createdBy?.corner || ''} color={item?.createdBy?.cornerColor} source={item?.createdBy?.pic ? { uri: item?.createdBy?.pic } : DEFAULT_USER_PIC} size={40} />
                                    <View style={{ flex: 1, paddingHorizontal: RFValue(10) }}>
                                        <AppText color={item.read ? AppTheme.colors.lightGrey : 'white'} size={2}>{item.body}  <AppText color={AppTheme.colors.lightGrey} size={2}>{moment(item.createdAt).fromNow(true)}</AppText></AppText>
                                    </View>
                                    {/* {item?.post && item?.post?.attatchment ?
                                <FastImage source={{ uri: item.image }} style={{ height: RFValue(50), width: RFValue(60), borderRadius: 5 }} />
                                : null} */}
                                </View>
                            </TouchableOpacity>
                        )} />}
            </View>
        </View >
    );
};

export { NotificationScreen };
