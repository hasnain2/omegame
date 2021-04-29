import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Bubble, GiftedChat, Time, InputToolbar, Send} from 'react-native-gifted-chat';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {
  ICON_BLOCK,
  ICON_DELETE,
  ICON_MENU,
  ICON_MUTE,
  ICON_REPORT,
  ICON_UNFOLLOW,
} from '../../../assets/icons';
import {DEFAULT_USER_PIC} from '../../../assets/images';
import {
  AppBackButton,
  AppInputToolBar,
  AppLoadingView,
  AppModal,
  AppText,
  IsUserVerifiedCheck,
} from '../../components';
import {UserAvatar} from '../../components/UserAvatar';
import {AppTheme} from '../../config';
import {
  ActionsOnUsers,
  DeleteChat,
  GetChatMessages,
  GetSingleUserProfile,
  MuteChatOfSpecificUser,
} from '../../services';
import {socket} from '../../services/socketService';
import {
  CHAT_SOCKET_EVENTS,
  FRIEND_STATUSES_ACTIONS,
} from '../../utils/AppConstants';
import {AppLogger, AppShowToast, getChatId} from '../../utils/AppHelperMethods';
import {BlurView} from '@react-native-community/blur';
var uuid = require('react-native-uuid');

const LIGHT_GREY = '#4d4d4d';
const ICONSTYLE = {height: RFValue(30), width: RFValue(30), tintColor: 'white'};
const ChatWindow = ({navigation, route}) => {
  const [friend, setFriend] = useState(route?.params?.friend);

  const {user} = useSelector((state) => state.root);
  let chatID = getChatId(user?._id, friend?._id);
  friend['chatId'] = chatID;
  const [messages, setMessages] = useState([]);
  let [state, setState] = useState({
    showMenu: false,
    loading: true,
    LHeight: 0,
    LWidth: 0,
    showBlur: false,
  });
  function getChatmsgeshelper() {
    GetChatMessages(
      (messagesRes) => {
        setState((prev) => ({...prev, loading: false}));
        if (messagesRes) setMessages(messagesRes);
      },
      0,
      route?.params?.friend?._id,
    );
  }
  const getsingleUserprofile = () => {
    GetSingleUserProfile((profileRes) => {
      if (profileRes) setFriend({chatId: chatID, ...profileRes});
    }, friend?._id);
  };
  useEffect(() => {
    getChatmsgeshelper();
    getsingleUserprofile();
    let messagesListner = socket.on(CHAT_SOCKET_EVENTS.NEW_MESSAGE, (msg) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg),
      );
    });

    socket.emit(CHAT_SOCKET_EVENTS.CONNECTED_WITH, {
      connectWith: route?.params?.friend?._id,
    });

    return () => {
      socket.emit(CHAT_SOCKET_EVENTS.CONNECTED_WITH, {connectWith: ''});
      messagesListner.removeListener(CHAT_SOCKET_EVENTS.NEW_MESSAGE);
    };
  }, []);

  const onSend = (val) => {
      let guidd = uuid.v1();
      let new_message = {
        guid: guidd,
        text: val[0].text,
        message: val[0].text,
        createdAt: new Date(),
        to: friend?._id || '',
      };
      socket.emit(CHAT_SOCKET_EVENTS.NEW_MESSAGE, new_message);
  };

  const renderInputToolbar = (props) => (
    <InputToolbar {...props} containerStyle={{ borderTopWidth: 1,backgroundColor: 'black',borderBottomWidth: 1,
    borderBottomColor: 'white',borderRightWidth:1,borderRightColor: "white",borderLeftWidth:1, borderLeftColor:'white',
    borderTopColor: 'white', borderRadius: 50,marginRight: RFValue(6), marginLeft: RFValue(14)}} 
    textInputStyle={{ color: "white", paddingLeft: RFValue(12)}} />
  );
  const renderSend=(props)=> {
    return (
      <Send {...props} containerStyle={{border: '0', justifyContent: "center", height: "100%"}}>
        <AppText color={AppTheme.colors.primary} size={2}
        bold={true} style={{marginRight: RFValue(10), marginLeft: RFValue(4)}} >SEND</AppText>
        
      </Send>
    );
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: LIGHT_GREY,
          },
          right: {
            backgroundColor: 'black',
          },
        }}
        textProps={{
          style: {
            color: props.position === 'left' ? 'white' : 'white',
          },
        }}
        textStyle={{
          left: {
            color: 'white',
          },
          right: {
            color: 'white',
          },
        }}
      />
    );
  };
  const renderTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: 'gray',
          },
          right: {
            color: 'gray',
          },
        }}
      />
    );
  };
  function renderTicks(currentMessage) {
    const tickedUser = currentMessage.user._id;
    return (
      <View>
        {!currentMessage.sent && false && tickedUser === user?._id && (
          <Text style={{color: AppTheme.colors.primary, paddingRight: 10}}>
            ✓✓
          </Text>
        )}
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{flex: 1, backgroundColor: 'black'}}
        onLayout={(event) => {
          var {x, y, width, height} = event.nativeEvent.layout;
          setState((prev) => ({...prev, LHeight: height, LWidth: width}));
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: LIGHT_GREY,
            height: RFValue(56),
          }}>
          <AppBackButton navigation={navigation} />
          <UserAvatar
            corner={friend?.corner || ''}
            color={friend?.cornerColor}
            onPress={() => {
              if (friend?._id)
                navigation.push('UserProfileScreen', {userID: friend?._id});
            }}
            source={friend?.pic ? {uri: friend?.pic} : DEFAULT_USER_PIC}
            size={35}
          />
          <View style={{flex: 1, paddingLeft: RFValue(10)}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AppText bold={true} size={1} color={'white'}>
                {friend.firstName || friend?.userName}
              </AppText>
              <IsUserVerifiedCheck check={friend?.isVerified} />
              <AppText
                size={1}
                bold={true}
                color={AppTheme.colors.primary}
                style={{paddingLeft: RFValue(5)}}>
                {friend.level}
              </AppText>
              {/* <AppText size={1} color={AppTheme.colors.lightGrey}> - 4 h</AppText> */}
            </View>
            <AppText size={1} color={'white'}>
              {friend?.userName || friend?.firstName}
            </AppText>
          </View>
          <TouchableOpacity
            style={{paddingHorizontal: RFValue(10)}}
            onPress={() =>
              setState((prev) => ({
                ...prev,
                showMenu: !state.showMenu,
                showBlur: !state.showBlur,
              }))
            }>
            <Image
              source={ICON_MENU}
              style={{
                height: RFValue(30),
                width: RFValue(30),
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: '#1C1C22',
            paddingLeft: RFValue(16),
            paddingRight: RFValue(16),
          }}>
          <GiftedChat
            messages={messages}
            renderTicks={renderTicks}
            renderInputToolbar={renderInputToolbar}
            minInputToolbarHeight={RFValue(80)}
            showAvatarForEveryMessage={true}
            renderBubble={renderBubble}
            renderTime={renderTime}
            renderAvatar={() => null}
            renderSend={renderSend}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: user?._id,
              avatar: user?.pic,
              name: user?.userName,
            }}
          />
          {state.loading ? <AppLoadingView /> : null}
        </View>
        {state.showBlur ? (
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            reducedTransparencyFallbackColor="gray"
            blurType="light"
            blurAmount={1}
          />
        ) : null}
        <AppModal
          show={state.showMenu}
          shadow={true}
          type="bottom"
          toggle={() =>
            setState((prev) => ({...prev, showMenu: false, showBlur: false}))
          }>
          <View
            style={{
              borderTopRightRadius: RFValue(10),
              borderTopLeftRadius: RFValue(10),
              backgroundColor: 'black',
              paddingBottom: RFValue(50),
            }}>
            <View
              style={{
                height: RFValue(3),
                width: RFValue(40),
                backgroundColor: AppTheme.colors.lightGrey,
                alignSelf: 'center',
                borderRadius: 20,
              }}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                Alert.alert(
                  'Delete conversation',
                  'Are you sure to delete your conversation with ' +
                    friend?.userName,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => AppLogger('', 'Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'DELETE',
                      onPress: () => {
                        setState((prev) => ({
                          ...prev,
                          showMenu: false,
                          loading: true,
                        }));
                        DeleteChat(() => {
                          setMessages([]);
                          setState((prev) => ({...prev, loading: false}));
                        }, friend?.chatId);
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <View style={styles.modalListItemStyle}>
                <Image source={ICON_DELETE} style={ICONSTYLE} />
                <AppText size={2} style={{paddingLeft: RFValue(10)}}>
                  Delete conversation
                </AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setState((prev) => ({
                  ...prev,
                  showMenu: false,
                  loading: false,
                }));
                navigation.navigate('ReportAbuseOrSpam', {userID: friend?._id});
              }}>
              <View style={styles.modalListItemStyle}>
                <Image source={ICON_REPORT} style={ICONSTYLE} />
                <AppText size={2} style={{paddingLeft: RFValue(10)}}>
                  Report...
                </AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setState((prev) => ({
                  ...prev,
                  showMenu: false,
                  loading: false,
                }));
                MuteChatOfSpecificUser(
                  () => {},
                  friend?._id,
                  `${friend.isChatMuted ? 'false' : 'true'}`,
                );
                let tempFriend = {...friend};
                tempFriend.isChatMuted = !tempFriend.isChatMuted;
                setFriend(tempFriend);
              }}>
              <View style={styles.modalListItemStyle}>
                <Image source={ICON_MUTE} style={ICONSTYLE} />
                <AppText size={2} style={{paddingLeft: RFValue(10)}}>
                  {friend?.isChatMuted ? 'Unmute' : 'Mute'}
                </AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setState((prev) => ({
                  ...prev,
                  showMenu: false,
                  loading: false,
                }));
                ActionsOnUsers(
                  () => {},
                  friend?._id,
                  friend.isFollowing
                    ? FRIEND_STATUSES_ACTIONS.UNFOLLOW
                    : friend.isRequested
                    ? FRIEND_STATUSES_ACTIONS.CANCEL_FOLLOW_REQUEST
                    : FRIEND_STATUSES_ACTIONS.FOLLOW,
                );
                let tempFriend = {...friend};
                if (tempFriend?.isRequested) {
                  tempFriend.isFollowing = false;
                  tempFriend.isRequested = false;
                } else {
                  tempFriend.isRequested = true;
                }

                setFriend(tempFriend);
              }}>
              <View style={styles.modalListItemStyle}>
                <Image source={ICON_UNFOLLOW} style={ICONSTYLE} />
                <AppText size={2} style={{paddingLeft: RFValue(10)}}>
                  {friend?.isFollowing
                    ? 'Unfollow'
                    : friend?.isRequested
                    ? 'Requested'
                    : 'Follow'}
                </AppText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                Alert.alert(
                  'Block',
                  'Are you sure to block ' + friend?.userName + '?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => AppLogger('', 'Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        ActionsOnUsers(
                          () => {
                            setState((prev) => ({...prev, showMenu: false}));
                            navigation.goBack();
                            AppShowToast(
                              (friend?.userName || 'User') +
                                ' has been blocked.',
                            );
                          },
                          friend?._id,
                          FRIEND_STATUSES_ACTIONS.BLOCKED,
                        );
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <View style={styles.modalListItemStyle}>
                <Image source={ICON_BLOCK} style={ICONSTYLE} />
                <AppText size={2} style={{paddingLeft: RFValue(10)}}>
                  Block
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        </AppModal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalListItemStyle: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    padding: RFValue(10),
    alignItems: 'center',
  },
});
export {ChatWindow};
