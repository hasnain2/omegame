import {GoogleSignin} from '@react-native-community/google-signin';
import React, {useEffect, useState} from 'react';
import {Keyboard, LayoutAnimation, Platform, TouchableHighlight, UIManager, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import InstagramLogin from 'react-native-instagram-login';
import {RFValue} from 'react-native-responsive-fontsize';
import {APP_LOGO, APP_ICON} from '../../../assets/images';
import {AppButton, AppGradientContainer, AppInput, AppRadioButton, AppText} from '../../components';
import {AppSocialButton} from '../../components/AppSocialButton';
import {AppConfig} from '../../config';
import {AppTheme} from '../../config/AppTheme';
import {LogInUser} from '../../services/authService';
import {LoginWithApple, LoginWithFacebook, LoginWithGoogle, socialloginhelper} from '../../services/socialAuthService';
import {SOCIAL_LOGIN_TYPES} from '../../utils/AppConstants';
import {EndPoints} from '../../utils/AppEndpoints';
import {AppShowToast} from '../../utils/AppHelperMethods';
import {Ionicons} from '../../utils/AppIcons';
import {getData, storeData} from '../../utils/AppStorage';
import {ValidateEmail} from '../../utils/AppValidators';
const INSTA_SCOPES = ['user_profile', 'user_media', 'instagram_graph_user_profile'];
import Logo from '../../../assets/icons/Logo.svg';
import {useTranslation} from 'react-i18next';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

GoogleSignin.configure();

const Login = ({route, navigation}) => {
  const {t, i18n} = useTranslation();
  let [instagramLoginRef, setInstagramLoginRef] = useState('');
  const [state, setState] = useState({
    rememberMe: false,
    email: __DEV__ ? 'omegame2' : '',
    password: __DEV__ ? '@Sad123456' : '',
    loading: false,
    passwordVisible: true,
    isKeyboardVisible: false,
  });

  useEffect(() => {
    getData('rememberMe', (dta) => {
      if (dta) setState((prev) => ({...prev, rememberMe: true, email: dta.userName, password: dta.password}));
    });

    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  function _keyboardDidShow(e) {
    setState((prev) => ({...prev, isKeyboardVisible: true}));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  function _keyboardDidHide() {
    setState((prev) => ({...prev, isKeyboardVisible: false}));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  const socialbuttonsclickhandler = (data) => {
    if (data) {
      if (true) {
        // got token proceen to login success and set user into redux and local storage
      } else {
        // this is new user take him to set username screen to complete registration
      }
    }
    setState((prev) => ({...prev, loading: false}));
  };
  const onsubmit = () => {
    if (state.email) {
      if (state.password) {
        setState((prev) => ({...prev, loading: true}));
        LogInUser(
          (dta) => {
            setState((prev) => ({...prev, loading: false}));
            if (dta) {
              if (dta === 'verify') {
                navigation.navigate('CodeVerification', {email: state.email?.toLowerCase().trim()});
              } else {
                if (state.rememberMe)
                  storeData('rememberMe', {userName: state.email.trim(), password: state.password.trim()});
              }
            } else AppShowToast('Invalid email or password');
          },
          {
            userName: ValidateEmail(state.email) ? state.email.toLowerCase().trim() : state.email.trim(),
            password: state.password.trim(),
          },
        );
      } else AppShowToast('Provide password');
    } else AppShowToast('Please provide valid email address');
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{paddingHorizontal: RFValue(24), flex: 1}}>
        <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
          {/* <TouchableHighlight
            activeOpacity={9}
            onPress={() => {
              if (__DEV__) navigation.navigate('SetUserName');
            }}> */}
          <Logo width={100} height={100} />
          {/* </TouchableHighlight> */}
        </View>
        <View style={{flex: 1}}>
          <AppInput
            editable={!state.loading}
            dense={true}
            value={state.email}
            style={{backgroundColor: 'black', marginBottom: RFValue(10)}}
            type={'any'}
            label={t('auth.login')}
            onChangeText={(val) => {
              setState((prev) => ({...prev, email: val}));
            }}
          />
          <AppInput
            editable={!state.loading}
            value={state.password}
            dense={true}
            style={{backgroundColor: 'black'}}
            type={'any'}
            passwordVisible={state.passwordVisible}
            label={t('auth.password')}
            onChangeText={(val) => {
              setState((prev) => ({...prev, password: val}));
            }}
            onRightPress={() => setState((prev) => ({...prev, passwordVisible: !state.passwordVisible}))}
            right={
              <Ionicons
                name={state.passwordVisible ? 'md-eye-off-sharp' : 'md-eye-sharp'}
                style={{fontSize: RFValue(20), color: AppTheme.colors.lightGrey}}
              />
            }
          />
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: RFValue(10),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <AppRadioButton
              label={t('auth.rememberMe')}
              size={20}
              val={state.rememberMe}
              onPress={() => {
                global.rememberMe = !state.rememberMe;
                setState((prev) => ({...prev, rememberMe: !state.rememberMe}));
              }}
            />
            <AppText></AppText>
            <AppText
              onPress={() => navigation.navigate('ForgotPassword')}
              style={{textAlign: 'right'}}
              size={1}
              color={AppTheme.colors.primary}>
              {t('auth.forgotPassword')}
            </AppText>
          </View>
          <View style={{flex: 1, paddingTop: RFValue(25), justifyContent: 'center'}}>
            <AppButton loading={state.loading} bgColor="black" onPress={onsubmit} label={t('auth.start')} />
          </View>
        </View>
      </View>

      <View style={{}}>
        <InstagramLogin
          ref={(ref) => setInstagramLoginRef(ref)}
          appId={AppConfig.INSTAGRAM_APP_ID}
          appSecret={AppConfig.INSTAGRAM_APP_SECRET}
          redirectUrl={EndPoints.INSTAGRAM_REDIRECT_URL}
          scopes={INSTA_SCOPES}
          onClose={() => {
            setState((prev) => ({...prev, loading: false}));
          }}
          onLoginSuccess={async (data) => {
            setState((prev) => ({...prev, loading: true}));
            let loginRes = await socialloginhelper(data.access_token, SOCIAL_LOGIN_TYPES.INSTAGRAM);
            socialbuttonsclickhandler(loginRes);
          }}
          onLoginFailure={(data) => {
            setState((prev) => ({...prev, loading: false}));
          }}
        />
        {!state.isKeyboardVisible ? (
          <View style={{paddingBottom: RFValue(20)}}>
            <AppText
              size={1}
              style={{textAlign: 'center', paddingBottom: RFValue(10)}}
              color={AppTheme.colors.lightGrey}>
              {t('auth.startWith')}
            </AppText>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: RFValue(20),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppSocialButton
                onPress={async () => {
                  if (__DEV__) {
                    setState((prev) => ({...prev, loading: true}));
                    const socialLoginRes = await LoginWithFacebook();
                    socialbuttonsclickhandler(socialLoginRes);
                  }
                }}
                name="facebook"
              />
              <AppSocialButton name="twitter" />
              <AppSocialButton
                onPress={() => {
                  if (instagramLoginRef && __DEV__) {
                    setState((prev) => ({...prev, loading: true}));
                    instagramLoginRef.show();
                  }
                }}
                name="instagram"
              />
              <AppSocialButton
                onPress={async () => {
                  if (__DEV__) {
                    setState((prev) => ({...prev, loading: true}));
                    const socialLoginRes = await LoginWithGoogle();
                    socialbuttonsclickhandler(socialLoginRes);
                  }
                }}
                name="google"
              />
              {Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 13 ? (
                <AppSocialButton
                  onPress={async () => {
                    if (__DEV__) {
                      setState((prev) => ({...prev, loading: true}));
                      const socialLoginRes = await LoginWithApple();
                      socialbuttonsclickhandler(socialLoginRes);
                    }
                  }}
                  name="apple"
                />
              ) : null}
            </View>
          </View>
        ) : null}
        <AppGradientContainer
          onPress={() => navigation.replace('SignUp')}
          style={{
            paddingVertical: RFValue(30),
            marginTop: RFValue(10),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: RFValue(10),
          }}>
          <AppText size={2}>{t('auth.dontAccount')}</AppText>
          <AppText size={4} bold={true} style={{paddingTop: RFValue(10)}}>
            {t('auth.signup')}
          </AppText>
        </AppGradientContainer>
      </View>
      {/* : null} */}
    </View>
  );
};

export {Login};
