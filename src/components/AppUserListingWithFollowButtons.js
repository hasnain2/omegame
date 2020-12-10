
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppTheme } from '../config';
import { MOCKUP_POSTS } from '../mockups/Mockups';
import { largeNumberShortify } from '../utils/AppHelperMethods';
import { AppGradientContainer } from './AppGradientContainer';
import { AppText } from './AppText';
import { IsUserVerifiedCheck } from './IsUserVerifiedCheck';
import { UserAvatar } from './UserAvatar';
const AppUserListingWithFollowButtons = ({ navigation, data, style }) => {
    return (
        <View style={[{ flex: 1, backgroundColor: AppTheme.colors.background }, style ? style : null]}>
            <FlatList
                data={data || MOCKUP_POSTS}
                initialNumToRender={2}
                windowSize={2}
                removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                bounces={false}
                keyExtractor={ii => ii.id + 'you'}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'row', borderBottomColor: AppTheme.colors.darkGrey, borderBottomWidth: 1, flex: 1, padding: RFValue(7), alignItems: 'center' }}>
                        <UserAvatar size={50} source={item.user.photo ? { uri: item.user.photo } : null} />
                        <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <AppText bold={true} size={1} color={'white'}>{item.user.first_name} {item.user.last_name}</AppText>
                                <IsUserVerifiedCheck check={item.user.isVerified} />
                                <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item.user.XP)}</AppText>

                            </View>
                            <AppText size={1} color={AppTheme.colors.lightGrey} >{item.user.nickname}</AppText>
                        </View>

                        <View style={{ flex: 0.7 }}>
                            {item.user.isFollowing ?
                                <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
                                    <View onPress={() => { }} style={{ justifyContent: 'center', width: '100%', alignItems: 'center', padding: RFValue(10), borderRadius: 90, borderWidth: 1, borderColor: AppTheme.colors.lightGrey }}>
                                        <AppText size={1} bold={true} color={AppTheme.colors.lightGrey} >FOLLOWING</AppText>
                                    </View>
                                </TouchableOpacity>
                                :
                                <AppGradientContainer onPress={() => { }} style={{ justifyContent: 'center', width: '100%', alignItems: 'center', padding: RFValue(10), borderRadius: 90 }}>
                                    <AppText size={1} bold={true} color={"white"} >FOLLOW</AppText>
                                </AppGradientContainer>
                            }
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export { AppUserListingWithFollowButtons };