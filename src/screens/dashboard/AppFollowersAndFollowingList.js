

import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppBackButton, AppButton, AppLoadingView, AppNoDataFound, AppSearchBar, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { setSettings } from '../../redux/reducers/settingsSlice';
import { store } from '../../redux/store';
import { ActionsOnUsers, GerUserListByType } from '../../services';
import { FRIEND_STATUSES_ACTIONS, GET_FRIEND_LIST_TYPES } from '../../utils/AppConstants';
import { AppLogger, largeNumberShortify } from '../../utils/AppHelperMethods';
const LIGHT_GREY = '#4d4d4d'
const AppFollowersAndFollowingList = ({ navigation, route, }) => {
    let isFollowerMode = route.params.isFollowerMode;
    let userID = route.params.userID;

    let { user } = useSelector(state => state.root);


    let [state, setState] = useState({
        loading: true,
        searchTerm: '',
        data: []
    })

    function getuserlisthelper(cursor, searttext) {
        GerUserListByType((response) => {
            if (response) {
                setState(prev => ({ ...prev, data: response, loading: false }));
            } else
                setState(prev => ({ ...prev, loading: false }));
        }, userID,
            isFollowerMode ? GET_FRIEND_LIST_TYPES.FOLLOWERS : GET_FRIEND_LIST_TYPES.FOLLOWING,
            cursor,
            searttext ? `&search=${searttext}` : '')
    }

    useEffect(() => {

        getuserlisthelper(false, '')


        const unsubscribeFocus = navigation.addListener('focus', e => {
            store.dispatch(setSettings({ bgColor: 'black' }));
        });
        const unsubscribeBlur = navigation.addListener('blur', e => {
            store.dispatch(setSettings({ bgColor: AppTheme.colors.darkGrey }));
        });

        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
        }

    }, []);

    function handleActionsOnUsers(isUserIsSame, item, index) {
        let tempData = state.data;
        if (isFollowerMode && isUserIsSame) { // remove follower
            ActionsOnUsers((res) => { }, item?._id, FRIEND_STATUSES_ACTIONS.REMOVE_FOLLOWER)

            setState(prev => ({
                ...prev,
                data: tempData.filter(itm => itm._id != item._id),
                loading: false
            }));
        } else { // follow unfollow user
            ActionsOnUsers((res) => { }, item?._id, item?.isFollowing ? FRIEND_STATUSES_ACTIONS.UNFOLLOW : FRIEND_STATUSES_ACTIONS.FOLLOW)
            tempData[index] = { ...item, isRequested: true, isFollowing: false }
            setState(prev => ({
                ...prev,
                data: tempData,
                loading: false
            }));
        }
    }

    const isSameUser = user?._id === userID;
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppBackButton navigation={navigation} />

            <View style={{ paddingHorizontal: RFValue(20) }}>
                <AppSearchBar hideFilter={true} onChangeText={(val) => {
                    getuserlisthelper(false, val)
                    setState(prev => ({ ...prev, searchTerm: val }))
                }} />
            </View>
            {state.loading ?
                <AppLoadingView />
                : null}

            {!state.loading && state.data.length < 1 ?
                <AppNoDataFound />
                : null}

            <FlatList
                data={state.data}
                initialNumToRender={2}
                windowSize={2}
                // removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                // bounces={false}
                keyExtractor={ii => (ii?._id || '') + 'you'}
                renderItem={({ item, index }) => {
                    let personalizedActionType = isFollowerMode && isSameUser ? "Remove" : item?.isFollowing ? "Unfollow" : item?.isRequested ? "Requested" : "Follow";
                    return (
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            if (item && item?._id) {
                                navigation.push("UserProfileScreen", { userID: item?._id })
                            }
                        }}>
                            <View style={{ padding: RFValue(20), flexDirection: 'row', borderBottomWidth: 0.5, borderColor: AppTheme.colors.lightGrey, alignItems: 'center' }}>
                                <UserAvatar corner={item?.corner || ''} color={item?.cornerColor} source={item?.pic ? { uri: item?.pic } : DEFAULT_USER_PIC} size={50} />
                                <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <AppText bold={true} size={1} color={'white'}>{item?.firstName || item?.userName} {item?.lastName}</AppText>
                                        <IsUserVerifiedCheck check={item?.isVerified} />
                                        <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item?.level)}</AppText>
                                    </View>
                                    <AppText size={1} color={item?.nickNameColor ? item?.nickNameColor : AppTheme.colors.lightGrey} >{item?.nickName || item?.userName}</AppText>
                                </View>
                                <View style={{ flex: 0.7 }}>
                                    {user?._id === item?.profileId ?
                                        null :
                                        <AppButton size={'small'} grey={!isFollowerMode} onPress={() => {
                                            if (!item?.isRequested) {
                                                if (item?.isFollowing || isFollowerMode) {
                                                    Alert.alert(
                                                        personalizedActionType,
                                                        "Are you sure to " + (personalizedActionType.toLowerCase()) + ((item?.firstName + '?') || (item?.userName + '?') || 'this user?'),
                                                        [{
                                                            text: "Cancel",
                                                            onPress: () => AppLogger('', "Cancel Pressed"),
                                                            style: "cancel"
                                                        }, {
                                                            text: "YES", onPress: () => {
                                                                handleActionsOnUsers(isSameUser, item, index)
                                                            }
                                                        }], { cancelable: false });
                                                } else {
                                                    handleActionsOnUsers(isSameUser, item, index)
                                                }
                                            }
                                        }} label={personalizedActionType.toUpperCase()} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }} />

        </View>
    );
};

const styles = StyleSheet.create({
    modalListItemStyle: { flexDirection: 'row', width: Dimensions.get('screen').width, alignItems: 'center', padding: RFValue(15) },
})
export { AppFollowersAndFollowingList };
