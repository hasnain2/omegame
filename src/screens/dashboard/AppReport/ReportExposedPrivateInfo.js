

import React from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppBackButton, AppText } from '../../../components';
import { AppTheme } from '../../../config/AppTheme';

const ReportExposedPrivateInfo = ({ navigation, route, }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppBackButton navigation={navigation} name={"EXPOSED PRIVATE INFORMATION"} />
            </View>
            <KeyboardAvoidingScrollView >
                <View style={{ padding: RFValue(15) }}>
                    <AppText style={{ fontSize: RFValue(24), fontWeight: 'bold' }} >Is someone exposing your personal information?{"\n"}</AppText>

                    <AppText color={'grey'} size={3}  >Exposing someone's private information without their express authorization and permission is a violation of our <AppText onPress={() => {
                        // go to terms of use
                    }} color={AppTheme.colors.primary}>Terms of use</AppText>.{'\n'}</AppText>

                    <AppText color={'grey'} size={3}  >If someone has shared your private information or has posted a photo or video that violates your privacy, we'd suggest communicating directly with that person to ask that they remove it.{'\n'}</AppText>

                    <AppText color={'grey'} size={3} onPress={() => {
                        // go to report 
                    }}  >If your request has been rejected you can <AppText color={AppTheme.colors.primary}>report it to us</AppText>.{'\n'}</AppText>

                </View>
            </KeyboardAvoidingScrollView>
        </View>
    );
};

export { ReportExposedPrivateInfo };
