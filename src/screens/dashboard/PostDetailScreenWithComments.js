
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_COMMENT, ICON_MENU } from '../../../assets/icons';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppBackButton, AppInputToolBar, AppText, IsUserVerifiedCheck, PostCard } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { CommentPost, GetCommentsOfPost, GetSinglePost } from '../../services';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { FontAwesome } from '../../utils/AppIcons';
let tempComment = {
    _id: "5fd389ab723fb8b357481223",
    mentions: [],
    text: "Hello",
    post: "5fd37aeb723fb8b35748121f",
    createdBy: {
        _id: "5fcf8078c2a5304076e1ecb3",
        profileId: "",
        followers: 3,
        friends: 0,
        following: 6,
        level: 1,
        bio: "Asdf",
        pic: "",
        cover: null,
        earnedCoins: 0,
        earnedXps: 0,
        userName: "asadalicodingpixel",
        isVerified: false,
        firstName: "Asdf"
    },
    slug: "",
    createdAt: "2020-12-11T15:00:59.166Z",
    updatedAt: "2020-12-11T15:00:59.166Z",
    __v: 0
}
const PostDetailScreenWithComments = ({ navigation, route, }) => {
    let postData = route?.params?.post;
    let postID = postData?._id || route?.params?.postID;
    let user = useSelector(state => state.root.user)

    tempComment.createdAt.firstName = user?.firstName || user?.userName || '';
    tempComment.createdAt.userName = user?.userName || user?.firstName || '';
    tempComment.createdAt.pic = user?.pic || false;


    let [state, setState] = useState({
        loading: false,
        comments: [],
        LHeight: 0,
        LWidth: 0,
        parentID: ''
    })

    useEffect(() => {
        GetSinglePost((data) => {
            if (data) {

            }
        }, postID);
        GetCommentsOfPost((postCommentsResponse) => {
            if (postCommentsResponse) {
                console.log('-------COMMENTS---------', JSON.stringify(postCommentsResponse))
                setState(prev => ({ ...prev, comments: postCommentsResponse }))
            }
        }, '', '', postID)
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}
            onLayout={(event) => {
                var { x, y, width, height } = event.nativeEvent.layout;
                setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
            }}>
            <AppBackButton navigation={navigation} />
            {state.comments.length < 1 ?
                <View style={{ paddingBottom: RFValue(20) }}>
                    <PostCard item={postData} navigation={navigation} startPlaying={true} onMenuPress={() => { }} />
                </View>
                : null}

            <FlatList
                data={state.comments}
                contentContainerStyle={{ paddingBottom: RFValue(100) }}
                windowSize={2}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                keyExtractor={ee => ee._id + ''}
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
                                    <UserAvatar source={item?.createdBy?.pic ? { uri: item?.createdBy?.pic } : DEFAULT_USER_PIC} size={50} />
                                    {index % 2 != 0 ?
                                        <View style={{ width: 2, flex: 1, backgroundColor: AppTheme.colors.lightGrey }} />
                                        : null}
                                </View>

                                <View style={{ flex: 1 }} >
                                    <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>{item?.createdBy?.firstName || item?.createdBy?.userName}</AppText>
                                            <IsUserVerifiedCheck check={item?.createdBy?.isVerified} />
                                            <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{item?.createdBy?.earnedCoins}</AppText>
                                            <AppText size={1} color={AppTheme.colors.lightGrey} style={{ flex: 1 }}> - {moment(item?.createdAt || new Date()).fromNow(true)}</AppText>

                                            <TouchableOpacity onPress={() => {

                                            }}>
                                                <Image source={ICON_MENU} style={{ tintColor: 'white', height: RFValue(30), width: RFValue(30), padding: RFValue(15) }} />
                                            </TouchableOpacity>

                                        </View>
                                        <AppText size={1} color={AppTheme.colors.lightGrey} >{item?.createdBy?.userName}</AppText>
                                        <AppText size={2} color={'white'} style={{ paddingVertical: RFValue(10) }} >{item?.text}</AppText>
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
                                            setState(prev => ({ ...prev, parentID: item?._id }))
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
                    let temCommentsState = state.comments;
                    tempComment.text = msg;
                    tempComment.createdAt = new Date();
                    temCommentsState.unshift(tempComment);
                    setState(prev => ({ ...prev, comments: temCommentsState }));
                    CommentPost(() => {

                    }, state.parentID ? {
                        // mentions: [],
                        parentComment: postData._id,
                        text: msg,
                        post: postData._id
                    } : {
                            text: msg,
                            post: postData._id
                        })
                }} />
                :
                <AppInputToolBar LHeight={state.LHeight} onSend={(msg) => {
                    let temCommentsState = state.comments;
                    tempComment.text = msg;
                    tempComment.createdAt = new Date();
                    temCommentsState.unshift(tempComment);
                    setState(prev => ({ ...prev, comments: temCommentsState }));
                    CommentPost(() => {

                    }, state.parentID ? {
                        // mentions: [],
                        parentComment: postData._id,
                        text: msg,
                        post: postData._id
                    } : {
                            // mentions: [],
                            text: msg,
                            post: postData._id
                        })
                }} />}
        </View>
    );
};

export { PostDetailScreenWithComments };
