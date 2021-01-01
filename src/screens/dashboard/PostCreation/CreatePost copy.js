

import React, { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppButton, AppFriendsListModal, AppModal, AppRadioButton, AppText, AppVideoPlayer, UserAvatar } from '../../../components';
import { AppTheme } from '../../../config';
import { AppLogger, CapitalizeFirstLetter, stringifyNumber } from '../../../utils/AppHelperMethods';
import { AntDesign, EvilIcons, FontAwesome, Fontisto, Ionicons, MaterialCommunityIcons } from '../../../utils/AppIcons';
import { OpenCameraGalleryPromptPicker } from '../../../utils/AppMediaPicker';
const BOXES_SIZE = RFValue(80);
const CreatePost = ({ navigation, route }) => {
    let [state, setState] = useState({
        loading: false,
        whatsNewText: '',
        showPrivacyOptions: false,
        showTagFriends: false,
        postTypeIsPool: false,

        privacy: 'Public',
        selectedMedia: null,
        answersArr: ['', ''],

        chosenContacts: [],
        showFriendsListModal: false,
    })

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>

            <AntDesign onPress={() => navigation.goBack()} name={"close"} style={{ fontSize: RFValue(30), color: 'white', padding: RFValue(15) }} />

            <KeyboardAvoidingScrollView style={{}} contentContainerStyle={{ flex: 1, padding: RFValue(14) }}>
                <View style={{ flexDirection: 'row' }}>
                    <UserAvatar size={30} />
                    <TextInput placeholder={state.postTypeIsPool ? "Ask a question" : "What's new?"}
                        placeholderTextColor={AppTheme.colors.lightGrey}
                        multiline={true}
                        style={{ flex: 1, color: 'white', height: '100%', marginLeft: RFValue(10) }}
                        onChangeText={(val) => { setState(prev => ({ ...prev, whatsNewText: val })) }}
                    />
                </View>

                {state.postTypeIsPool ?
                    <View style={{ padding: RFValue(10) }}>
                        {state.answersArr.map((item, index) => (
                            <View key={`${index}key`} style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(10) }}>
                                <AppRadioButton size={15} val={false} onPress={() => { }} />
                                <TextInput placeholder={CapitalizeFirstLetter(stringifyNumber(index) || '') + " answer"}
                                    value={state.answersArr[index]}
                                    placeholderTextColor={AppTheme.colors.lightGrey}
                                    style={{ flex: 1, color: 'white', height: '100%', marginLeft: RFValue(10) }}
                                    onChangeText={(val) => {
                                        setState(prev => {
                                            let array = prev.answersArr
                                            array[index] = val
                                            return { ...prev, answersArr: array }
                                        })
                                        AppLogger('', state.answersArr)
                                    }}
                                />
                                {index !== 0 && index !== 1 ?
                                    <AntDesign onPress={() => {
                                        let tempAnsArr = state.answersArr;
                                        tempAnsArr.splice(index, 1);
                                        setState(prev => ({ ...prev, answersArr: tempAnsArr }))
                                    }} name={"close"} style={{ fontSize: RFValue(25), color: 'white', }} />
                                    : null}
                            </View>
                        ))}
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            // if (state.answersArr[state.answersArr.length - 1]) {
                            let tempAnsArr = state.answersArr;
                            tempAnsArr.push('');
                            setState(prev => ({ ...prev, answersArr: tempAnsArr }))
                            // } else {
                            //     AppShowToast("Provide missing answer before adding new one")
                            // }
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(10) }}>
                                <Ionicons name="add" style={{ fontSize: RFValue(25), color: state.answersArr[state.answersArr.length - 1] ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                                <AppText size={1} color={state.answersArr[state.answersArr.length - 1] ? 'white' : AppTheme.colors.lightGrey} > New answer</AppText>
                            </View>
                        </TouchableOpacity>

                        <AppText size={2} color={AppTheme.colors.lightGrey} style={{ textAlign: 'center', paddingTop: RFValue(10) }}>AVAILABLE: 1 WEEK</AppText>
                    </View>
                    : null}

                {state.selectedMedia && state.selectedMedia.uri ?
                    state.selectedMedia?.type === 'photo' ?
                        <FastImage source={state.selectedMedia} style={{ height: RFValue(300), width: '100%' }} resizeMode={'contain'} />
                        :
                        <View style={{ height: RFValue(300), width: '100%' }}>
                            <AppVideoPlayer source={state.selectedMedia} startPlaying={true} />
                        </View>
                    : null}


                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: RFValue(25) }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        OpenCameraGalleryPromptPicker((res) => {
                            AppLogger('', res)
                            if (res)
                                setState(prev => ({ ...prev, selectedMedia: res }))
                        }, 'camera')
                    }}>
                        <View style={[styles.boxContainerStyle, state.selectedMedia && state?.selectedMedia?.selectedFrom === 'camera' ? { borderColor: AppTheme.colors.primary } : null]}>
                            <AntDesign name="camerao" style={{ fontSize: RFValue(30), color: state?.selectedMedia?.selectedFrom === 'camera' ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        OpenCameraGalleryPromptPicker((res) => {
                            AppLogger('', res)
                            if (res)
                                setState(prev => ({ ...prev, selectedMedia: res }))
                        }, 'gallery')
                    }}>
                        <View style={[styles.boxContainerStyle, { marginHorizontal: RFValue(20) }, state.selectedMedia && state?.selectedMedia?.selectedFrom === 'gallery' ? { borderColor: AppTheme.colors.primary } : null]}>
                            <EvilIcons name="image" style={{ fontSize: RFValue(35), color: state.selectedMedia && state?.selectedMedia?.selectedFrom === 'gallery' ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, postTypeIsPool: !state.postTypeIsPool }))
                    }}>
                        <View style={[styles.boxContainerStyle, state.postTypeIsPool ? { borderColor: AppTheme.colors.primary } : null]}>
                            {state.postTypeIsPool ?
                                <Ionicons name="ios-newspaper-outline" style={{ fontSize: RFValue(30), color: state.postTypeIsPool ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                                :
                                <FontAwesome name="line-chart" style={{ fontSize: RFValue(30), color: AppTheme.colors.lightGrey }} />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingVertical: RFValue(20) }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        // setState(prev => ({ ...prev, showPrivacyOptions: true }))
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="map-marker-outline" style={{ fontSize: RFValue(25), color: 'white' }} />
                            <AppText size={1} color={"white"}> Location</AppText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, showPrivacyOptions: true }))
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Fontisto name="world-o" style={{ fontSize: RFValue(20), color: 'white' }} />
                            <AppText size={1} color={"white"}>  Privacy</AppText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, showPrivacyOptions: false, showFriendsListModal: true }))
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="target-account" style={{ fontSize: RFValue(25), color: 'white' }} />
                            <AppText size={1} color={"white"}>  Add tag</AppText>
                        </View>
                    </TouchableOpacity>
                </View>

                <AppButton bgColor="black" onPress={() => { }} label={"SHARE"} />
                <View style={{ margin: RFValue(30) }} />
            </KeyboardAvoidingScrollView>


            <AppModal show={state.showPrivacyOptions} type={"bottom"} toggle={() => setState(prev => ({ ...prev, showPrivacyOptions: false }))}>
                <View style={{ borderTopRightRadius: RFValue(10), borderTopLeftRadius: RFValue(10), backgroundColor: 'black', paddingBottom: RFValue(50) }}>

                    <View style={{ height: RFValue(3), width: RFValue(40), backgroundColor: AppTheme.colors.lightGrey, alignSelf: 'center', borderRadius: 20 }} />

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, privacy: 'Public', showPrivacyOptions: false }))
                    }}>
                        <View style={styles.modalListItemStyle}>
                            <Fontisto name="world-o" style={{ fontSize: RFValue(20), color: 'white', paddingRight: RFValue(10) }} />
                            <AppText size={2} style={{ flex: 1 }}>Public</AppText>
                            {state.privacy === 'Public' ?
                                <AntDesign name={"check"} style={{ fontSize: RFValue(20), color: AppTheme.colors.green }} />
                                : null}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, privacy: 'Only Friends', showPrivacyOptions: false }))
                    }}>
                        <View style={styles.modalListItemStyle}>
                            <Ionicons name="person-outline" style={{ fontSize: RFValue(20), color: 'white', paddingRight: RFValue(10) }} />
                            <AppText size={2} style={{ flex: 1 }}>Only Friends</AppText>
                            {state.privacy === 'Only Friends' ?
                                <AntDesign name={"check"} style={{ fontSize: RFValue(20), color: AppTheme.colors.green }} />
                                : null}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, privacy: 'Only me', showPrivacyOptions: false }))
                    }}>
                        <View style={styles.modalListItemStyle}>
                            <AntDesign name="lock1" style={{ fontSize: RFValue(20), color: 'white', paddingRight: RFValue(10) }} />
                            <AppText size={2} style={{ flex: 1 }}>Only me</AppText>
                            {state.privacy === 'Only me' ?
                                <AntDesign name={"check"} style={{ fontSize: RFValue(20), color: AppTheme.colors.green }} />
                                : null}
                        </View>
                    </TouchableOpacity>
                </View>
            </AppModal>

            <AppFriendsListModal show={state.showFriendsListModal} toggle={() => setState(prev => ({ ...prev, showFriendsListModal: false }))}
                chosenContacts={state.chosenContacts}
                selectedContacts={(contact) => {
                    let tempArr = state.chosenContacts;
                    if (tempArr.includes(contact.id)) {
                        let tempInd = tempArr.findIndex(ii => ii === contact.id)
                        if (tempInd >= 0) {
                            tempArr.splice(tempInd, 1)
                            setState(prev => ({ ...prev, chosenContacts: tempArr }))
                        }
                    } else {
                        tempArr.push(contact.id)
                        setState(prev => ({ ...prev, chosenContacts: tempArr }))
                    }
                }} />
        </View>
    );
};
const styles = StyleSheet.create({
    boxContainerStyle: { borderColor: AppTheme.colors.lightGrey, height: BOXES_SIZE, width: BOXES_SIZE, borderRadius: RFValue(15), borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    modalListItemStyle: { flexDirection: 'row', width: Dimensions.get('screen').width, alignItems: 'center', padding: RFValue(15) },
})
export { CreatePost };
