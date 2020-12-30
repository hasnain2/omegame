

import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppSearchBar, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCKUP_POSTS } from '../../mockups/Mockups';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { Ionicons } from '../../utils/AppIcons';

const AppContactsSearch = ({ navigation, route, }) => {
    let [state, setState] = useState({
        loading: true,
        searchTerm: ''
    })

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(15) }} />

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
                keyExtractor={ii => (ii?._id || '') + 'you'}
                renderItem={({ item, index }) => (
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.replace("ChatWindow")}>
                        <View style={{ padding: RFValue(20), flexDirection: 'row', borderBottomWidth: 0.5, borderColor: AppTheme.colors.lightGrey, alignItems: 'center' }}>
                            <UserAvatar corner={item?.user?.corner || ''} color={item?.user?.cornerColor || user?.cornerColor || false} source={{ uri: item.user.photo }} size={50} />
                            <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <AppText bold={true} size={1} color={'white'}>{item.user.first_name} {item.user.last_name}</AppText>
                                    <IsUserVerifiedCheck check={item.user.isVerified} />
                                    <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item.user.XP)}</AppText>
                                </View>
                                <AppText size={1} color={AppTheme.colors.lightGrey} >{item.user.nickname}</AppText>
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
export { AppContactsSearch };
