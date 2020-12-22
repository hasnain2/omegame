
import moment from 'moment';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { Divider } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_PHOTO } from '../../../assets/icons';
import { AppButton, AppDateTimePicker, AppHeaderCommon, AppInput, AppModal, AppText } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { UploadMedia } from '../../services';
import { UpdateProfile } from '../../services/profileService';
import { BUCKETS } from '../../utils/AppConstants';
import { AppShowToast } from '../../utils/AppHelperMethods';
import { OpenCameraGalleryPromptPicker } from '../../utils/AppMediaPicker';
const EditUserProfileScreen = ({ navigation, route, }) => {
    let user = route?.params?.data || useSelector(state => state.root.user);
    let [state, setState] = useState({
        name: user.firstName,
        bio: user?.bio,
        dateOfBirth: user.dateOfBirth || '',
        favoriteGame: user?.favouriteGame || '',
        favoriteConsole: user?.favouriteConsole || '',
        gender: user?.gender || '', showGenderPicker: false,

        gamingAccounts: user?.gamingAccounts && user?.gamingAccounts.length > 0 ? user?.gamingAccounts : [
            { gamingAccountProvider: "XBOX", account: '' },
            { gamingAccountProvider: "PSN", account: '' },
            { gamingAccountProvider: "STREAM", account: '' },
            { gamingAccountProvider: "NINTENDO", account: '' },
        ],


        imageToUpload: '',
        photo: '',
        loading: false,
        imageLoading: false,
        LHeight: 0,
        LWidth: 0,
        bioShowMoreLines: 3,

        showDatePicker: false,
    })

    const onSubmit = () => {
        if (!state.name) {
            AppShowToast("Please provide name")
            return
        }
        if (!state.bio) {
            AppShowToast("Please provide bio")
            return
        }
        if (!state.dateOfBirth) {
            AppShowToast("Please provide date of birth")
            return
        }
        if (!state.favoriteGame) {
            AppShowToast("Please provide favourite game")
            return
        } if (!state.favoriteConsole) {
            AppShowToast("Please provide favourite console")
            return
        }
        if (state.gamingAccounts[0].account && state.gamingAccounts[1].account && state.gamingAccounts[2].account && state.gamingAccounts[3].account) {
            let formedData = {
                bio: state.bio || null,
                dateOfBirth: moment(new Date(state.dateOfBirth)).toISOString() || null,
                favouriteConsole: state.favoriteConsole || null,
                favouriteGame: state.favoriteGame || null,
                firstName: state.name || null,
                gamingAccounts: state.gamingAccounts,
                gender: state.gender || '',
                // lastName: "" || null,
                // nickName: "" || null,
                isPrivate: false
            };
            if (state.imageToUpload)
                formedData = { ...formedData, pic: state.imageToUpload }
            setState(prev => ({ ...prev, loading: true }))
            UpdateProfile((res) => {
                setState(prev => ({ ...prev, loading: false }))
                if (res) {
                    navigation.goBack();
                    AppShowToast("Profile has been updated")
                } else {

                }
            }, formedData)
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }} >
            <AppHeaderCommon navigation={navigation} label={"PROFILE INFORMATION"} />

            <KeyboardAvoidingScrollView style={{ paddingHorizontal: RFValue(20) }}>
                <View style={{ alignSelf: 'center', paddingVertical: RFValue(20) }}>
                    <UserAvatar corner={user?.corner || ''}  source={state.photo ? { uri: state.photo } : user.pic ? { uri: user.pic } : null} size={140} />
                    <View style={{ position: 'absolute', bottom: RFValue(20), right: RFValue(3), borderRadius: 90 }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => {
                                OpenCameraGalleryPromptPicker((res) => {
                                    if (res) {
                                        setState(prev => ({ ...prev, imageLoading: true }))
                                        UploadMedia((uploaderRes) => {
                                            setState(prev => ({ ...prev, imageLoading: false, imageToUpload: uploaderRes.url }))
                                        }, BUCKETS.PROFILE, res)
                                        setState(prev => ({ ...prev, photo: res.uri }))
                                    }
                                }, false)
                            }}>
                            <View style={{ borderRadius: 90, backgroundColor: 'rgba(0, 72, 255,0.6)', padding: RFValue(10) }}>
                                <Image source={ICON_PHOTO} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <AppInput label={"Name"} value={state.name} onChangeText={(val) => { setState(prev => ({ ...prev, name: val })) }} />
                <AppInput label={"Bio"} value={state.bio} onChangeText={(val) => { setState(prev => ({ ...prev, bio: val })) }} />
                <TouchableOpacity onPress={() => {
                    setState(prev => ({ ...prev, showDatePicker: true, showGenderPicker: false }))
                }}>
                    <View pointerEvents={"none"}>
                        <AppInput editable={false} value={state.dateOfBirth ? (moment(state.dateOfBirth).format('DD MMM, yyyy') + '') : ''} label={"Date of birth"} onChangeText={(val) => { }} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setState(prev => ({ ...prev, showDatePicker: false, showGenderPicker: true }))
                }}>
                    <View pointerEvents={"none"}>
                        <AppInput editable={false} value={state.gender || "Select gender"} label={"Gender"} onChangeText={(val) => { }} />
                    </View>
                </TouchableOpacity>

                <AppInput label={"Favorite game"} value={state.favoriteGame} onChangeText={(val) => { setState(prev => ({ ...prev, favoriteGame: val })) }} />
                <AppInput label={"Favorite console"} value={state.favoriteConsole} onChangeText={(val) => { setState(prev => ({ ...prev, favoriteConsole: val })) }} />

                {state.gamingAccounts.map((iitm, index) => {
                    return (
                        <AppInput label={iitm.gamingAccountProvider} value={iitm.account} onChangeText={(val) => {
                            let arr = state.gamingAccounts;
                            arr[index].account = val;
                            setState(prev => ({ ...prev, gamingAccounts: arr }))
                        }} />
                    )
                })}
            </KeyboardAvoidingScrollView>

            <View style={{ padding: RFValue(15) }}>
                <AppButton loading={state.loading || state.imageLoading} bgColor="black" onPress={onSubmit} label={"SAVE"} />
            </View>

            <AppDateTimePicker show={state.showDatePicker}
                value={state.dateOfBirth}
                setShow={(val) => {
                    setState(prev => ({ ...prev, showDatePicker: val }))
                }}
                onChange={(val) => {
                    setState(prev => ({ ...prev, dateOfBirth: val }))
                }}
            />

            <AppModal type={'bottom'} show={state.showGenderPicker} toggle={() => setState(prev => ({ ...prev, showGenderPicker: false }))}>
                <View style={{ backgroundColor: 'black', padding: RFValue(20), width: '100%', paddingBottom: RFValue(50) }}>
                    <AppText style={{ paddingVertical: RFValue(15), textAlign: 'center' }}>Select gender</AppText>
                    <AppText onPress={() => {
                        setState(prev => ({ ...prev, showGenderPicker: false, gender: 'MALE' }))
                    }} size={3} style={{ paddingVertical: RFValue(15) }}>Male</AppText>
                    <Divider style={{ width: '100%', backgroundColor: 'grey' }} />
                    <AppText onPress={() => {
                        setState(prev => ({ ...prev, showGenderPicker: false, gender: 'FEMALE' }))
                    }} size={3} style={{ paddingVertical: RFValue(15) }}>Female</AppText>
                    <Divider style={{ width: '100%', backgroundColor: 'grey' }} />
                    <AppText onPress={() => {
                        setState(prev => ({ ...prev, showGenderPicker: false, gender: 'RATHER NOT SAY' }))
                    }} size={3} style={{ paddingVertical: RFValue(15) }}>Rather not say!</AppText>
                </View>
            </AppModal>
        </View>
    );
};

export { EditUserProfileScreen };
