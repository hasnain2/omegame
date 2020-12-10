

import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_BLOCK, ICON_DELETE, ICON_MENU, ICON_MUTE, ICON_REPORT, ICON_UNFOLLOW } from '../../../assets/icons';
import { AppBackButton, AppInputToolBar, AppModal, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
const LIGHT_GREY = '#4d4d4d'
const ICONSTYLE = { height: RFValue(30), width: RFValue(30), tintColor: 'white' };
const ChatWindow = ({ navigation, route, }) => {
    const [messages, setMessages] = useState([]);
    let [state, setState] = useState({
        showMenu: false,
        LHeight: 0,
        LWidth: 0
    })
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = (val) => {
        if (val) {
            let new_message = {
                _id: Math.random(),
                text: val,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, new_message))
        }
    }

    const renderInputToolbar = (props) => state.LHeight ? <AppInputToolBar chat={true} LHeight={state.LHeight} onSend={(msg) => { onSend(msg) }} /> : <AppInputToolBar chat={true} LHeight={state.LHeight} onSend={(msg) => { onSend(msg) }} />;

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flex: 1, backgroundColor: 'black' }}
                onLayout={(event) => {
                    var { x, y, width, height } = event.nativeEvent.layout;
                    setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: LIGHT_GREY }}>
                    <AppBackButton navigation={navigation} />
                    <UserAvatar size={35} />
                    <View style={{ flex: 1, paddingLeft: RFValue(10) }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <AppText bold={true} size={1} color={'white'}>Username</AppText>
                            <IsUserVerifiedCheck check={true} />
                            <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>1123</AppText>
                            <AppText size={1} color={AppTheme.colors.lightGrey}> - 4 h</AppText>

                        </View>
                        <AppText size={1} color={'white'} >Nick Name</AppText>
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
                        showUserAvatar={false}
                        renderInputToolbar={renderInputToolbar}
                        showAvatarForEveryMessage={false}
                        renderBubble={renderBubble}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                    />
                </View>

                <AppModal show={state.showMenu} type="bottom" toggle={() => setState(prev => ({ ...prev, showMenu: false }))}>
                    <View style={{ borderTopRightRadius: RFValue(10), borderTopLeftRadius: RFValue(10), backgroundColor: 'black', paddingBottom: RFValue(50) }}>

                        <View style={{ height: RFValue(3), width: RFValue(40), backgroundColor: AppTheme.colors.lightGrey, alignSelf: 'center', borderRadius: 20 }} />

                        <TouchableOpacity activeOpacity={0.7} onPress={() => {

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
