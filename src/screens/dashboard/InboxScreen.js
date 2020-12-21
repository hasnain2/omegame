

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { ICON_NEW_MESSAGE } from '../../../assets/icons';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppBackButton, AppFriendsListModal, AppNoDataFound, AppRadioButton, AppSearchBar, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { setInbox } from '../../redux/reducers/inboxSlice';
import { store } from '../../redux/store';
import { GetInboxList } from '../../services';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { AntDesign } from '../../utils/AppIcons';
const InboxScreen = ({ navigation, route, }) => {
    let user = useSelector(state => state.root.user)
    let inbox = useSelector(state => state.root.inbox)
    let dipatch = useDispatch()
    let [state, setState] = useState({
        loading: false,
        deletionEnabled: '',
        showFriendsListModal: false
    })
    getinboxlisthelper = (cursor) => {
        GetInboxList((inboxListRes) => {
            if (inboxListRes) {
                dipatch(setInbox(inboxListRes))
            }
        }, cursor)
    }
    useEffect(() => {
        getinboxlisthelper(0)
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppBackButton navigation={navigation} />
                {!state.deletionEnabled ?
                    <>
                        <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={() => {
                            setState(prev => ({ ...prev, showFriendsListModal: true }))
                        }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={ICON_NEW_MESSAGE} style={{ height: RFValue(30), width: RFValue(25), tintColor: '#02aaff' }} />
                                <AppText size={2} color={'#02aaff'}>  New Message</AppText>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 0.3 }}>

                        </View>
                    </>
                    :
                    <View style={{ justifyContent: 'flex-end', flex: 1, paddingHorizontal: RFValue(10), flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            Alert.alert(
                                "Delete all",
                                "Are you sure to delete all of your conversations?",
                                [{
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                }, {
                                    text: "DELETE", onPress: () => {
                                        setState(prev => ({ ...prev, deletionEnabled: '' }))
                                        store.dispatch(setInbox([]))
                                    }
                                }], { cancelable: false });
                        }}>
                            <View style={{ justifyContent: 'flex-end', flex: 1, paddingHorizontal: RFValue(10), flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name={"close"} style={{ fontSize: RFValue(25), color: AppTheme.colors.red }} />
                                <AppText size={3} color={AppTheme.colors.red}> DELETE ALL</AppText>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <View style={{ padding: RFValue(15) }}>
                <AppSearchBar onChangeText={() => { }} hideFilter={true} />
            </View>

            <AppText size={2} color={AppTheme.colors.lightGrey} bold={true} style={{ padding: RFValue(15) }} >MESSAGES:</AppText>
            {!state.loading && inbox.length < 1 ?
                <AppNoDataFound />
                :
                <FlatList
                    data={inbox}
                    initialNumToRender={2}
                    windowSize={2}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    bounces={false}
                    keyExtractor={ii => (ii._id || '') + 'you'}
                    renderItem={({ item, index }) => {
                        let newUser = user?._id === item?.message?.from?._id ? item?.message?.to : item?.message?.from;
                        let inboxItem = {
                            _id: item?.message?._id,
                            createdAt: item?.message?.createdAt,
                            seen: item?.message?.seen,
                            delivered: item?.message?.delivered,
                            chatId: item?.message?.chatId,
                            message: item?.message?.message,
                            user: {
                                ...newUser,
                                chatId: item?.message?.chatId
                            }
                        }
                        return (
                            <TouchableOpacity activeOpacity={0.7}
                                onPress={() => {
                                    navigation.navigate('ChatWindow', { friend: inboxItem?.user })

                                    console.log('-------USER--------', inboxItem?.user)

                                }} onLongPress={() => {
                                    setState(prev => ({ ...prev, deletionEnabled: index + '' }))
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(10) }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <UserAvatar source={inboxItem?.user?.pic ? { uri: inboxItem?.user?.pic } : DEFAULT_USER_PIC} size={50} />
                                            <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>{inboxItem?.user?.firstName || inboxItem?.user?.userName}</AppText>
                                                    <IsUserVerifiedCheck check={inboxItem?.user?.isVerified} />
                                                    <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(inboxItem?.user?.earnedXps)}</AppText>
                                                    <AppText size={1} color={AppTheme.colors.lightGrey}> - {moment(inboxItem.createdAt).fromNow(true)}</AppText>
                                                </View>
                                                <AppText size={1} color={AppTheme.colors.lightGrey} >{inboxItem?.user?.userName}</AppText>
                                            </View>
                                            {state.deletionEnabled ?
                                                <AppRadioButton color={AppTheme.colors.red} val={state.deletionEnabled === index + ''} onPress={() => { setState(prev => ({ ...prev, deletionEnabled: index + '' })) }} size={20} />
                                                : null}
                                        </View>
                                        <AppText lines={2} size={2} style={{ paddingVertical: RFValue(5) }}>{inboxItem?.message}</AppText>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />}

            <AppFriendsListModal show={state.showFriendsListModal} toggle={() => setState(prev => ({ ...prev, showFriendsListModal: false }))}
                selectedContacts={(contact) => {
                    setState(prev => ({ ...prev, showFriendsListModal: false }))
                    navigation.navigate("ChatWindow", { friend: contact })
                }} />
        </View>

    );
};

export { InboxScreen };
