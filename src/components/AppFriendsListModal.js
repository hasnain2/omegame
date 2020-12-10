import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppTheme } from '../config';
import { MOCKUP_POSTS } from '../mockups/Mockups';
import { largeNumberShortify } from '../utils/AppHelperMethods';
import { AntDesign } from '../utils/AppIcons';
import { AppBackButton } from './AppBackButton';
import { AppHeaderCommon } from './AppHeaderCommon';
import { AppModal } from './AppModal';
import { AppSearchBar } from './AppSearchBar';
import { AppText } from './AppText';
import { IsUserVerifiedCheck } from './IsUserVerifiedCheck';
import { UserAvatar } from './UserAvatar';

const AppFriendsListModal = ({ show, toggle, selectedContacts, chosenContacts = [], showDone }) => {
    let [state, setState] = useState({
        loading: true,
        searchTerm: '',
        showModal: show
    })

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
                        setState(prev => ({ ...prev, searchTerm: val }))
                    }} />
                </View>

                <FlatList
                    data={MOCKUP_POSTS}
                    initialNumToRender={2}
                    windowSize={2}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    bounces={false}
                    keyExtractor={ii => ii.id + 'you'}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity activeOpacity={0.7} onPress={() => selectedContacts(item)}>
                            <View style={{ padding: RFValue(20), flexDirection: 'row', borderBottomWidth: 0.5, borderColor: AppTheme.colors.lightGrey, alignItems: 'center' }}>
                                <UserAvatar source={{ uri: item.user.photo }} size={50} />
                                <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <AppText bold={true} size={1} color={'white'}>{item.user.first_name} {item.user.last_name}</AppText>
                                        <IsUserVerifiedCheck check={item.user.isVerified} />
                                        <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item.user.XP)}</AppText>
                                    </View>
                                    <AppText size={1} color={AppTheme.colors.lightGrey} >{item.user.nickname}</AppText>
                                </View>
                                {chosenContacts.includes(item.id) ?
                                    <AntDesign name={"check"} style={{ fontSize: RFValue(20), color: AppTheme.colors.green }} />
                                    : null}
                            </View>
                        </TouchableOpacity>
                    )} />
            </View>
        </AppModal>
    )
}

export { AppFriendsListModal };