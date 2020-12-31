

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppBackButton, AppButton, AppText } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCK_FOLLOW_REQUESTS } from '../../mockups/Mockups';
import { ActionsOnUsers, GetNotificationHistory } from '../../services';
import { FRIEND_STATUSES_ACTIONS } from '../../utils/AppConstants';
import { AppShowToast } from '../../utils/AppHelperMethods';
import { AntDesign } from '../../utils/AppIcons';
const NotificationScreen = ({ navigation, route, }) => {
    let { user } = useSelector(state => state.root)
    let [state, setState] = useState({
        loading: false,
        data: [],
        limitRequests: 2,
        notificationData: []
    });
    function getnotificationhistoryhelper(cursor) {
        GetNotificationHistory((notificatioHistoryResponse) => {
            debugger
            if (notificatioHistoryResponse) {
                let tempReq = notificatioHistoryResponse.filter(ii => ii?.body?.toLowerCase()?.includes('a follow request'));
                let tempNot = notificatioHistoryResponse.filter(ii => !ii?.body?.toLowerCase()?.includes('a follow request'));
                setState(prev => ({
                    ...prev, loading: false,
                    data: tempReq,
                    notificationData: tempNot
                }));
            } else {
                setState(prev => ({ ...prev, loading: false }))
            }
        }, cursor)
    }

    function acceptOrDenyRequest(userID, accept, index) {
        let tempData = state.data;
        tempData.splice(index, 1)
        setState(prev => ({ ...prev, data: tempData }))
        AppShowToast(accept ? "Request accepted!" : "Request denied!");
        ActionsOnUsers(() => {

        }, userID, accept ? FRIEND_STATUSES_ACTIONS.ACCEPT_FOLLOW_REQUEST : FRIEND_STATUSES_ACTIONS.DENY_FOLLOW_REQUEST)
    }

    useEffect(() => {
        getnotificationhistoryhelper(false);
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppBackButton navigation={navigation} />

            <View style={{ padding: RFValue(10) }}>
                <AppText size={1} bold={true} color={AppTheme.colors.lightGrey}>FOLLOW REQUESTS</AppText>

                <FlatList
                    data={state.data}
                    initialNumToRender={10}
                    windowSize={3}
                    // removeClippedSubviews={true}
                    maxToRenderPerBatch={10}
                    // bounces={false}
                    keyExtractor={ii => (ii?._id || '') + 'you'}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => {

                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: RFValue(10), borderBottomWidth: 0.5, borderBottomColor: 'grey' }}>
                                    <View >
                                        <UserAvatar corner={item?.createdBy?.corner || ''} color={item?.createdBy?.cornerColor} source={item?.createdBy?.pic ? { uri: item?.createdBy?.pic } : DEFAULT_USER_PIC} size={50} />
                                        <View style={{ position: 'absolute', bottom: RFValue(14), right: RFValue(2), backgroundColor: 'white', borderRadius: 90, }}>
                                            <AntDesign name={"pluscircle"} style={{ fontSize: RFValue(15), color: AppTheme.colors.primary }} />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, paddingLeft: RFValue(10) }}>
                                        <AppText size={2} >{item.body}</AppText>
                                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingVertical: RFValue(5) }}>
                                            <View style={{ flex: 0.3 }} />
                                            <View style={{ flex: 0.5, }}>
                                                <AppButton fill={true} onPress={() => { acceptOrDenyRequest(item?.createdBy?._id, true, index) }} label={"ACCEPT"} />
                                            </View>
                                            <View style={{ flex: 0.5, paddingLeft: RFValue(5) }}>
                                                <AppButton onPress={() => { acceptOrDenyRequest(item?.createdBy?._id, false, index) }} label={"DENY"} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />

                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    let tempData = MOCK_FOLLOW_REQUESTS;
                    if (state.limitRequests > 2) {
                        setState(prev => ({ ...prev, data: tempData.slice(0, 3), limitRequests: state.limitRequests > 2 ? 2 : 10 }))
                    } else {
                        setState(prev => ({ ...prev, data: tempData.slice(0, 10), limitRequests: state.limitRequests > 2 ? 2 : 10 }))
                    }

                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <AppText size={3} color={AppTheme.colors.lightGrey} style={{ textAlign: 'center', paddingVertical: RFValue(10) }}>{state.limitRequests > 2 ? "Show Less" : "Show more"}</AppText>
                    </View>
                </TouchableOpacity>

                <AppText size={1} bold={true} color={AppTheme.colors.lightGrey}>NOTIFICATIONS</AppText>

                <FlatList
                    data={state.notificationData}
                    initialNumToRender={2}
                    windowSize={2}
                    // removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    // bounces={false}
                    keyExtractor={ii => (ii._id || '') + 'you'}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => {

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
                    )} />

            </View>
        </View>
    );
};

export { NotificationScreen };
