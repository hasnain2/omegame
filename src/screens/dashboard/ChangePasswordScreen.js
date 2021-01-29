

import React, { useState } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppButton, AppHeaderCommon, AppInput, AppText } from '../../components';
import { AppTheme } from '../../config';
import { ChangePassword } from '../../services/authService';
import { AppShowToast } from '../../utils/AppHelperMethods';
import { Ionicons } from '../../utils/AppIcons';
import { ValidatePassword } from '../../utils/AppValidators';

const ChangePasswordScreen = ({ navigation, route }) => {

    const [state, setState] = useState({
        loading: false,
        currentPass: '',
        newPass: '',
        confirmNewPass: '',
        passwordError: '',
        passVisibility1: true,
        passVisibility2: true,
        passVisibility3: true
    })

    const onSubmit = () => {
        if (state.currentPass) {
            if (state.newPass === state.confirmNewPass) {
                if (ValidatePassword(state.newPass)) {
                    let formedBody = {
                        oldPassword: state.currentPass,
                        newPassword: state.newPass
                    }
                    setState(prev => ({ ...prev, loading: true }))
                    ChangePassword((results) => {
                        setState(prev => ({ ...prev, loading: false }))
                        if (results) {
                            AppShowToast("Password has been updated");
                            navigation.goBack();
                        }
                    }, formedBody)
                } else
                    setState(prev => ({ ...prev, passwordError: "Password should contain [special characters, Upper and Lower case Alphabets and numbers]" }))
            } else
                AppShowToast("Password does not match");
        } else
            AppShowToast("Please provide current password");
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppHeaderCommon navigation={navigation} label={"CHANGE PASSWORD"} />
            <View style={{ flex: 1, padding: RFValue(20) }}>

                <View style={{ paddingVertical: RFValue(20) }}>
                    <AppInput
                        style={{ backgroundColor: 'black' }}
                        type={'password'}

                        passwordVisible={state.passVisibility1}
                        onRightPress={() => setState(prev => ({ ...prev, passVisibility1: !state.passVisibility1 }))}
                        right={<Ionicons name={state.passVisibility1 ? "md-eye-off-sharp" : "md-eye-sharp"} style={{ fontSize: RFValue(20), color: AppTheme.colors.lightGrey }} />}

                        value={state.currentPass}
                        onChangeText={(txt) => setState(prev => ({ ...prev, currentPass: txt, passwordError: '' }))}
                        label={"Current Password"}
                    />
                    <AppInput
                        style={{ backgroundColor: 'black' }}
                        type={'password'}

                        passwordVisible={state.passVisibility2}
                        onRightPress={() => setState(prev => ({ ...prev, passVisibility2: !state.passVisibility2 }))}
                        right={<Ionicons name={state.passVisibility2 ? "md-eye-off-sharp" : "md-eye-sharp"} style={{ fontSize: RFValue(20), color: AppTheme.colors.lightGrey }} />}

                        value={state.newPass}
                        onChangeText={(txt) => setState(prev => ({ ...prev, newPass: txt, passwordError: '' }))}
                        label={"New Password"}
                    />
                    <AppInput
                        style={{ backgroundColor: 'black' }}
                        type={'password'}

                        passwordVisible={state.passVisibility3}
                        onRightPress={() => setState(prev => ({ ...prev, passVisibility3: !state.passVisibility3 }))}
                        right={<Ionicons name={state.passVisibility3 ? "md-eye-off-sharp" : "md-eye-sharp"} style={{ fontSize: RFValue(20), color: AppTheme.colors.lightGrey }} />}

                        value={state.confirmNewPass}
                        onChangeText={(txt) => setState(prev => ({ ...prev, confirmNewPass: txt, passwordError: '' }))}
                        label={"Confirm Password"}
                    />
                    {state.passwordError ?
                        <AppText color={AppTheme.colors.red} size={1}>{state.passwordError}</AppText>
                        : null}
                </View>
                <AppButton
                    bgColor="black"
                    loading={state.loading}
                    onPress={() => {
                        setState(prev => ({ ...prev, passwordError: '' }))
                        onSubmit();
                    }} label={"CHANGE MY PASSWORD"} />
            </View>
        </View>
    );
};

export { ChangePasswordScreen };
