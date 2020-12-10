

import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppButton, AppHeaderCommon, AppInput, AppText } from '../../components';
import { AppTheme } from '../../config';
import { UploadMedia } from '../../services';
import { RequestVerification } from '../../services/profileService';
import { BUCKETS } from '../../utils/AppConstants';
import { AppShowToast } from '../../utils/AppHelperMethods';
import { Ionicons } from '../../utils/AppIcons';
import { OpenCameraGalleryPromptPicker } from '../../utils/AppMediaPicker';

const VERIFICATION_INFO = "The verification badge appears next to the name on an account's profile and next to the account name in search results. \n \nAn account may be verified if it is determined to be an account of a notable public figure, celebrity, global brand or entity it represents. \n\nVerified badges must be applied by Omegame, and accounts that use a badge as a part of profile photos, or in any other way that implies verified status, are subject to permanent account suspension."
const RequestVerificationScreen = ({ navigation, route, }) => {
    let user = useSelector(state => state.root.user)
    let [state, setState] = useState({
        loading: false,
        imageLoading: false,
        userName: user?.userName || '',
        knownAs: user?.profile?.knownAs || '',
        fullName: user?.profile?.firstName || '',
        category: '',
        filePath: ''
    })

    const onSubmit = () => {
        if (state.filePath && state.filePath.name) {
            if (state.userName && state.knownAs && state.fullName && state.category) {
                let formData = {
                    category: state.category,
                    fullName: state.fullName,
                    identityDoc: state.filePath.name,
                    knownAs: state.knownAs,
                    userName: state.userName
                }
                setState(prev => ({ ...prev, loading: true }))
                RequestVerification((results) => {
                    setState(prev => ({ ...prev, loading: false }))
                    if (results) {
                        AppShowToast("Verification request sent!")
                        navigation.goBack()
                    }
                }, formData)
            } else
                AppShowToast("Please provide all fields");
        } else
            AppShowToast("Please select a document photo");
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppHeaderCommon navigation={navigation} label={"Apply for Omegame Verification".toUpperCase()} />
            <KeyboardAvoidingScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: RFValue(20) }}>
                    <AppText bold={true} size={3} color="white">Apply for Omegame Verification</AppText>
                    <AppText size={2} style={{ paddingVertical: RFValue(20) }} color={AppTheme.colors.lightGrey}>{VERIFICATION_INFO}</AppText>
                    <View style={{ paddingVertical: RFValue(20) }}>
                        <AppInput
                            editable={user?.userName ? false : true}
                            style={{ backgroundColor: 'black' }}
                            value={state.userName}
                            onChangeText={(txt) => setState(prev => ({ ...prev, userName: txt }))}
                            label={"Username"}
                        />
                        <AppInput
                            style={{ backgroundColor: 'black' }}
                            value={state.fullName}
                            onChangeText={(txt) => setState(prev => ({ ...prev, fullName: txt }))}
                            label={"Full name"}
                        />
                        <AppInput
                            style={{ backgroundColor: 'black' }}
                            value={state.knownAs}
                            onChangeText={(txt) => setState(prev => ({ ...prev, knownAs: txt }))}
                            label={"Known as"}
                        />
                        <AppInput
                            style={{ backgroundColor: 'black' }}
                            value={state.category}
                            onChangeText={(txt) => setState(prev => ({ ...prev, category: txt }))}
                            label={"Category"}
                        />

                    </View>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        OpenCameraGalleryPromptPicker((res) => {
                            if (res) {
                                setState(prev => ({ ...prev, imageLoading: true }))
                                UploadMedia((results) => {
                                    setState(prev => ({ ...prev, imageLoading: false }))
                                    if (results) {
                                        console.log('---------UPLOAD RESULTS-------->', results?.data?.media)
                                        setState(prev => ({ ...prev, filePath: results?.data?.media || '' }))
                                    }
                                }, BUCKETS.PROFILE_DOC, res)
                            }
                        }, false)
                    }}>
                        <View style={{ paddingBottom: RFValue(20) }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: RFValue(20), alignItems: 'center' }}>
                                <AppText size={2} color="white">Please upload a photo of your ID</AppText>
                                <Ionicons name="md-image-outline" style={{ fontSize: RFValue(25), color: AppTheme.colors.primary }} />
                            </View>
                            <AppText size={1} color={AppTheme.colors.lightGrey}>Valid forms of ID include a government-issued photo ID (e.g. driver's license, passport or national identification card).</AppText>

                        </View>
                    </TouchableOpacity>

                    <AppButton
                        loading={state.loading || state.imageLoading}
                        bgColor="black"
                        onPress={() => {
                            onSubmit();
                        }} label={"SUBMIT VERIFICATION"} />
                </View>
            </KeyboardAvoidingScrollView>
        </View>

    );
};

export { RequestVerificationScreen };
