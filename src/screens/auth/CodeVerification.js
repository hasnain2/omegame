import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppHeaderCommon, AppLoadingView, AppText } from '../../components';
import { AppTheme } from '../../config';
import { ResendVerificationCode, VerifyEmail } from '../../services';
import { SecurityCodeTypeEnum } from '../../utils/AppConstants';

const CELL_COUNT = 4;

const CodeVerification = ({ route, navigation }) => {

    const [value, setValue] = useState('');
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
            <AppHeaderCommon navigation={navigation} label={"Email verification"} />

            <AppText style={{ paddingHorizontal: RFValue(25), marginTop: RFValue(5), fontWeight: 'bold', fontSize: RFValue(16) }}>Enter 4-digit code</AppText>
            <AppText size="small" style={{ paddingHorizontal: RFValue(25), marginTop: RFValue(5), fontSize: RFValue(14), color: 'grey' }}>Verification code was sent to {email}</AppText>
            {loading && <AppLoadingView />}
            <View style={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        autoFocus={true}
                        onChangeText={async (code) => {
                            if (code.length === 4) {
                                setLoading(true)
                                const body = { email, code: Number(code) }
                                const response = await VerifyEmail(body)
                                setLoading(false)
                            }
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
            <AppText size={"small"} color="grey" style={{ paddingHorizontal: RFValue(10), fontSize: RFValue(14), margin: RFValue(20) }}>Didn’t receive a code?  <AppText size={"small"}
                onPress={async () => {
                    if (enableResend) {
                        setLoading(true);
                        setLoading(true)
                        await ResendVerificationCode({ email, type: SecurityCodeTypeEnum.verification })
                        setLoading(false)
                        setEnableResend(false);
                        setCounter(60);
                    }
                }}
                color={enableResend ? AppTheme.colors.primary : "grey"} bold={true} style={{ paddingHorizontal: RFValue(10), fontSize: RFValue(14) }}>Resend code now</AppText> {counter > 0 ? ("(" + counter + ")") : ""}</AppText>
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

export { CodeVerification };
