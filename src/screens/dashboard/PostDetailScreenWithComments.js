
import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_COMMENT, ICON_MENU } from '../../../assets/icons';
import { AppBackButton, AppInputToolBar, AppText, IsUserVerifiedCheck, PostCard } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCKUP_POSTS } from '../../mockups/Mockups';
import { CommentPost } from '../../services';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { FontAwesome } from '../../utils/AppIcons';

const PostDetailScreenWithComments = ({ navigation, route, }) => {
    let postData = route?.params?.post;
    let [state, setState] = useState({
        loading: false,
        LHeight: 0,
        LWidth: 0
    })

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}
            onLayout={(event) => {
                var { x, y, width, height } = event.nativeEvent.layout;
                setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
            }}>
            <AppBackButton navigation={navigation} />
            <FlatList
                data={MOCKUP_POSTS}
                windowSize={2}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                keyExtractor={ee => ee.id + 'ran'}
                renderItem={({ item, index }) => (
                    <>
                        {index === 0 ?
                            <View style={{ paddingBottom: RFValue(20) }}>
                                <PostCard item={postData} navigation={navigation} startPlaying={true} onMenuPress={() => { }} />
                            </View>
                            : null}

                        <View style={{ paddingHorizontal: RFValue(10) }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ height: '100%', alignItems: 'center' }}>
                                    <UserAvatar size={50} />
                                    {index % 2 != 0 ?
                                        <View style={{ width: 2, flex: 1, backgroundColor: AppTheme.colors.lightGrey }} />
                                        : null}
                                </View>

                                <View style={{ flex: 1 }} >
                                    <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>User nme</AppText>
                                            <IsUserVerifiedCheck check={true} />
                                            <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>2342</AppText>
                                            <AppText size={1} color={AppTheme.colors.lightGrey} style={{ flex: 1 }}> - {moment(new Date()).fromNow(true)}</AppText>


                                            <TouchableOpacity onPress={() => {

                                            }}>
                                                <Image source={ICON_MENU} style={{ tintColor: 'white', height: RFValue(30), width: RFValue(30), padding: RFValue(15) }} />
                                            </TouchableOpacity>

                                        </View>
                                        <AppText size={1} color={AppTheme.colors.lightGrey} >nickname</AppText>
                                        <AppText size={2} color={'white'} style={{ paddingVertical: RFValue(10) }} >Lorem thisi comment Lorem thisi comment Lorem thisi comment Lorem thisi comment Lorem thisi comment Lorem thisi comment Lorem thisi comment Lorem thisi comment </AppText>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>


                                        <TouchableOpacity activeOpacity={0.7} onPress={() => {

                                        }}>
                                            <View style={{ flexDirection: 'row', padding: RFValue(15), alignItems: 'center' }}>
                                                <FontAwesome name="heart-o" style={{ fontSize: RFValue(20), paddingRight: RFValue(5), color: 'grey' }} />
                                                <AppText size={1} color={AppTheme.colors.lightGrey}>{largeNumberShortify(23234)}</AppText>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity activeOpacity={0.7} onPress={() => {

                                        }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                {/* <Ionicons name="chatbubble-outline" style={{ fontSize: RFValue(20), paddingRight: RFValue(5), color: 'white' }} /> */}
                                                <FastImage source={ICON_COMMENT} style={{ height: RFValue(37), width: RFValue(37) }} />
                                                <AppText size={1} color={AppTheme.colors.lightGrey}>{largeNumberShortify(item.comments)}</AppText>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </View>

                        </View>
                    </>
                )} />
            {state.LHeight > 0 ?
                <AppInputToolBar LHeight={state.LHeight} onSend={(msg) => {
                    CommentPost(() => {

                    }, {
                        mentions: [],
                        parentComment: postData._id,
                        text: msg,
                        post: postData._id
                    })
                }} />
                : <AppInputToolBar LHeight={state.LHeight} onSend={(msg) => {
                    CommentPost(() => {

                    }, {
                        mentions: [],
                        parentComment: postData._id,
                        text: msg,
                        post: postData._id
                    })
                }} />}
        </View>
    );
};

export { PostDetailScreenWithComments };
