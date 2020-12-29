

import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppHeaderCommon, AppLoadingView, AppNoDataFound, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { ActionsOnUsers, GerUserListByType } from '../../services';
import { FRIEND_STATUSES_ACTIONS, GET_FRIEND_LIST_TYPES } from '../../utils/AppConstants';
const BlockedAccounts = ({ navigation, route, }) => {
    let { user } = useSelector(state => state.root)
    let [state, setState] = useState({
        loading: true,
        data: []
    })

    useEffect(() => {
        GerUserListByType((response) => {
            if (response)
                setState(prev => ({ ...prev, data: response, loading: false }))
            else
                setState(prev => ({ ...prev, loading: false }))
        }, user?._id, GET_FRIEND_LIST_TYPES.BLOCKED)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppHeaderCommon navigation={navigation} label={"BLOCKED ACCOUNTS"} />
            {state.loading ?
                <AppLoadingView />
                : null}
            {!state.loading && state.data.length < 1 ?
                <AppNoDataFound />
                :
                <FlatList
                    data={state.data}
                    initialNumToRender={2}
                    windowSize={2}
                    // removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    // bounces={false}
                    keyExtractor={ii => (ii?._id || '') + 'you'}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: AppTheme.colors.lightGrey, borderBottomWidth: 0.5, padding: RFValue(20) }}>
                            <UserAvatar corner={item?.corner || ''} color={item?.cornerColor} source={item?.pic ? { uri: item?.pic } : DEFAULT_USER_PIC} size={50} />
                            <View style={{ paddingLeft: RFValue(10), flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    <AppText bold={true} size={2} >{item?.firstName || item?.userName} </AppText>
                                    <IsUserVerifiedCheck check={item?.isVerified} />
                                    <AppText bold={true} color={AppTheme.colors.primary} size={1}> {item?.level}</AppText>
                                </View>
                                <AppText color={AppTheme.colors.lightGrey} size={1}>{item?.firstName}</AppText>
                            </View>

                            <TouchableOpacity activeOpacity={0.7} style={{ flex: 0.55 }} onPress={() => {
                                let tempData = state.data;
                                tempData.splice(index, 1)
                                setState(prev => ({ ...prev, data: tempData }))
                                ActionsOnUsers(() => {

                                }, item?._id, FRIEND_STATUSES_ACTIONS.UNBLOCKED)
                            }}>
                                <View style={{ borderRadius: 90, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: AppTheme.colors.lightGrey, padding: RFValue(10) }}>
                                    <AppText color={AppTheme.colors.lightGrey} size={1} bold={true}>UNBLOCK</AppText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )} />
            }
        </View>

    );
};

export { BlockedAccounts };
