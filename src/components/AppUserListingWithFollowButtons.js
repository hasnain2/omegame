
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { DEFAULT_USER_PIC } from '../../assets/images';
import { AppTheme } from '../config';
import { ActionsOnUsers } from '../services';
import { FRIEND_STATUSES_ACTIONS } from '../utils/AppConstants';
import { AppLogger, largeNumberShortify } from '../utils/AppHelperMethods';
import { AppGradientContainer } from './AppGradientContainer';
import { AppLoadingView } from './AppLoadingView';
import { AppNoDataFound } from './AppNoDataFound';
import { AppText } from './AppText';
import { IsUserVerifiedCheck } from './IsUserVerifiedCheck';
import { UserAvatar } from './UserAvatar';

const AppUserListingWithFollowButtons = ({ navigation, data, style, loading, refreshing, loadMore }) => {
    let { user } = useSelector(state => state.root);
    let [state, setState] = useState({
        usersData: data
    })

    function followUnfollowUser(item, index) {
        let tempUserObj = { ...item };
        ActionsOnUsers((actionsRes) => {

        }, item?._id, tempUserObj?.isFollowing ? FRIEND_STATUSES_ACTIONS.UNFOLLOW : FRIEND_STATUSES_ACTIONS.FOLLOW);
        tempUserObj.isFollowing = !tempUserObj?.isFollowing;
        let tempData = state.usersData;
        tempData[index] = tempUserObj;
        setState(prev => ({ ...prev, usersData: tempData }));
    }
    useEffect(() => {
        setState(prev => ({ ...prev, usersData: data }))
    }, [data])
    return (
        <View style={[{ flex: 1, backgroundColor: AppTheme.colors.background }, style ? style : null]}>
            {!loading && state.usersData.length < 1 ?
                <AppNoDataFound />
                : null}
            {loading ?
                <AppLoadingView />
                : null}
            <FlatList
                data={state.usersData}
                extraData={state.usersData}
                initialNumToRender={2}
                windowSize={2}
                // removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            if (loadMore)
                                loadMore(false, true)
                        }}
                    />
                }

                onEndReached={() => {
                    if (loadMore) {
                        loadMore(state.usersData[state.usersData.length - 1]?._id, false)
                    }
                }}
                onEndReachedThreshold={0.5}
                keyExtractor={ii => (ii?._id || '') + 'you'}
                renderItem={({ item, index }) => {
                    AppLogger('-------ITEM-----', JSON.stringify(item.isFollowing))
                    return (
                        <View style={{ flexDirection: 'row', borderBottomColor: AppTheme.colors.darkGrey, borderBottomWidth: 1, flex: 1, padding: RFValue(7), alignItems: 'center' }}>
                            <UserAvatar
                                color={item?.cornerColor || item?.cornerColor || false}
                                onPress={() => {
                                    navigation.navigate('UserProfileScreen', { userID: item?._id })
                                }}
                                corner={item?.corner || ''} size={50} source={item?.pic ? { uri: item?.pic } : DEFAULT_USER_PIC} />
                            <TouchableOpacity activeOpacity={7} style={{ flex: 1 }} onPress={() => {
                                navigation.navigate('UserProfileScreen', { userID: item?._id })
                            }}>
                                <View style={{ flex: 1, justifyContent: 'center', paddingLeft: RFValue(10) }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <AppText bold={true} size={1} color={'white'}>{item?.firstName || item?.userName}</AppText>
                                        <IsUserVerifiedCheck check={item?.isVerified} />
                                        <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item?.earnedXps)}</AppText>
                                    </View>
                                    <AppText size={1} color={item?.nickNameColor ? item?.nickNameColor : AppTheme.colors.lightGrey} >{item?.nickName || item?.userName}</AppText>
                                </View>
                            </TouchableOpacity>

                            {user?._id != item?._id ?
                                <View style={{ flex: 0.7 }}>
                                    {item?.isFollowing ?
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                            followUnfollowUser(item, index)
                                        }}>
                                            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', padding: RFValue(10), borderRadius: 90, borderWidth: 1, borderColor: AppTheme.colors.lightGrey }}>
                                                <AppText size={1} bold={true} color={AppTheme.colors.lightGrey} >FOLLOWING</AppText>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <AppGradientContainer onPress={() => {
                                            followUnfollowUser(item, index)
                                        }} style={{ justifyContent: 'center', width: '100%', alignItems: 'center', padding: RFValue(10), borderRadius: 90 }}>
                                            <AppText size={1} bold={true} color={"white"} >FOLLOW</AppText>
                                        </AppGradientContainer>
                                    }
                                </View>
                                : null}
                        </View>
                    )
                }}
            />
        </View>
    );
};

export { AppUserListingWithFollowButtons };
