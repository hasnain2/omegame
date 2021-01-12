

import { GoogleSignin } from '@react-native-community/google-signin';
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { APP_LOGO } from '../../../assets/images';
import { AppBackButton, AppButton, AppGradientContainer, AppInput, AppRadioButton, AppText } from '../../components';
import { AppSocialButton } from '../../components/AppSocialButton';
import { AppTheme } from '../../config/AppTheme';
import { LogInUser } from '../../services/authService';
import { LoginWithApple, LoginWithFacebook, LoginWithGoogle, socialloginhelper } from '../../services/socialAuthService';
import { AppLogger, AppShowToast } from '../../utils/AppHelperMethods';
import { Ionicons } from '../../utils/AppIcons';
import { getData, storeData } from '../../utils/AppStorage';
import { ValidateEmail } from '../../utils/AppValidators';
import InstagramLogin from 'react-native-instagram-login';
import { AppConfig } from '../../config';
import { EndPoints } from '../../utils/AppEndpoints';
import { SOCIAL_LOGIN_TYPES } from '../../utils/AppConstants';



const SetUserName = ({ route, navigation }) => {
    let [state, setState] = useState({
        loading: false,
        userName: ''
    });

    const onsubmit = () => {
        if (state.userName.trim()) {

        } else
            AppShowToast('Please provide username')
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black', }}>
            <AppBackButton navigation={navigation} />
            <View style={{ paddingHorizontal: RFValue(15), flex: 1 }}>

                <View style={{ flex: 1 }}>
                    <AppText   >Set username!</AppText>
                    <AppText size={1} style={{ paddingVertical: RFValue(20) }} >Set username to compelete registration!</AppText>

                    <AppInput editable={!state.loading} value={state.userName} style={{ backgroundColor: 'black' }} type={"any"} label={"Username"}
                        onChangeText={(val) => { setState(prev => ({ ...prev, userName: val })) }} />

                    <View style={{ paddingTop: RFValue(25), justifyContent: 'center' }}>
                        <AppButton loading={state.loading} bgColor="black" onPress={onsubmit} label={"SIGN UP"} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export { SetUserName };
