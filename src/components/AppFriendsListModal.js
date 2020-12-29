import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector, useDispatch } from 'react-redux';
import { DEFAULT_USER_PIC } from '../../assets/images';
import { AppTheme } from '../config';
import { setFriends } from '../redux/reducers/friendsSlice';
import { store } from '../redux/store';
import { GerUserListByType } from '../services';
import { GET_FRIEND_LIST_TYPES } from '../utils/AppConstants';
import { largeNumberShortify } from '../utils/AppHelperMethods';
import { AntDesign } from '../utils/AppIcons';
import { AppBackButton } from './AppBackButton';
import { AppModal } from './AppModal';
import { AppNoDataFound } from './AppNoDataFound';
import { AppSearchBar } from './AppSearchBar';
import { AppText } from './AppText';
import { IsUserVerifiedCheck } from './IsUserVerifiedCheck';
import { UserAvatar } from './UserAvatar';

const AppFriendsListModal = ({ show, toggle, selectedContacts, chosenContacts = [], showDone }) => {
    let [state, setState] = useState({
        loading: false,
        searchTerm: '',
        data: [],
        showModal: show
    })
    let friends = useSelector(state => state.root.friends)
    let disp = useDispatch();
    function getfriendshelper(cursor, searchQuery) {
        GerUserListByType((response) => {
            if (response) {
                disp(setFriends(response))
                setState(prev => ({ ...prev, loading: false }));
            } else
                setState(prev => ({ ...prev, loading: false }));
        }, store.getState().root.user?._id, GET_FRIEND_LIST_TYPES.FRIEND, cursor, searchQuery)
    }

    useEffect(() => {
        getfriendshelper(false, '')
    }, [])
    return (
        <AppModal show={show} toggle={toggle}>
            <View style={{ flex: 1, width: '100%', paddingTop: RFValue(40), backgroundColor: 'black', paddingVertical: RFValue(20) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AppBackButton onPress={() => toggle()} />

                    {showDone ?
                        <AppText onPress={() => {
                            toggle();
                        }} size={3} color={AppTheme.colors.primary} style={{ padding: RFValue(20) }} >Done</AppText>
                        : null}
                </View>

                <View style={{ paddingHorizontal: RFValue(20) }}>
                    <AppSearchBar hideFilter={true} onChangeText={(val) => {
                        getfriendshelper(false, val ? ('&search=' + val) : '')
                        setState(prev => ({ ...prev, searchTerm: val }))
                    }} />
                </View>
                <View style={{ flex: 1 }}>
                    {!state.loading && friends.length < 1 ?
                        <AppNoDataFound msg={"You don't have friends"} />
                        :
                        <FlatList
                            data={friends}
                            initialNumToRender={2}
                            windowSize={2}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={2}
                            bounces={false}
                            keyExtractor={ii => (ii?._id || '') + 'you'}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity activeOpacity={0.7} onPress={() => selectedContacts(item)}>
                                    <View style={{ padding: RFValue(20), flexDirection: 'row', borderBottomWidth: 0.5, borderColor: AppTheme.colors.lightGrey, alignItems: 'center' }}>
                                        <UserAvatar corner={item?.corner || ''} color={item?.cornerColor} source={item?.pic ? { uri: item?.pic } : DEFAULT_USER_PIC} size={50} />
                                        <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <AppText bold={true} size={1} color={'white'}>{item?.firstName || item?.userName}</AppText>
                                                <IsUserVerifiedCheck check={item?.isVerified} />
                                                <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item?.earnedXps || 0)}</AppText>
                                            </View>
                                            <AppText size={1} color={item?.nickNameColor ? item?.nickNameColor : AppTheme.colors.lightGrey} >{item?.nickName || item?.userName}</AppText>
                                        </View>
                                        {chosenContacts.find(ii => ii?._id === item?._id) ?
                                            <AntDesign name={"check"} style={{ fontSize: RFValue(20), color: AppTheme.colors.green }} />
                                            : null}
                                    </View>
                                </TouchableOpacity>
                            )} />
                    }
                </View>
            </View>
        </AppModal>
    )
}

export { AppFriendsListModal };
