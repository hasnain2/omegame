
import React from 'react';
import { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_COMMENT, ICON_SAVE_POST, ICON_SHARE } from '../../assets/icons';
import { AppText } from '../components';
import { AppTheme } from '../config';
import { LikePost, SaveOrBookMarkPost, SharePost } from '../services/postService';
import { SHARE_STATUS_TYPES } from '../utils/AppConstants';
import { AppShareContents, largeNumberShortify } from '../utils/AppHelperMethods';
import { FontAwesome } from '../utils/AppIcons';
const PostPoolBottomBar = ({ item, navigation, likePress, bookmarkPress }) => {
    let [state, setState] = useState({
        isLiked: item.isLiked || false,
        isShared: item.isShared || false,
        isSaved: item.isSaved || false
    })

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                console.log(item)
                setState(prev => ({ ...prev, isLiked: !state.isLiked }))
                LikePost(() => {

                }, item._id, { type: "LIKE" })
            }}>
                <View style={{ flexDirection: 'row', padding: RFValue(15), alignItems: 'center' }}>
                    <FontAwesome name="heart-o" style={{ fontSize: RFValue(20), paddingRight: RFValue(5), color: state.isLiked ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                    <AppText size={1} color={AppTheme.colors.lightGrey}>{largeNumberShortify((item?.computed?.find(ii => ii.key === 'LIKE')?.value + (state.isLiked ? 1 : 0)) || 0)}</AppText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                navigation.navigate("PostDetailScreenWithComments", { post: item })
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Ionicons name="chatbubble-outline" style={{ fontSize: RFValue(20), paddingRight: RFValue(5), color: 'white' }} /> */}
                    <FastImage source={ICON_COMMENT} style={{ height: RFValue(37), width: RFValue(37) }} />
                    <AppText size={1} color={AppTheme.colors.lightGrey}>{largeNumberShortify(item?.computed?.find(ii => ii.key === 'COMMENTS')?.value || 0)}</AppText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                SharePost(() => {

                }, item._id, { platform: SHARE_STATUS_TYPES.FACEBOOK })
                AppShareContents((res) => {
                    setState(prev => ({ ...prev, isShared: res }))
                }, "hey you might wanna check this post out on OmeGame.")
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage source={ICON_SHARE} style={{ height: RFValue(36), width: RFValue(36) }} />
                    <AppText size={1} color={AppTheme.colors.lightGrey}>{largeNumberShortify((item?.computed?.find(ii => ii.key === 'SHARE')?.value + (state.isShared ? 1 : 0)) || 0)}</AppText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                console.log('-------------BOOKMARK---------', JSON.stringify(item))
                setState(prev => ({ ...prev, isSaved: !state.isSaved }))
                SaveOrBookMarkPost((res) => {

                }, item._id, { bookmark: true })
            }}>
                <View style={{ flexDirection: 'row', padding: RFValue(15), alignItems: 'center' }}>
                    <Image source={ICON_SAVE_POST} style={{ height: RFValue(36), width: RFValue(36), tintColor: state.isSaved ? AppTheme.colors.primary : 'grey' }} />
                </View>
            </TouchableOpacity>
        </View>
    )
};

export { PostPoolBottomBar };
