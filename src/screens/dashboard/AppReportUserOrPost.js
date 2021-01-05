

import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppBackButton, AppButton, AppRadioButton, AppText, UserAvatar } from '../../components';
import { AppTheme } from '../../config';
import { REPORT_TYPE } from '../../utils/AppConstants';
import { AppShowToast } from '../../utils/AppHelperMethods';

const AppReportUserOrPost = ({ navigation, route, }) => {
    let postID = route?.params?.postID || '';
    let userID = route?.params?.userID || '';
    let [state, setState] = useState({
        loading: false,
        reportText: '',
        reportType: '',
        referenceUrl: ''
    })
    let { user } = useSelector(state => state.root);

    const onSubmit = () => {
        if (state.reportText.trim()) {
            navigation.goBack();
            AppShowToast("Thank you for your feedback, Report sent!")
        } else {
            AppShowToast('kindly provide details of the issue.')
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppBackButton navigation={navigation} name={"ABUSE OR SPAM"} />
            </View>

            <KeyboardAvoidingScrollView >
                <View style={{ padding: RFValue(15) }}>
                    <AppText bold={true} >Is someone engaging in abusive or posting spam?{"\n"}</AppText>
                    <AppText size={3} color={'grey'} >We do not tolerate behavior that crosses the line into abuse, including behavior that harasses, intimidates or discriminates another user.{"\n"}</AppText>
                    <AppText size={3} >What are you reporting?.{"\n\n"}</AppText>

                    {REPORT_TYPE.map(item => (
                        <AppRadioButton
                            textStyle={{ fontSize: RFValue(14) }}
                            val={state.reportType === item?.key}
                            key={item.name} onPress={() => {
                                setState(prev => ({ ...prev, reportType: item?.key }))
                            }} label={item?.name} size={25} color={"white"} />
                    ))}
                    <TextInput placeholder={"http://"}
                        value={state.referenceUrl}
                        placeholderTextColor={AppTheme.colors.lightGrey}
                        blurOnSubmit={true}
                        style={{ flex: 1, color: 'white', fontSize: RFValue(16), height: '100%', borderBottomColor: 'lightgrey', borderBottomWidth: 0.4, marginTop: RFValue(20), paddingVertical: RFValue(10), marginLeft: RFValue(10) }}
                        onChangeText={(val) => { setState(prev => ({ ...prev, referenceUrl: val })) }}
                    />
                </View>


                <View style={{ flexDirection: 'row', padding: RFValue(20) }}>
                    <UserAvatar corner={user?.corner || ''} color={user?.cornerColor} source={user?.pic ? { uri: user.pic } : DEFAULT_USER_PIC} size={40} />
                    <TextInput placeholder={"Please provide as much detail as possible..."}
                        placeholderTextColor={AppTheme.colors.lightGrey}
                        multiline={true}
                        blurOnSubmit={true}
                        style={{ flex: 1, color: 'white', fontSize: RFValue(16), height: '100%', maxHeight: RFValue(200), marginLeft: RFValue(10) }}
                        onChangeText={(val) => { setState(prev => ({ ...prev, reportText: val })) }}
                    />
                </View>

            </KeyboardAvoidingScrollView>
            <View style={{ padding: RFValue(15), paddingTop: 0 }}>
                <AppButton bgColor="black" onPress={onSubmit} label={"REPORT"} />
            </View>

        </View>
    );
};

export { AppReportUserOrPost };
