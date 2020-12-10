

import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppButton, AppLoadingView, AppSearchBar, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCKUP_POSTS } from '../../mockups/Mockups';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { Ionicons } from '../../utils/AppIcons';
import { GerUserListByType } from '../../services'
import { GET_FRIEND_LIST_TYPES } from '../../utils/AppConstants';
import { DEFAULT_USER_PIC } from '../../../assets/images';
const LIGHT_GREY = '#4d4d4d'
const AppFollowersAndFollowingList = ({ navigation, route, }) => {
    let isFollowerMode = route.params.isFollowerMode;
    let userID = route.params.userID;

    let user = useSelector(state => state.root.user);
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
            {state.loading ?
                <AppLoadingView />
                : null}
            <View style={{ paddingHorizontal: RFValue(20) }}>
                <AppSearchBar hideFilter={true} onChangeText={(val) => {
                    setState(prev => ({ ...prev, searchTerm: val }))
                }} />
            </View>

            <FlatList
                data={state.data}
                initialNumToRender={2}
                windowSize={2}
                removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                bounces={false}
                keyExtractor={ii => ii.id + 'you'}
                renderItem={({ item, index }) => (
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {

                    }}>
                        <View style={{ padding: RFValue(20), flexDirection: 'row', borderBottomWidth: 0.5, borderColor: AppTheme.colors.lightGrey, alignItems: 'center' }}>
                            <UserAvatar source={item?.profile?.pic ? { uri: item?.profile?.pic } : DEFAULT_USER_PIC} size={50} />
                            <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <AppText bold={true} size={1} color={'white'}>{item?.profile?.firstName || item?.userName} {item?.profile?.lastName}</AppText>
                                    <IsUserVerifiedCheck check={item?.profile?.isVerified} />
                                    <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item?.profile?.earnedXps)}</AppText>
                                </View>
                                <AppText size={1} color={AppTheme.colors.lightGrey} >{item?.userName}</AppText>
                            </View>
                            <View style={{ flex: 0.7 }}>
                                <AppButton size={'small'} grey={!isFollowerMode} onPress={() => { }} label={isFollowerMode ? "REMOVE" : "FOLLOWING"} />
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
