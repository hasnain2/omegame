

import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_NEW_MESSAGE } from '../../../assets/icons';
import { AppBackButton, AppFriendsListModal, AppRadioButton, AppSearchBar, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCK_INBOX } from '../../mockups/Mockups';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { AntDesign } from '../../utils/AppIcons';
const InboxScreen = ({ navigation, route, }) => {
    let [state, setState] = useState({
        loading: false,
        deletionEnabled: '',
        showFriendsListModal: false
    })
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
                                <Image source={ICON_NEW_MESSAGE} style={{ fontSize: RFValue(30), height: RFValue(30), width: RFValue(25), tintColor: '#02aaff' }} />
                                <AppText size={2} color={'#02aaff'}>  New Message</AppText>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 0.3 }}>

                        </View>
                    </>
                    :
                    <View style={{ justifyContent: 'flex-end', flex: 1, paddingHorizontal: RFValue(10), flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            setState(prev => ({ ...prev, deletionEnabled: '' }))
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

            <FlatList
                data={MOCK_INBOX}
                initialNumToRender={2}
                windowSize={2}
                removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                bounces={false}
                keyExtractor={ii => (ii._id || '')+ 'you'}
                renderItem={({ item, index }) => (
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => {
                            navigation.navigate('ChatWindow', { friend: item })
                        }} onLongPress={() => {
                            setState(prev => ({ ...prev, deletionEnabled: index + '' }))
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(10) }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <UserAvatar size={50} />
                                    <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>{item.user.first_name} {item.user.last_name}</AppText>
                                            <IsUserVerifiedCheck check={item.user.isVerified} />
                                            <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item.user.XP)}</AppText>
                                            <AppText size={1} color={AppTheme.colors.lightGrey}> - {moment(item.createdAt).fromNow(true)}</AppText>
                                        </View>
                                        <AppText size={1} color={AppTheme.colors.lightGrey} >{item.user.nickname}</AppText>
                                    </View>
                                    {state.deletionEnabled ?
                                        <AppRadioButton color={AppTheme.colors.red} val={state.deletionEnabled === index + ''} onPress={() => { setState(prev => ({ ...prev, deletionEnabled: index + '' })) }} size={20} />
                                        : null}
                                </View>
                                <AppText lines={2} size={2} style={{ paddingVertical: RFValue(5) }}>{item.msg}</AppText>
                            </View>
                        </View>
                    </TouchableOpacity>
                )} />






            <AppFriendsListModal show={state.showFriendsListModal} toggle={() => setState(prev => ({ ...prev, showFriendsListModal: false }))}
                selectedContacts={(contact) => {
                    setState(prev => ({ ...prev, showFriendsListModal: false }))
                    navigation.navigate("ChatWindow", { friend: contact })
                }} />
        </View>

    );
};

export { InboxScreen };
