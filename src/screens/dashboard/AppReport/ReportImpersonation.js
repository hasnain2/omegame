

import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { TextInput } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppBackButton, AppButton, AppText, UserAvatar } from '../../../components';
import { AppConfig, AppTheme } from '../../../config';
import { UploadMedia } from '../../../services';
import { BUCKETS } from '../../../utils/AppConstants';
import { Ionicons } from '../../../utils/AppIcons';
import { OpenCameraGalleryPromptPicker } from '../../../utils/AppMediaPicker';

const ReportImpersonation = ({ navigation, route, }) => {
    let { user } = useSelector(state => state.root)
    let [state, setState] = useState({
        loading: false,
        userToReport: '',
        photoOfID: '',
        reporterEmailAddress: '',
        feedbacktext: '',
        imageLoading: false
    });

    const onSubmit = () => {

    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppBackButton navigation={navigation} name={"IMPERSONATION"} />
            </View>
            <KeyboardAvoidingScrollView >
                <View style={{ padding: RFValue(15) }}>
                    <AppText style={{ fontSize: RFValue(22), fontWeight: 'bold' }} >Are you being impersonated?{"\n"}</AppText>
                    <AppText style={{ color: 'grey' }} >{AppConfig.appName} takes safety seriously. If someone created an account pretending to be you, you can report it to us. Make sure to provide all requested information, including a photo of your ID. We only repond to reports sent to us from the person who's being impersonated.{"\n"}</AppText>

                    <AppText size={3} >Who do you want to report?{"\n"}</AppText>

                    <TextInput
                        style={{ backgroundColor: 'black', marginBottom: RFValue(15) }}
                        value={state.userToReport}
                        placeholder={"Username of the account you are reporting"}
                        onChangeText={(val) => {
                            setState(prev => ({ ...prev, userToReport: val }))
                        }} />

                    <AppText size={3} >Please provide your e-mail address. We'll use it to contact you.{"\n"}</AppText>

                    <TextInput
                        style={{ backgroundColor: 'black', marginBottom: RFValue(15) }}
                        value={state.reporterEmailAddress}
                        placeholder={"Enter your e-mail"}
                        onChangeText={(val) => {
                            setState(prev => ({ ...prev, reporterEmailAddress: val }))
                        }} />

                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        OpenCameraGalleryPromptPicker((res) => {
                            if (res) {
                                setState(prev => ({ ...prev, imageLoading: true }))
                                UploadMedia((results) => {
                                    setState(prev => ({ ...prev, imageLoading: false }))
                                    if (results) {
                                        AppLogger('---------UPLOAD RESULTS-------->', results)
                                        setState(prev => ({ ...prev, photoOfID: results || '' }))
                                    }
                                }, BUCKETS.PROFILE_DOC, res)
                            }
                        }, false)
                    }}>
                        <View style={{ paddingBottom: RFValue(20) }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: RFValue(20), alignItems: 'center' }}>
                                <AppText size={3} color="white">Please upload a photo of your ID</AppText>
                                <Ionicons name="md-image-outline" style={{ fontSize: RFValue(25), color: AppTheme.colors.primary }} />
                            </View>
                            <AppText size={3} color={AppTheme.colors.lightGrey}>Valid forms of ID include a government-issued photo ID (e.g. driver's license, passport or national identification card).</AppText>
                        </View>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(20) }}>
                        <UserAvatar corner={user?.corner || ''} color={user?.cornerColor} source={user?.pic ? { uri: user.pic } : DEFAULT_USER_PIC} size={40} />
                        <TextInput
                            placeholder={"Anything else you'd like to tell us?"}
                            placeholderTextColor={AppTheme.colors.lightGrey}
                            multiline={true}
                            blurOnSubmit={true}
                            style={{ flex: 1, color: 'white', backgroundColor: 'black', fontSize: RFValue(18), maxHeight: RFValue(200), }}
                            onChangeText={(val) => { setState(prev => ({ ...prev, feedbacktext: val })) }}
                        />
                    </View>

                    <AppButton
                        loading={state.loading || state.imageLoading}
                        bgColor="black"
                        onPress={() => {
                            onSubmit();
                        }} label={"REPORT IMPERSONATION"} />
                </View>
            </KeyboardAvoidingScrollView>
        </View>
    );
};

export { ReportImpersonation };
