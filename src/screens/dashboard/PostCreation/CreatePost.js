

import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ICON_IMAGE, ICON_LOCATION, ICON_ONLY_FRIENDS, ICON_PHOTO, ICON_POLL, ICON_PRIVATE, ICON_PUBLIC, ICON_TAG, ICON_TEXT } from '../../../../assets/icons';
import { DEFAULT_USER_PIC } from '../../../../assets/images';
import { AppButton, AppFriendsListModal, AppGallery, AppGooglePlacesAutoFill, AppModal, AppRadioButton, AppText, AppVideoPlayer, UserAvatar } from '../../../components';
import { AppTheme } from '../../../config';
import { setFriends } from '../../../redux/reducers/friendsSlice';
import { store } from '../../../redux/store';
import { AddPostToReduxStore, CreatePostService, GerUserListByType, requestReadWritePermission } from '../../../services';
import { GET_FRIEND_LIST_TYPES, PRIVACY } from '../../../utils/AppConstants';
import { AppShowToast, CapitalizeFirstLetter, stringifyNumber } from '../../../utils/AppHelperMethods';
import { AntDesign, Ionicons } from '../../../utils/AppIcons';
import { OpenCameraGalleryPromptPicker } from '../../../utils/AppMediaPicker';
const BOXES_SIZE = RFValue(80);
const CreatePost = ({ navigation, route }) => {

    let [state, setState] = useState({
        loading: false,
        whatsNewText: '',
        postTypeIsPool: false,

        privacy: 'Public',
        selectedMedia: null,
        answersArr: ['', ''],
        location: null,
        chosenContacts: [],
        friendList: [],

        showGallery: false,
        showPrivacyOptions: false,
        showTagFriends: false,
        showLocationPicker: false,
        showFriendsListModal: false,
    })

    function getfriendshelper(cursor) {
        GerUserListByType((response) => {
            if (response) {
                store.dispatch(setFriends(response))
                setState(prev => ({ ...prev, loading: false }));
            } else
                setState(prev => ({ ...prev, loading: false }));
        }, store.getState().root.user?._id, GET_FRIEND_LIST_TYPES.FRIEND)
    }
    useEffect(() => {
        requestReadWritePermission();
        getfriendshelper();
    }, [])
    let user = useSelector(state => state.root.user)
    const onSubmit = () => {
        if (state.whatsNewText) {
            let payload = {
                hashTags: [],
                privacy: PRIVACY.find(ii => ii.name === state.privacy)?.key || 'PUBLIC',
                tagged: state.chosenContacts.map(ii => ii?._id),
                text: state.whatsNewText,
                file: state.selectedMedia || false,
            }
            if (state.location)
                payload["location"] = state.location
            setState(prev => ({ ...prev, loading: true }))
            CreatePostService((result) => {
                setState(prev => ({ ...prev, loading: false }))
                if (result) {
                    if (result.data)
                        AddPostToReduxStore(result?.data)
                    AppShowToast("Post created successfully");
                    navigation.goBack();
                }
            }, payload)
        } else {
            AppShowToast("Please provide post description")
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>

            <View style={{ width: RFValue(70) }}>
                <AntDesign onPress={() => navigation.goBack()} name={"close"} style={{ fontSize: RFValue(30), color: 'white', padding: RFValue(15) }} />
            </View>
            <KeyboardAvoidingScrollView nestedScrollEnabled={true} style={{ flex: 1, padding: RFValue(14) }}>
                <View style={{ flexDirection: 'row' }}>
                    <UserAvatar source={user.pic ? { uri: user.pic } : DEFAULT_USER_PIC} size={30} />
                    <TextInput placeholder={state.postTypeIsPool ? "Ask a question" : "What's new?"}
                        placeholderTextColor={AppTheme.colors.lightGrey}
                        multiline={true}
                        blurOnSubmit={true}
                        style={{ flex: 1, color: 'white', height: '100%', maxHeight: RFValue(150), marginLeft: RFValue(10) }}
                        onChangeText={(val) => { setState(prev => ({ ...prev, whatsNewText: val })) }}
                    />
                </View>
                {state.postTypeIsPool ?
                    <View style={{ padding: RFValue(10) }}>
                        {state.answersArr.map((item, index) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(10) }}>
                                <AppRadioButton size={15} val={false} onPress={() => { }} />
                                <TextInput placeholder={CapitalizeFirstLetter(stringifyNumber(index) || '') + " answer"}
                                    value={state.answersArr[index]}
                                    blurOnSubmit={true}
                                    placeholderTextColor={AppTheme.colors.lightGrey}
                                    style={{ flex: 1, color: 'white', height: '100%', marginLeft: RFValue(10) }}
                                    onChangeText={(val) => {
                                        setState(prev => {
                                            let array = prev.answersArr
                                            array[index] = val
                                            return { ...prev, answersArr: array }
                                        })
                                        console.log(state.answersArr)
                                    }}
                                />
                                {index != 0 && index != 1 ?
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
                        <Image source={{ uri: state.selectedMedia.uri }} style={{ height: RFValue(300), width: '100%', marginTop: RFValue(15) }} resizeMode={'cover'} />
                        :
                        <View style={{ height: RFValue(300), width: '100%', marginTop: RFValue(15) }}>
                            <AppVideoPlayer source={state.selectedMedia} startPlaying={!state.showGallery} />
                        </View>
                    : null}


                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: RFValue(25) }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        OpenCameraGalleryPromptPicker((res) => {
                            console.log('====================PICKER-=----------->\n', res)
                            if (res)
                                setState(prev => ({ ...prev, selectedMedia: res }))
                        }, 'camera')
                    }}>
                        <View style={[styles.boxContainerStyle, state.selectedMedia && state?.selectedMedia?.selectedFrom === 'camera' ? { borderColor: AppTheme.colors.primary } : null]}>
                            <Image source={ICON_PHOTO} style={{ height: RFValue(40), width: RFValue(40), tintColor: state?.selectedMedia?.selectedFrom === 'camera' ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        // OpenCameraGalleryPromptPicker((res) => {
                        //     console.log(res)
                        //     if (res)
                        //         setState(prev => ({ ...prev, selectedMedia: res }))
                        // }, 'gallery')
                        setState(prev => ({ ...prev, showGallery: true }))
                    }}>
                        <View style={[styles.boxContainerStyle, { marginHorizontal: RFValue(20) }, state.selectedMedia && state?.selectedMedia?.selectedFrom === 'gallery' ? { borderColor: AppTheme.colors.primary } : null]}>
                            <Image source={ICON_IMAGE} style={{ height: RFValue(40), width: RFValue(40), tintColor: state.selectedMedia && state?.selectedMedia?.selectedFrom === 'gallery' ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        // setState(prev => ({ ...prev, postTypeIsPool: !state.postTypeIsPool }))
                        AppShowToast('Pool feature comming soon')
                    }}>
                        <View style={[styles.boxContainerStyle, state.postTypeIsPool ? { borderColor: AppTheme.colors.primary } : null]}>
                            {state.postTypeIsPool ?
                                <Image source={ICON_TEXT} style={{ height: RFValue(40), width: RFValue(40), tintColor: state.postTypeIsPool ? AppTheme.colors.primary : AppTheme.colors.lightGrey }} />
                                :
                                <Image source={ICON_POLL} style={{ height: RFValue(40), width: RFValue(40), tintColor: AppTheme.colors.lightGrey }} />
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingVertical: RFValue(20) }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, showLocationPicker: true }))
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={ICON_LOCATION} style={{ height: RFValue(25), width: RFValue(25), tintColor: 'white' }} />
                            <AppText size={1} color={"white"}> Location</AppText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, showPrivacyOptions: true }))
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={state.privacy === 'Public' ? ICON_PUBLIC : state.privacy === 'Only Friends' ? ICON_ONLY_FRIENDS : ICON_PRIVATE} style={{ height: RFValue(25), width: RFValue(25), tintColor: 'white' }} />
                            <AppText size={1} color={"white"}>  Privacy</AppText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, showPrivacyOptions: false, showFriendsListModal: true }))
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={ICON_TAG} style={{ height: RFValue(25), width: RFValue(25), tintColor: 'white' }} />
                            <AppText size={1} color={"white"}>  Add tag</AppText>
                        </View>
                    </TouchableOpacity>
                </View>

                {state.location?.addressName ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: RFValue(20) }}>
                        <Image source={ICON_LOCATION} style={{ height: RFValue(20), width: RFValue(20), tintColor: 'white', marginRight: RFValue(5) }} />
                        <AppText size={0} >{(state.location?.addressName || state.location?.streetAddress || "")}</AppText>
                    </View>
                    : null}

                {state.chosenContacts && state.chosenContacts?.length > 0 ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: RFValue(20) }}>
                        <Image source={ICON_TAG} style={{ height: RFValue(20), width: RFValue(20), tintColor: 'white', marginRight: RFValue(5) }} />
                        <AppText size={0} color={AppTheme.colors.primary} >{state.chosenContacts.map((iii, inndex) => (iii.userName + ", "))}</AppText>
                    </View>
                    : null}

                <View style={{ margin: RFValue(20) }} />
                <AppButton
                    loading={state.loading}
                    bgColor="black" onPress={() => {
                        onSubmit()
                    }} label={"SHARE"} />
                <View style={{ margin: RFValue(30) }} />

            </KeyboardAvoidingScrollView>

            <AppGooglePlacesAutoFill show={state.showLocationPicker}
                onChangeValue={(val) => {
                    setState(prev => ({ ...prev, location: val }))
                }}
                toggle={() => setState(prev => ({ ...prev, showLocationPicker: false }))} />

            <AppModal show={state.showPrivacyOptions} type={"bottom"} toggle={() => setState(prev => ({ ...prev, showPrivacyOptions: false }))}>
                <View style={{ borderTopRightRadius: RFValue(10), borderTopLeftRadius: RFValue(10), backgroundColor: 'black', paddingBottom: RFValue(50) }}>

                    <View style={{ height: RFValue(3), width: RFValue(40), backgroundColor: AppTheme.colors.lightGrey, alignSelf: 'center', borderRadius: 20 }} />

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, privacy: 'Public', showPrivacyOptions: false }))
                    }}>
                        <View style={styles.modalListItemStyle}>
                            <Image source={ICON_PUBLIC} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                            <AppText size={2} style={{ flex: 1, paddingLeft: RFValue(5) }}>Public</AppText>
                            {state.privacy === 'Public' ?
                                <AntDesign name={"check"} style={{ fontSize: RFValue(20), color: AppTheme.colors.green }} />
                                : null}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, privacy: 'Only Friends', showPrivacyOptions: false }))
                    }}>
                        <View style={styles.modalListItemStyle}>
                            <Image source={ICON_ONLY_FRIENDS} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                            <AppText size={2} style={{ flex: 1, paddingLeft: RFValue(5) }}>Only Friends</AppText>
                            {state.privacy === 'Only Friends' ?
                                <AntDesign name={"check"} style={{ fontSize: RFValue(20), color: AppTheme.colors.green }} />
                                : null}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, privacy: 'Only me', showPrivacyOptions: false }))
                    }}>
                        <View style={styles.modalListItemStyle}>
                            <Image source={ICON_PRIVATE} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                            <AppText size={2} style={{ flex: 1, paddingLeft: RFValue(5) }}>Only me</AppText>
                            {state.privacy === 'Only me' ?
                                <AntDesign name={"check"} style={{ fontSize: RFValue(20), color: AppTheme.colors.green }} />
                                : null}
                        </View>
                    </TouchableOpacity>
                </View>
            </AppModal>

            <AppFriendsListModal show={state.showFriendsListModal} toggle={() => setState(prev => ({ ...prev, showFriendsListModal: false }))}
                chosenContacts={state.chosenContacts}
                showDone={true}
                selectedContacts={(contact) => {
                    let tempArr = state.chosenContacts;
                    let tempInd = tempArr.findIndex(ii => ii?._id === contact?._id);

                    if (tempInd > -1) {
                        tempArr.splice(tempInd, 1)
                    } else {
                        tempArr.push(contact)
                    }
                    setState(prev => ({ ...prev, chosenContacts: tempArr }))
                }} />



            <AppModal show={state.showGallery} toggle={() => setState(prev => ({ ...prev, showGallery: false }))}>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'black', width: '100%' }}>
                    <AppGallery navigation={navigation}
                        selectedOne={(selected) => {

                            console.log('-------------SELECTED ONE------------\n', selected)
                            setState(prev => ({ ...prev, selectedMedia: selected }))
                        }}
                        toggle={() => setState(prev => ({ ...prev, showGallery: false }))} />
                </SafeAreaView>
            </AppModal>
        </View>
    );
};
const styles = StyleSheet.create({
    boxContainerStyle: { borderColor: AppTheme.colors.lightGrey, height: BOXES_SIZE, width: BOXES_SIZE, borderRadius: RFValue(15), borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    modalListItemStyle: { flexDirection: 'row', width: Dimensions.get('screen').width, alignItems: 'center', padding: RFValue(15), paddingVertical: RFValue(10) },
})
export { CreatePost };
