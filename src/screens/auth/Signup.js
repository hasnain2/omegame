import React, {useEffect, useState} from 'react';
import {View, LayoutAnimation, Platform, UIManager, Keyboard} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {APP_LOGO, APP_ICON} from '../../../assets/images';
import {AppButton, AppGradientContainer, AppInput, AppText} from '../../components';
import {AppTheme} from '../../config/AppTheme';
import {SignUpUser} from '../../services';
import {AppShowToast} from '../../utils/AppHelperMethods';
import {Ionicons} from '../../utils/AppIcons';
import {ValidateEmail, ValidatePassword} from '../../utils/AppValidators';
import Logo from '../../../assets/icons/Logo.svg';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Signup = ({route, navigation}) => {
  let [state, setState] = useState({
    loading: false,
    passwordVisibleA: true,
    passwordVisibleB: true,
    keyboardVisible: false,
    passwordError: '',
    email: '',
    password: '',
    retypedPassword: '',
    username: '',
  });
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  function _keyboardDidShow(e) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setState((prev) => ({...prev, keyboardVisible: true}));
  }

  function _keyboardDidHide() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setState((prev) => ({...prev, keyboardVisible: false}));
  }

  const onSubmit = () => {
    var reWhiteSpace = new RegExp('\\s+');
    if (state.username) {
      if (!reWhiteSpace.test(state.username)) {
        if (ValidateEmail(state.email)) {
          if (state.password && state.password.length > 7) {
            if (state.password === state.retypedPassword) {
              if (ValidatePassword(state.password)) {
                setState((prev) => ({...prev, loading: true, passwordError: ''}));
                SignUpUser(
                  (res) => {
                    if (res) {
                      if (res !== 'verify') AppShowToast('Verification Email has been sent!');
                      navigation.navigate('CodeVerification', {email: state.email?.toLowerCase().trim()});
                    }
                    setState((prev) => ({...prev, loading: false}));
                  },
                  {
                    userName: state.username.trim(),
                    password: state.password.trim(),
                    email: state.email.toLowerCase().trim(),
                  },
                );
              } else
                setState((prev) => ({
                  ...prev,
                  passwordError:
                    'Password should contain [special characters, Upper and Lower case Alphabets and numbers]',
                }));
            } else AppShowToast('Password does not match');
          } else AppShowToast('Password must b 8 or more characters long');
        } else AppShowToast('Please provide valid email address');
      } else AppShowToast('Please remove white space from username.');
    } else AppShowToast('Please provide username');
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <View style={{paddingHorizontal: RFValue(24), flex: 1}}>
          <KeyboardAvoidingScrollView
            contentContainerStyle={{flex: 0.97, backgroundColor: 'black', paddingBottom: RFValue(30)}}>
            <View style={{flex: 0.45, justifyContent: 'center', alignItems: 'center'}}>
              <Logo width={100} height={100} />
            </View>

            <View style={{flex: 1}}>
              <AppInput
                editable={!state.loading}
                type={'any'}
                label={'Username'}
                onChangeText={(val) => {
                  setState((prev) => ({...prev, username: val}));
                }}
              />
              <AppInput
                editable={!state.loading}
                type={'type'}
                label={'E-mail'}
                onChangeText={(val) => {
                  setState((prev) => ({...prev, email: val}));
                }}
              />
              <AppInput
                editable={!state.loading}
                type={'any'}
                passwordVisible={state.passwordVisibleA}
                label={'Password'}
                onChangeText={(val) => {
                  setState((prev) => ({...prev, password: val}));
                }}
                onRightPress={() => setState((prev) => ({...prev, passwordVisibleA: !state.passwordVisibleA}))}
                right={
                  <Ionicons
                    name={state.passwordVisibleA ? 'md-eye-off-sharp' : 'md-eye-sharp'}
                    style={{fontSize: RFValue(20), color: AppTheme.colors.lightGrey}}
                  />
                }
              />
              <AppInput
                editable={!state.loading}
                type={'any'}
                passwordVisible={state.passwordVisibleB}
                label={'Confirm password'}
                onChangeText={(val) => {
                  setState((prev) => ({...prev, retypedPassword: val}));
                }}
                onRightPress={() => setState((prev) => ({...prev, passwordVisibleB: !state.passwordVisibleB}))}
                right={
                  <Ionicons
                    name={state.passwordVisibleB ? 'md-eye-off-sharp' : 'md-eye-sharp'}
                    style={{fontSize: RFValue(20), color: AppTheme.colors.lightGrey}}
                  />
                }
              />
              {state.passwordError ? (
                <AppText
                  color={AppTheme.colors.red}
                  size={1}
                  italic={true}
                  style={{lineHeight: RFValue(25), marginTop: RFValue(10)}}>
                  Must atleast 8 characters.{'\n'}
                  Must contain atleast 1 Number.{'\n'}
                  Must contain atleast 1 Capital Case.{'\n'}
                  Must contain atleast 1 small case.{'\n'}
                  Must contain atleast 1 special character.
                </AppText>
              ) : null}
              {!state.keyboardVisible && (
                <View style={{justifyContent: 'center', paddingTop: RFValue(10)}}>
                  <AppButton loading={state.loading} onPress={onSubmit} label={'Create Account'} />
                </View>
              )}

              <AppText
                size={1}
                style={{lineHeight: RFValue(20), textAlign: 'center', paddingVertical: RFValue(10)}}
                color={'#252525'}>
                By clicking Create account, I agree that I have read and accepted the{' '}
                <AppText size={1} color={'#252525'} style={{textDecorationLine: 'underline'}}>
                  Terms of Use
                </AppText>{' '}
                and{' '}
                <AppText size={1} color={'#252525'} style={{textDecorationLine: 'underline'}}>
                  Privacy Policy
                </AppText>
                .
              </AppText>
            </View>
          </KeyboardAvoidingScrollView>
        </View>

        {!state.keyboardVisible && (
          <View style={{justifyContent: 'space-between'}}>
            <AppGradientContainer
              onPress={() => navigation.replace('Login')}
              style={{paddingVertical: RFValue(20), justifyContent: 'center', alignItems: 'center'}}>
              <AppText size={2}>Already have an account?</AppText>
              <AppText size={4} bold={true} style={{paddingTop: RFValue(10)}}>
                LOGIN
              </AppText>
            </AppGradientContainer>
          </View>
        )}
      </View>
    </View>
  );
};

export {Signup};
