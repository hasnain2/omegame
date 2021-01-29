import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppButton, AppHeaderCommon, AppInput, AppLoadingView, AppText } from '../../components';
import { AppTheme } from '../../config';
import { ResendVerificationCode, ResetPasswordService } from '../../services';
import { SecurityCodeTypeEnum } from '../../utils/AppConstants';
import { AppShowToast } from '../../utils/AppHelperMethods';
import { Ionicons } from '../../utils/AppIcons';
import { removeItemsFromLocalStorage, storeData } from '../../utils/AppStorage';
import { ValidatePassword } from '../../utils/AppValidators';

const CELL_COUNT = 4;

const ResetPassword = ({ route, navigation }) => {

    const [value, setValue] = useState('');
    const [state, setState] = useState({
        passVisibility1: true,
        passVisibility2: true,
        password: '',
        newPassword: '',
        error: ''
    })
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    let email = route?.params?.email;

    const [loading, setLoading] = useState(false);
    const [enableResend, setEnableResend] = useState(false);
    const [counter, setCounter] = useState(60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            let tempCounter = counter;
            if (tempCounter > 0)
                setCounter(tempCounter - 1)
            else
                setEnableResend(true);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [counter])
    return (
        <View style={{ flex: 1, backgroundColor: 'black', }}>
            <AppHeaderCommon navigation={navigation} label={"Reset Password"} />

            <KeyboardAvoidingScrollView >
                <AppText style={{ paddingHorizontal: RFValue(20), marginTop: RFValue(5), fontWeight: 'bold', fontSize: RFValue(16) }}>Enter 4-digit code</AppText>
                <AppText size="small" style={{ paddingHorizontal: RFValue(20), fontSize: RFValue(14), marginTop: RFValue(5), color: 'grey' }}>Verification code was sent to {email}</AppText>
                {loading && <AppLoadingView />}
                <View style={{ width: '100%' }}>
                    <View style={{ alignItems: 'center' }}>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            autoFocus={true}
                            onChangeText={async (code) => {
                                setValue(code)
                            }}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                    </View>
                </View>
                <AppText size={"small"} color="grey" style={{ paddingHorizontal: RFValue(10), fontSize: RFValue(12), margin: RFValue(20) }}>Didn’t receive a code?  <AppText size={"small"}
                    onPress={async () => {
                        if (enableResend) {
                            setLoading(true);
                            setLoading(true)
                            await ResendVerificationCode({ email, type: SecurityCodeTypeEnum.forgot })
                            setLoading(false)
                            setEnableResend(false);
                            setCounter(60);
                        }
                    }}
                    color={enableResend ? AppTheme.colors.primary : "grey"} bold={true} style={{ paddingHorizontal: RFValue(10), fontSize: RFValue(12) }}>Resend code now</AppText> {counter > 0 ? ("(" + counter + ")") : ""}</AppText>

                <View style={{ padding: RFValue(10) }}>
                    <AppInput
                        style={{ backgroundColor: 'black' }}
                        type={'password'}

                        passwordVisible={state.passVisibility1}
                        onRightPress={() => setState(prev => ({ ...prev, passVisibility1: !state.passVisibility1 }))}
                        right={<Ionicons name={state.passVisibility1 ? "md-eye-off-sharp" : "md-eye-sharp"} style={{ fontSize: RFValue(20), color: AppTheme.colors.lightGrey }} />}

                        value={state.password}
                        onChangeText={(txt) => setState(prev => ({ ...prev, password: txt, error: '' }))}
                        label={"New Password"}
                    />
                    <AppInput
                        style={{ backgroundColor: 'black' }}
                        type={'password'}

                        passwordVisible={state.passVisibility2}
                        onRightPress={() => setState(prev => ({ ...prev, passVisibility2: !state.passVisibility2 }))}
                        right={<Ionicons name={state.passVisibility2 ? "md-eye-off-sharp" : "md-eye-sharp"} style={{ fontSize: RFValue(20), color: AppTheme.colors.lightGrey }} />}
                        value={state.newPassword}
                        onChangeText={(txt) => setState(prev => ({ ...prev, newPassword: txt, error: '' }))}
                        label={"Confirm Password"}
                    />
                    {state.error ?
                        <AppText color={AppTheme.colors.red} size={0}>{state.error}</AppText>
                        : null}
                    <View style={{ padding: RFValue(10) }}>
                        <AppButton
                            bgColor="black"
                            loading={state.loading}
                            onPress={async () => {
                                if (value && value.length === 4) {
                                    if (ValidatePassword(state.password)) {
                                        if (state.password === state.newPassword) {
                                            setLoading(true)
                                            await ResetPasswordService({
                                                password: state.password,
                                                code: Number(value),
                                                email: email
                                            })
                                            if (global.rememberMe)
                                                storeData('rememberMe', {
                                                    userName: email,
                                                    password: state.password
                                                })
                                            else
                                                removeItemsFromLocalStorage(['rememberMe'])
                                            setLoading(false)
                                        } else
                                            setState(prev => ({ ...prev, error: "Password does not match" }))
                                    } else
                                        setState(prev => ({ ...prev, error: "Password should contain [special characters, Upper and Lower case Alphabets and numbers]" }))
                                } else
                                    AppShowToast("kindly provide 4-digit code")
                            }} label={"CONFIRM"} />
                    </View>
                </View>
            </KeyboardAvoidingScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    root: { padding: RFValue(20), justifyContent: 'center', alignItems: 'center' },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: RFValue(30), width: '60%' },
    cell: {
        borderRadius: RFValue(5),
        width: RFValue(40),
        height: RFValue(40),
        lineHeight: 38,
        fontSize: 24,
        color: 'white',
        borderWidth: 2,
        borderColor: 'grey',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: AppTheme.colors.accent,
    },
});


export { ResetPassword };
