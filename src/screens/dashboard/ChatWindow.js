

import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_BLOCK, ICON_DELETE, ICON_MENU, ICON_MUTE, ICON_REPORT, ICON_UNFOLLOW } from '../../../assets/icons';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppBackButton, AppInputToolBar, AppLoadingView, AppModal, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { ActionsOnUsers, DeleteChat, GetChatMessages } from '../../services';
import { socket } from '../../services/socketService';
import { CHAT_SOCKET_EVENTS, FRIEND_STATUSES_ACTIONS } from '../../utils/AppConstants';
import { AppShowToast } from '../../utils/AppHelperMethods';
var uuid = require('react-native-uuid');

const LIGHT_GREY = '#4d4d4d'
const ICONSTYLE = { height: RFValue(30), width: RFValue(30), tintColor: 'white' };
const ChatWindow = ({ navigation, route, }) => {
    let friend = route?.params?.friend;

    let user = useSelector(state => state.root.user);

    const [messages, setMessages] = useState([]);
    let [state, setState] = useState({
        showMenu: false,
        loading: true,
        LHeight: 0,
        LWidth: 0
    })

    function getChatmsgeshelper() {
        GetChatMessages((messagesRes) => {
            setState(prev => ({ ...prev, loading: false }))
            if (messagesRes)
                setMessages(messagesRes)
        }, 0, friend?._id)
    }

    useEffect(() => {
        getChatmsgeshelper();

        let messagesListner = socket.on(CHAT_SOCKET_EVENTS.NEW_MESSAGE, msg => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
        });

        return () => {
            messagesListner.removeListener(CHAT_SOCKET_EVENTS.NEW_MESSAGE);
        }
    }, [])

    const onSend = (val) => {
        if (val.trim()) {
            let guidd = uuid.v1();
            let new_message = {
                guid: guidd,
                text: val.trim(),
                message: val.trim(),
                createdAt: new Date(),
                to: friend?._id || ''
            }
            socket.emit(CHAT_SOCKET_EVENTS.NEW_MESSAGE, new_message);
        }
    }

    const renderInputToolbar = (props) => <AppInputToolBar chat={true} LHeight={state.LHeight} onSend={(msg) => { onSend(msg) }} />;

    const renderBubble = (props) => {
        return (<Bubble {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: LIGHT_GREY,
                },
                right: {
                    backgroundColor: 'black'
                }
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
        )
    }
    function renderTicks(currentMessage) {
        const tickedUser = currentMessage.user._id
        return (

            <View>
                {!currentMessage.sent && false && tickedUser === user?._id && (<Text style={{ color: AppTheme.colors.primary, paddingRight: 10 }}>✓✓</Text>)}
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1, backgroundColor: 'black' }}
                onLayout={(event) => {
                    var { x, y, width, height } = event.nativeEvent.layout;
                    setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: LIGHT_GREY }}>
                    <AppBackButton navigation={navigation} />
                    <UserAvatar onPress={() => {
                        navigation.push("UserProfileScreen", { userID: friend?._id })
                    }} source={friend?.pic ? { uri: friend?.pic } : DEFAULT_USER_PIC} size={35} />
                    <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <AppText bold={true} size={1} color={'white'}>{friend.firstName || friend?.userName}</AppText>
                            <IsUserVerifiedCheck check={friend?.isVerified} />
                            <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{friend.earnedXps}</AppText>
                            {/* <AppText size={1} color={AppTheme.colors.lightGrey}> - 4 h</AppText> */}

                        </View>
                        <AppText size={1} color={'white'} >{friend?.userName || friend?.firstName}</AppText>
                    </View>
                    <TouchableOpacity
                        style={{ paddingHorizontal: RFValue(10) }}
                        onPress={() => setState(prev => ({ ...prev, showMenu: !state.showMenu }))}>
                        <Image source={ICON_MENU} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, backgroundColor: '#1b1b1b', paddingBottom: RFValue(50) }}>
                    <GiftedChat
                        messages={messages}
                        renderTicks={renderTicks}
                        showUserAvatar={false}
                        renderInputToolbar={renderInputToolbar}
                        showAvatarForEveryMessage={false}
                        renderBubble={renderBubble}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: user?._id,
                            avatar: user?.pic,
                            name: user?.userName,
                        }}
                    />
                    {state.loading ?
                        <AppLoadingView />
                        : null}
                </View>

                <AppModal show={state.showMenu} type="bottom" toggle={() => setState(prev => ({ ...prev, showMenu: false }))}>
                    <View style={{ borderTopRightRadius: RFValue(10), borderTopLeftRadius: RFValue(10), backgroundColor: 'black', paddingBottom: RFValue(50) }}>

                        <View style={{ height: RFValue(3), width: RFValue(40), backgroundColor: AppTheme.colors.lightGrey, alignSelf: 'center', borderRadius: 20 }} />

                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            Alert.alert(
                                "Delete conversation",
                                "Are you sure to delete your conversation with " + friend?.userName,
                                [{
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                }, {
                                    text: "DELETE", onPress: () => {
                                        setState(prev => ({ ...prev, showMenu: false, loading: true }))
                                        DeleteChat(() => {
                                            setMessages([])
                                            setState(prev => ({ ...prev, loading: false }))
                                        }, friend?.chatId)
                                    }
                                }], { cancelable: false });
                        }}>
                            <View style={styles.modalListItemStyle}>
                                <Image source={ICON_DELETE} style={ICONSTYLE} />
                                <AppText size={2} style={{ paddingLeft: RFValue(10) }}>Delete conversation</AppText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => {

                        }}>
                            <View style={styles.modalListItemStyle}>
                                <Image source={ICON_REPORT} style={ICONSTYLE} />
                                <AppText size={2} style={{ paddingLeft: RFValue(10) }}>Report...</AppText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => {

                        }}>
                            <View style={styles.modalListItemStyle}>
                                <Image source={ICON_MUTE} style={ICONSTYLE} />
                                <AppText size={2} style={{ paddingLeft: RFValue(10) }}>Mute</AppText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => {

                        }}>
                            <View style={styles.modalListItemStyle}>
                                <Image source={ICON_UNFOLLOW} style={ICONSTYLE} />
                                <AppText size={2} style={{ paddingLeft: RFValue(10) }}>Unfollow</AppText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            Alert.alert("Block", "Are you sure to block " + friend?.userName + "?",
                                [{
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                }, {
                                    text: "OK", onPress: () => {
                                        ActionsOnUsers(() => {
                                            AppShowToast((friend?.userName || 'User') + ' has been blocked.')
                                        }, friend?._id, FRIEND_STATUSES_ACTIONS.BLOCKED)
                                    }
                                }], { cancelable: false });
                        }}>
                            <View style={styles.modalListItemStyle}>
                                <Image source={ICON_BLOCK} style={ICONSTYLE} />
                                <AppText size={2} style={{ paddingLeft: RFValue(10) }}>Block</AppText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </AppModal>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalListItemStyle: { flexDirection: 'row', width: Dimensions.get('screen').width, alignItems: 'center', padding: RFValue(10), alignItems: 'center' },
})
export { ChatWindow };
