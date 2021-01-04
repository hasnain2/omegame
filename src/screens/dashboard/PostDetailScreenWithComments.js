
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_COMMENT } from '../../../assets/icons';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppBackButton, AppInputToolBar, AppLoadingView, AppNoDataFound, AppText, IsUserVerifiedCheck, PostCard } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { CommentPost, CommentReaction, GetCommentsOfPost, GetCommentsReplies, GetSinglePost } from '../../services';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { FontAwesome } from '../../utils/AppIcons';
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PostDetailScreenWithComments = ({ navigation, route, }) => {
    let [postData, setPostData] = useState(route?.params?.post || null);
    let postID = postData?._id || route?.params?.postID;

    let [state, setState] = useState({
        loading: true,
        comments: [],
        LHeight: 0,
        LWidth: 0,
        commentLikesArr: [],
        replies: { _id: '', data: [] },
        parentID: { parentComment: '', _id: '' }
    })

    const getcommentshelper = () => {
        GetCommentsOfPost((postCommentsResponse) => {
            if (postCommentsResponse) {
                setState(prev => ({ ...prev, loading: false, comments: postCommentsResponse, }))
            } else {
                setState(prev => ({ ...prev, loading: false }))
            }
        }, '', '', postID)
    }

    const getcommentreplieshelper = (parentIDparam) => {
        GetCommentsReplies((commentsRepliesResponse) => {
            if (commentsRepliesResponse) {
                setState(prev => ({ ...prev, loading: false, replies: { _id: parentIDparam, data: commentsRepliesResponse } }))
            } else {
                setState(prev => ({ ...prev, loading: false }))
            }
        }, '', '', parentIDparam)
    }

    const getsinglepostbyidhelper = () => {
        GetSinglePost((updatedPost) => {
            if (updatedPost) {
                setPostData(updatedPost);
                getcommentshelper();
            }
            setState(prev => ({ ...prev, loading: false }))
        }, postID);
    }

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', e => {
            getsinglepostbyidhelper();
        });

        return () => {
            unsubscribeFocus();
        }
    }, [])

    function renderCommentView(item, isCommentIsLiked, index) {
        return (
            <View style={{ paddingHorizontal: RFValue(10) }}>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ height: '100%', alignItems: 'center' }}>
                        <UserAvatar onPress={() => {
                            if (item?.createdBy?._id)
                                navigation.navigate("UserProfileScreen", { userID: item?.createdBy?._id })
                        }} corner={item?.createdBy?.corner || ''} color={item?.createdBy?.cornerColor} source={item?.createdBy?.pic ? { uri: item?.createdBy?.pic } : DEFAULT_USER_PIC} size={50} />

                        {(state?.replies?._id === item?.parentComment && state.replies?.data?.length - 1 !== index) || state?.replies?._id === item?._id ?
                            <View style={{ width: 2, flex: 1, backgroundColor: AppTheme.colors.lightGrey }} />
                            : null}
                    </View>

                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                if (item?.createdBy?._id)
                                    navigation.navigate("UserProfileScreen", { userID: item?.createdBy?._id })
                            }}>
                                <View style={{}} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>{item?.createdBy?.firstName || item?.createdBy?.userName}</AppText>
                                        <IsUserVerifiedCheck check={item?.createdBy?.isVerified} />
                                        <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{item?.createdBy?.level}</AppText>
                                        <AppText size={1} color={AppTheme.colors.lightGrey} style={{ flex: 1 }}> - {moment(item?.createdAt || new Date()).fromNow(true)}</AppText>

                                        <TouchableOpacity activeOpacity={0.8} onPress={() => {

                                        }}>
                                            {/* <Image source={ICON_MENU} style={{ tintColor: 'white', height: RFValue(30), width: RFValue(30), padding: RFValue(15) }} /> */}
                                        </TouchableOpacity>

                                    </View>
                                    <AppText size={1} color={AppTheme.colors.lightGrey} >{item?.createdBy?.userName}</AppText>
                                </View>
                            </TouchableOpacity>
                            <AppText size={2} color={'white'} style={{ paddingVertical: RFValue(10) }} >{item?.text}</AppText>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <TouchableOpacity activeOpacity={0.8} activeOpacity={0.7} onPress={() => {
                                let tempLikesArr = state.commentLikesArr;
                                let foundIndex = tempLikesArr?.findIndex(ii => ii === item?._id)
                                if (foundIndex > -1)
                                    tempLikesArr.splice(foundIndex, 1)
                                else
                                    tempLikesArr.push(item?._id)
                                setState(prev => ({ ...prev, commentLikesArr: tempLikesArr }))
                                CommentReaction(() => {

                                }, item?._id, {
                                    type: "LIKE"
                                })
                            }}>
                                <View style={{ flexDirection: 'row', padding: RFValue(15), alignItems: 'center' }}>
                                    <FontAwesome name="heart-o" style={{ fontSize: RFValue(20), paddingRight: RFValue(5), color: isCommentIsLiked ? AppTheme.colors.primary : 'grey' }} />
                                    <AppText size={1} color={AppTheme.colors.lightGrey}>{largeNumberShortify(((item?.computed?.find(reactionVal => reactionVal.key === 'LIKE')?.value || 0) + isCommentIsLiked ? 1 : 0) || isCommentIsLiked ? 1 : 0)}</AppText>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.8} activeOpacity={0.7} onPress={() => {
                                // setState(prev => ({ ...prev, parentID: item?._id }))
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <Ionicons name="chatbubble-outline" style={{ fontSize: RFValue(20), paddingRight: RFValue(5), color: 'white' }} /> */}
                                    <FastImage source={ICON_COMMENT} style={{ height: RFValue(35), width: RFValue(35) }} />
                                    <AppText size={1} color={AppTheme.colors.lightGrey}>{largeNumberShortify((item?.computed?.find(reactionVal => reactionVal.key === 'REPLIES')?.value || 0) || 0)}</AppText>
                                </View>
                            </TouchableOpacity>

                            {item?.computed?.find(reactionVal => reactionVal.key === 'REPLIES')?.value > 0 ?
                                <TouchableOpacity activeOpacity={0.8} activeOpacity={0.7} onPress={() => {
                                    if (state?.replies?._id === item?._id) {
                                        setState(prev => ({ ...prev, replies: { _id: '', data: [] } }))
                                    } else {
                                        setState(prev => ({ ...prev, loading: true }))
                                        getcommentreplieshelper(item?._id)
                                    }
                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                                }}>
                                    <View style={{ flexDirection: 'row', padding: RFValue(10), paddingHorizontal: RFValue(20), alignItems: 'center' }}>
                                        <AppText size={1} color={AppTheme.colors.lightGrey}>{state?.replies?._id === item?._id ? "Hide replies" : "View replies"}</AppText>
                                    </View>
                                </TouchableOpacity>
                                : null}

                            <TouchableOpacity activeOpacity={0.8} activeOpacity={0.7} onPress={() => {
                                setState(prev => ({ ...prev, parentID: item }))
                            }}>
                                <View style={{ flexDirection: 'row', padding: RFValue(10), paddingHorizontal: RFValue(20), alignItems: 'center' }}>
                                    <AppText size={1} color={AppTheme.colors.lightGrey}>Reply</AppText>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}
            onLayout={(event) => {
                var { x, y, width, height } = event.nativeEvent.layout;
                setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
            }}>
            <AppBackButton navigation={navigation} />
            {!postData && !state.loading ?
                <AppNoDataFound msg={"Post does not exist!"} /> :
                <>
                    {state.comments.length < 1 && postData ?
                        <View style={{ paddingBottom: RFValue(20) }}>
                            <PostCard item={postData} navigation={navigation} startPlaying={true} />
                        </View>
                        : null}

                    <FlatList
                        data={state.comments}
                        contentContainerStyle={{ paddingBottom: RFValue(100) }}
                        windowSize={2}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        keyExtractor={ee => ee._id + ''}
                        renderItem={({ item, index }) => {
                            let isCommentIsLiked = state.commentLikesArr.includes(item?._id);
                            return (
                                <>
                                    {index === 0 && postData ?
                                        <View style={{ paddingBottom: RFValue(20) }}>
                                            <PostCard item={postData} navigation={navigation} startPlaying={true} />
                                        </View>
                                        : null}

                                    {renderCommentView(item, isCommentIsLiked, index)}
                                    {state?.replies?._id === item?._id ?
                                        state?.replies?.data.map((ittem, inndex) => {
                                            let isReplyIsLiked = state.commentLikesArr.includes(ittem._id);
                                            return (
                                                <View key={`${inndex}key`} style={{}}>
                                                    { renderCommentView(ittem, isReplyIsLiked, inndex)}
                                                </View>
                                            )
                                        })
                                        : null}
                                </>
                            )
                        }} />
                </>
            }
            <AppInputToolBar
                placeholder={state.parentID?.createdBy?.userName ? ("@" + state.parentID?.createdBy?.userName) : ""}
                LHeight={state.LHeight}
                removeTag={() => {
                    setState(prev => ({ ...prev, parentID: '' }))
                }}
                onSend={(msg) => {
                    CommentPost((newCommentRes) => {
                        if (newCommentRes) {
                            getcommentshelper();
                            if (state.parentID?.parentComment || state.parentID?._id)
                                getcommentreplieshelper(state.parentID?.parentComment || state.parentID?._id)
                        }
                        setState(prev => ({ ...prev, parentID: '' }))
                        getsinglepostbyidhelper();
                    }, state.parentID?.parentComment || state.parentID?._id ? {
                        // mentions: [],
                        parentComment: state.parentID?.parentComment || state.parentID?._id,
                        text: msg,
                        post: postData._id
                    } : {
                            text: msg,
                            post: postData._id
                        })
                }} />

            {state.loading ?
                <AppLoadingView />
                : null}
        </View>
    );
};

export { PostDetailScreenWithComments };
