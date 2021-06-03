import moment from 'moment';
import React, {useEffect, useRef, useState, createRef} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
  View,
  Image,
  Text,
} from 'react-native';
import {AppModal} from '../../components';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICON_COMMENT} from '../../../assets/icons';
import {ICON_DELETE, ICON_MENU} from '../../../assets/icons';
import {ICON_EDIT} from '../../../assets/icons';
import {DEFAULT_USER_PIC} from '../../../assets/images';
import {
  AppBackButton,
  AppInputMention,
  AppLoadingView,
  AppNoDataFound,
  AppText,
  IsUserVerifiedCheck,
  PostCard,
} from '../../components';

import {UserAvatar} from '../../components/UserAvatar';
import {AppTheme} from '../../config';
import {
  CommentPost,
  CommentEdit,
  CommentReaction,
  GetCommentsOfPost,
  GetCommentsReplies,
  GetSinglePost,
  DeleteComment,
} from '../../services';
import {largeNumberShortify} from '../../utils/AppHelperMethods';
import {FontAwesome} from '../../utils/AppIcons';
import {useSelector} from 'react-redux';
import EditComment from './EditComment';
import ActionSheet from 'react-native-actions-sheet';
import AntIcon from 'react-native-vector-icons/AntDesign';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const PostDetailScreenWithComments = ({navigation, route}) => {
  let actionSheetRef = null;

  let {user} = useSelector((state) => state.root);
  let [postData, setPostData] = useState(route?.params?.post || null);
  let postID = postData?._id || route?.params?.postID;
  const flatListRef = useRef(null);
  const [editModal, showEditModal] = useState(false);
  const [editComment, setComment] = useState('');
  let [state, setState] = useState({
    loading: true,
    focused: true,
    comments: [],
    LHeight: 0,
    LWidth: 0,
    currentIndex: 0,
    commentLikesArr: [],
    replies: {_id: '', data: []},
    parentID: {parentComment: '', _id: ''},
  });

  const getcommentshelper = () => {
    GetCommentsOfPost(
      (postCommentsResponse) => {
        if (postCommentsResponse) {
          setState((prev) => ({
            ...prev,
            loading: false,
            comments: postCommentsResponse,
          }));
        } else {
          setState((prev) => ({...prev, loading: false}));
        }
      },
      '',
      '',
      postID,
    );
  };

  const ScrollToSpecificIndex = (index) => {
    if (flatListRef && flatListRef.current) flatListRef?.current?.scrollToIndex({animated: true, index: index});
  };

  const getcommentreplieshelper = (parentIDparam) => {
    GetCommentsReplies(
      (commentsRepliesResponse) => {
        if (commentsRepliesResponse) {
          setState((prev) => ({
            ...prev,
            loading: false,
            replies: {_id: parentIDparam, data: commentsRepliesResponse},
          }));
        } else {
          setState((prev) => ({...prev, loading: false}));
        }
      },
      '',
      '',
      parentIDparam,
    );
  };

  const getsinglepostbyidhelper = () => {
    GetSinglePost((updatedPost) => {
      if (updatedPost) {
        setPostData(updatedPost);
        getcommentshelper();
      }
      setState((prev) => ({...prev, loading: false}));
    }, postID);
  };
  const deleteCommentHelper = (item) => {
    DeleteComment((res) => {
      if (res) {
        setState((prev) => ({...prev, comments: state.comments.filter((cmt) => cmt._id !== item._id)}));
      }
    }, item._id);
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', (e) => {
      getsinglepostbyidhelper();
      setState((prev) => ({...prev, focused: true}));
    });
    const unsubscribeBlur = navigation.addListener('blur', (e) => {
      setState((prev) => ({...prev, focused: false}));
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, []);

  function renderCommentView(item, isCommentIsLiked, index, currentIndexToSet) {
    let text = item.text;
    let temp = text.split(' ');
    return (
      <View style={{paddingHorizontal: RFValue(10)}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{height: '100%', alignItems: 'center'}}>
            <UserAvatar
              onPress={() => {
                if (item?.createdBy?._id)
                  navigation.navigate('UserProfileScreen', {
                    userID: item?.createdBy?._id,
                  });
              }}
              corner={item?.createdBy?.corner || ''}
              color={item?.createdBy?.cornerColor}
              source={item?.createdBy?.pic ? {uri: item?.createdBy?.pic} : DEFAULT_USER_PIC}
              size={50}
            />

            {(state?.replies?._id === item?.parentComment && state.replies?.data?.length - 1 !== index) ||
            state?.replies?._id === item?._id ? (
              <View
                style={{
                  width: 2,
                  flex: 1,
                  backgroundColor: AppTheme.colors.lightGrey,
                }}
              />
            ) : null}
          </View>

          <View style={{flex: 1}}>
            <View style={{flex: 1, paddingLeft: RFValue(10)}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      if (item?.createdBy?._id)
                        navigation.navigate('UserProfileScreen', {
                          userID: item?.createdBy?._id,
                        });
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>
                        {item?.createdBy?.firstName || item?.createdBy?.userName}
                      </AppText>
                      <IsUserVerifiedCheck check={item?.createdBy?.isVerified} />
                      <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{paddingLeft: RFValue(5)}}>
                        {item?.createdBy?.level}
                      </AppText>
                      <AppText size={1} color={AppTheme.colors.lightGrey} style={{flex: 1}}>
                        {' '}
                        - {moment(item?.createdAt || new Date()).fromNow(true)}
                      </AppText>
                    </View>
                    <AppText size={1} color={AppTheme.colors.lightGrey}>
                      {item?.createdBy?.userName}
                    </AppText>
                  </TouchableOpacity>
                </View>
                <View sytle={{flex: 1}}>
                  {user._id === item?.createdBy._id ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        setComment(item);

                        actionSheetRef?.setModalVisible();
                      }}>
                      <View style={{alignItems: 'flex-end'}}>
                        <Image
                          source={ICON_MENU}
                          style={{
                            tintColor: 'white',
                            height: RFValue(30),
                            width: RFValue(30),
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
              <ActionSheet
                ref={(ref) => {
                  actionSheetRef = ref;
                }}>
                <View
                  style={{
                    height: RFValue(150),
                    backgroundColor: 'black',
                    padding: RFValue(10),
                    borderTopColor: 'white',
                    borderTopWidth: RFValue(2),
                  }}>
                  <>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      activeOpacity={0.7}
                      onPress={() => {
                        // setComment(item);
                        actionSheetRef?.hide();
                        showEditModal(!editModal);
                      }}>
                      <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: RFValue(15)}}>
                        <View
                          style={{
                            height: RFValue(30),
                            width: RFValue(30),
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <AntIcon name="edit" color="white" size={RFValue(20)} />
                        </View>
                        {/* <Image
                            source={ICON_EDIT}
                            style={{
                              height: RFValue(30),
                              width: RFValue(30),
                              tintColor: 'white',
                            }}
                          /> */}
                        <AppText color="white" size={2} style={{paddingHorizontal: RFValue(5)}}>
                          EDIT
                        </AppText>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      activeOpacity={0.7}
                      onPress={() => {
                        // actionSheetRef.current?.hide();
                        deleteCommentHelper(editComment);
                        actionSheetRef?.hide();
                      }}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={ICON_DELETE}
                          style={{height: RFValue(30), width: RFValue(30), tintColor: 'white'}}
                        />
                        <AppText color="white" size={2} style={{paddingHorizontal: RFValue(5)}}>
                          DELETE
                        </AppText>
                      </View>
                    </TouchableOpacity>
                  </>
                </View>
              </ActionSheet>
              <AppText size={2} color={'white'} style={{paddingVertical: RFValue(10)}}>
                {/* <Text style={{color: 'red'}}>Hello</Text> */}
                {temp.map((item1, index) => {
                  let getUser = item1.split('@');
                  let user = item.mentions?.filter((user, index) => user.userName === getUser[1]);
                  return (
                    <>
                      {item1[0] === '@' ? (
                        <Text
                          style={{color: user.length > 0 ? 'blue' : 'white'}}
                          key={index}
                          onPress={() => {
                            if (user.length > 0) {
                              navigation.navigate('UserProfileScreen', {
                                userID: user[0]._id,
                              });
                            }
                          }}>
                          {' '}
                          {item1}{' '}
                        </Text>
                      ) : (
                        <Text key={'you'}>{item1 + ' '}</Text>
                      )}
                    </>
                  );
                })}
              </AppText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                activeOpacity={0.7}
                onPress={() => {
                  let tempLikesArr = state.commentLikesArr;
                  let foundIndex = tempLikesArr?.findIndex((ii) => ii === item?._id);
                  if (foundIndex > -1) tempLikesArr.splice(foundIndex, 1);
                  else tempLikesArr.push(item?._id);
                  setState((prev) => ({
                    ...prev,
                    commentLikesArr: tempLikesArr,
                  }));
                  CommentReaction(() => {}, item?._id, {
                    type: 'LIKE',
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: RFValue(15),
                    alignItems: 'center',
                  }}>
                  <FontAwesome
                    name="heart-o"
                    style={{
                      fontSize: RFValue(20),
                      paddingRight: RFValue(5),
                      color: isCommentIsLiked ? AppTheme.colors.primary : 'grey',
                    }}
                  />
                  <AppText size={1} color={AppTheme.colors.lightGrey}>
                    {largeNumberShortify(
                      ((item?.computed?.find((reactionVal) => reactionVal.key === 'LIKE')?.value || 0) +
                      isCommentIsLiked
                        ? 1
                        : 0) || isCommentIsLiked
                        ? 1
                        : 0,
                    )}
                  </AppText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                activeOpacity={0.7}
                onPress={() => {
                  // setState(prev => ({ ...prev, parentID: item?._id }))
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <Ionicons name="chatbubble-outline" style={{ fontSize: RFValue(20), paddingRight: RFValue(5), color: 'white' }} /> */}
                  <FastImage source={ICON_COMMENT} style={{height: RFValue(35), width: RFValue(35)}} />
                  <AppText size={1} color={AppTheme.colors.lightGrey}>
                    {largeNumberShortify(
                      item?.computed?.find((reactionVal) => reactionVal.key === 'REPLIES')?.value || 0 || 0,
                    )}
                  </AppText>
                </View>
              </TouchableOpacity>

              {item?.computed?.find((reactionVal) => reactionVal.key === 'REPLIES')?.value > 0 ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (state?.replies?._id === item?._id) {
                      setState((prev) => ({
                        ...prev,
                        replies: {_id: '', data: []},
                      }));
                    } else {
                      setState((prev) => ({...prev, loading: true}));
                      getcommentreplieshelper(item?._id);
                    }
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: RFValue(10),
                      paddingHorizontal: RFValue(20),
                      alignItems: 'center',
                    }}>
                    <AppText size={1} color={AppTheme.colors.lightGrey}>
                      {state?.replies?._id === item?._id ? 'Hide replies' : 'View replies'}
                    </AppText>
                  </View>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.8}
                activeOpacity={0.7}
                onPress={() => {
                  setState((prev) => ({
                    ...prev,
                    parentID: item,
                    currentIndex: currentIndexToSet,
                  }));
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: RFValue(10),
                    paddingHorizontal: RFValue(20),
                    alignItems: 'center',
                  }}>
                  <AppText size={1} color={AppTheme.colors.lightGrey}>
                    Reply
                  </AppText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View
      style={{flex: 1, backgroundColor: 'black'}}
      onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        setState((prev) => ({...prev, LHeight: height, LWidth: width}));
      }}>
      <AppBackButton navigation={navigation} />
      {!postData && !state.loading ? (
        <AppNoDataFound msg={'Post does not exist!'} />
      ) : (
        <>
          {state.comments.length < 1 && postData ? (
            <View style={{paddingBottom: RFValue(20)}}>
              <PostCard
                // goBack={() => navigation.goBack()}
                item={postData}
                navigation={navigation}
                startPlaying={state.focused}
                controls={true}
              />
            </View>
          ) : null}

          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <FlatList
              ref={flatListRef}
              data={state.comments}
              contentContainerStyle={{paddingBottom: RFValue(50)}}
              windowSize={2}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              keyExtractor={(ee) => ee._id + ''}
              renderItem={({item, index}) => {
                let isCommentIsLiked = state.commentLikesArr.includes(item?._id);
                return (
                  <>
                    {index === 0 && postData ? (
                      <View style={{paddingBottom: RFValue(20)}}>
                        <PostCard
                          // goBack={() => navigation.goBack()}
                          item={postData}
                          navigation={navigation}
                          startPlaying={state.focused}
                          controls={true}
                        />
                      </View>
                    ) : null}

                    {renderCommentView(item, isCommentIsLiked, index, index)}
                    {state?.replies?._id === item?._id
                      ? state?.replies?.data.map((ittem, inndex) => {
                          let isReplyIsLiked = state.commentLikesArr.includes(ittem._id);
                          return (
                            <View key={`${inndex}key`} style={{}}>
                              {renderCommentView(ittem, isReplyIsLiked, inndex, index)}
                            </View>
                          );
                        })
                      : null}
                  </>
                );
              }}
            />
          </KeyboardAvoidingView>
          {/* {editModal ? (
            <EditComment
              item={editComment}
              editModal={editModal}
              showEditModal={showEditModal}
              navigation={navigation}
            />
          ) : null} */}
          <AppInputMention
            placeholder={state.parentID?.createdBy?.userName ? '@' + state.parentID?.createdBy?.userName : ''}
            LHeight={state.LHeight}
            removeTag={() => {
              setState((prev) => ({...prev, parentID: ''}));
            }}
            editModal={editModal}
            editComment={editComment}
            onSend={(msg, selectedContent) => {
              let mention = selectedContent?.map((item, index) => {
                return item.id;
              });
              let alreadMention = editComment?.mentions?.filter((item) => msg.includes(item.userName));
              alreadMention = alreadMention?.map((item, index) => {
                return item._id;
              });
              if (editModal) {
                CommentEdit(
                  (newCommentRes) => {
                    showEditModal(!editModal);
                    if (newCommentRes) {
                      getcommentshelper();
                      if (state.parentID?.parentComment || state.parentID?._id)
                        getcommentreplieshelper(state.parentID?.parentComment || state.parentID?._id);
                    }
                    if (state.comments?.length > 0) ScrollToSpecificIndex(state.currentIndex || 0);
                    setState((prev) => ({
                      ...prev,
                      parentID: '',
                      currentIndex: 0,
                      replies: {_id: '', data: []},
                    }));
                    getsinglepostbyidhelper();
                  },
                  state.parentID?.parentComment || state.parentID?._id
                    ? {
                        mentions: alreadMention.concat(mention),
                        parentComment: state.parentID?.parentComment || state.parentID?._id,
                        text: msg,
                        post: postData._id,
                        id: editComment._id,
                      }
                    : {
                        id: editComment._id,
                        text: msg,
                        post: postData._id,
                        mentions: alreadMention.concat(mention),
                      },
                );
              } else {
                CommentPost(
                  (newCommentRes) => {
                    if (newCommentRes) {
                      getcommentshelper();
                      if (state.parentID?.parentComment || state.parentID?._id)
                        getcommentreplieshelper(state.parentID?.parentComment || state.parentID?._id);
                    }
                    if (state.comments?.length > 0) ScrollToSpecificIndex(state.currentIndex || 0);
                    setState((prev) => ({
                      ...prev,
                      parentID: '',
                      currentIndex: 0,
                    }));
                    getsinglepostbyidhelper();
                  },
                  state.parentID?.parentComment || state.parentID?._id
                    ? {
                        mentions: mention,
                        parentComment: state.parentID?.parentComment || state.parentID?._id,
                        text: msg,
                        post: postData._id,
                      }
                    : {
                        text: msg,
                        post: postData._id,
                        mentions: mention,
                      },
                );
              }
              Keyboard.dismiss();
            }}
          />
        </>
      )}

      {state.loading ? <AppLoadingView /> : null}
    </View>
  );
};

export {PostDetailScreenWithComments};
