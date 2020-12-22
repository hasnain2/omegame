

import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Alert, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppButton, AppLoadingView, AppNoDataFound, AppSearchBar, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { ActionsOnUsers, GerUserListByType } from '../../services';
import { FRIEND_STATUSES_ACTIONS, GET_FRIEND_LIST_TYPES } from '../../utils/AppConstants';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { Ionicons } from '../../utils/AppIcons';
const LIGHT_GREY = '#4d4d4d'
const AppFollowersAndFollowingList = ({ navigation, route, }) => {
    let isFollowerMode = route.params.isFollowerMode;
    let userID = route.params.userID;

    let user = useSelector(state => state.root.user);
    console.log('-----------USER-LOGGED IN---------', user?._id)
    console.log('-----------other user---------', userID)
    let [state, setState] = useState({
        loading: true,
        searchTerm: '',
        data: []
    })

    useEffect(() => {
        GerUserListByType((response) => {
            if (response) {
                console.log('---------------FOLLOW FOLLOWING LIST----------', JSON.stringify(response))
                setState(prev => ({ ...prev, data: response, loading: false }));
            } else
                setState(prev => ({ ...prev, loading: false }));
        }, userID, isFollowerMode ? GET_FRIEND_LIST_TYPES.FOLLOWERS : GET_FRIEND_LIST_TYPES.FOLLOWING)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(15) }} />
            <View style={{ paddingHorizontal: RFValue(20) }}>
                <AppSearchBar hideFilter={true} onChangeText={(val) => {
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
                removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                bounces={false}
                keyExtractor={ii => (ii?._id || '') + 'you'}
                renderItem={({ item, index }) => (
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        navigation.push("UserProfileScreen", { userID: item._id })
                    }}>
                        <View style={{ padding: RFValue(20), flexDirection: 'row', borderBottomWidth: 0.5, borderColor: AppTheme.colors.lightGrey, alignItems: 'center' }}>
                            <UserAvatar corner={item?.corner || ''}  source={item?.pic ? { uri: item?.pic } : DEFAULT_USER_PIC} size={50} />
                            <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <AppText bold={true} size={1} color={'white'}>{item?.firstName || item?.userName} {item?.lastName}</AppText>
                                    <IsUserVerifiedCheck check={item?.isVerified} />
                                    <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item?.earnedXps)}</AppText>
                                </View>
                                <AppText size={1} color={AppTheme.colors.lightGrey} >{item?.userName}</AppText>
                            </View>
                            <View style={{ flex: 0.7 }}>
                                {user?._id === item?.profileId ?
                                    null :
                                    <AppButton size={'small'} grey={!isFollowerMode} onPress={() => {
                                        console.log('-----', item)
                                        Alert.alert(
                                            isFollowerMode ? "Remove Follower" : "Unfollow",
                                            "Are you sure to " + (isFollowerMode ? "remove " : "unfollow ") + ((item?.firstName + '?') || (item?.userName + '?') || 'this user?'),
                                            [{
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            }, {
                                                text: "YES", onPress: () => {
                                                    if (isFollowerMode) {
                                                        // REMOVE FOLLOWER
                                                        let tempData = state.data;

                                                        setState(prev => ({
                                                            ...prev,
                                                            data: tempData.filter(itm => itm._id != item._id),
                                                            loading: false
                                                        }))
                                                    } else {
                                                        let tempData = state.data;

                                                        setState(prev => ({
                                                            ...prev,
                                                            data: tempData.filter(itm => itm._id != item._id),
                                                            loading: false
                                                        }));

                                                        ActionsOnUsers((FOLLOWRS) => {

                                                        }, item?._id, FRIEND_STATUSES_ACTIONS.FOLLOW)
                                                    }
                                                }
                                            }], { cancelable: false });

                                    }} label={isFollowerMode ? "REMOVE" : "FOLLOWING"} />}
                            </View>
                        </View>
                    </TouchableOpacity>
                )} />

        </View>
    );
};

const styles = StyleSheet.create({
    modalListItemStyle: { flexDirection: 'row', width: Dimensions.get('screen').width, alignItems: 'center', padding: RFValue(15) },
})
export { AppFollowersAndFollowingList };
