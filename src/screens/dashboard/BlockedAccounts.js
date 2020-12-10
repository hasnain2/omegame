

import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppHeaderCommon, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCKUP_POSTS } from '../../mockups/Mockups';
import { GET_FRIEND_LIST_TYPES } from '../../utils/AppConstants';
import { GerUserListByType } from '../../services'
const BlockedAccounts = ({ navigation, route, }) => {
    let [state, setState] = useState({
        loading: false,
    })

    useEffect(() => {
        GerUserListByType((response) => {

        }, false, GET_FRIEND_LIST_TYPES.BLOCKED)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppHeaderCommon navigation={navigation} label={"BLOCKED ACCOUNTS"} />
            <FlatList
                data={MOCKUP_POSTS}
                initialNumToRender={2}
                windowSize={2}
                removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                bounces={false}
                keyExtractor={ii => ii.id + 'you'}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: AppTheme.colors.lightGrey, borderBottomWidth: 0.5, padding: RFValue(20) }}>
                        <UserAvatar source={{ uri: item.user.photo }} size={50} />
                        <View style={{ paddingLeft: RFValue(10), flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                <AppText bold={true} size={2} >{item.user.first_name} </AppText>
                                <IsUserVerifiedCheck check={item.user.isVerified} />
                                <AppText bold={true} color={AppTheme.colors.primary} size={1}> 1123</AppText>
                            </View>
                            <AppText color={AppTheme.colors.lightGrey} size={1}>{item.user.nickname}</AppText>
                        </View>

                        <TouchableOpacity activeOpacity={0.7} style={{ flex: 0.55 }} onPress={() => {

                        }}>
                            <View style={{ borderRadius: 90, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: AppTheme.colors.lightGrey, padding: RFValue(10) }}>
                                <AppText color={AppTheme.colors.lightGrey} size={1} bold={true}>UNBLOCK</AppText>
                            </View>
                        </TouchableOpacity>
                    </View>
                )} />

        </View>

    );
};

export { BlockedAccounts };
