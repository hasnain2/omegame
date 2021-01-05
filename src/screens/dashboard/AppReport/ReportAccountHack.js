


import React from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppBackButton, AppText } from '../../../components';
import { AppTheme } from '../../../config/AppTheme';

const ReportAccountHack = ({ navigation, route, }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppBackButton navigation={navigation} name={"HACKED ACCOUNT"} />
            </View>
            <KeyboardAvoidingScrollView >
                <View style={{ padding: RFValue(15) }}>
                    <AppText style={{ fontSize: RFValue(24), fontWeight: 'bold' }} >Do you think your account has been hacked?{"\n"}</AppText>
                    <AppText size={3} >Protect your account with the following tips:{"\n"}</AppText>

                    <AppText color={'grey'} size={3}  >* Pick a strong password. Use a combination of at least six numbers, letters and punctuation marks (like & and ?). It should be different from other password you use elsewhere on the internet.{'\n'}</AppText>
                    <AppText color={'grey'} size={3}  >* Make sure your account is secure.{'\n'}</AppText>
                    <AppText color={'grey'} size={3}  >* Change your password regularly.{'\n'}</AppText>

                    <AppText color={'grey'} size={3} onPress={() => {
                        navigation.navigate("ChangePasswordScreen")
                    }}  >You can <AppText color={AppTheme.colors.primary}>change your password here</AppText>.{'\n'}</AppText>

                </View>
            </KeyboardAvoidingScrollView>
        </View>
    );
};

export { ReportAccountHack };
