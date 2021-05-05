import React, {useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {APP_ICON, APP_LOGO} from '../../../assets/images';
import {AppButton, AppHeaderCommon, AppInput, AppText} from '../../components';
import {AppTheme} from '../../config/AppTheme';
import {AppShowToast} from '../../utils/AppHelperMethods';
import {ForgotPasswordCall} from './../../services';
import Logo from '../../../assets/icons/Logo.svg';
const ForgotPassword = ({route, navigation}) => {
  let [state, setState] = useState({
    loading: false,
    email: '',
  });

  const onSubmit = () => {
    if (state.email.trim()) {
      setState((prev) => ({...prev, loading: true}));
      ForgotPasswordCall(
        (res) => {
          if (res) {
            AppShowToast('Recovery link has been sent to your email');
            navigation.navigate('ResetPassword', {email: state.email?.toLowerCase().trim()});
          }
          setState((prev) => ({...prev, loading: false}));
        },
        state.email.includes('@') ? state.email?.toLowerCase().trim() : state.email?.trim(),
      );
    } else {
      AppShowToast('Kindly provide valid username or email address');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <AppHeaderCommon navigation={navigation} />
      <View style={{paddingHorizontal: RFValue(15), flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
      <Logo width={100} height={100} />
      </View>

      <View style={{flex: 1, paddingHorizontal: RFValue(15)}}>
        <AppText size={3} style={{paddingVertical: RFValue(10)}} bold={true}>
          Recovery Password
        </AppText>
        <AppText size={2} style={{paddingBottom: RFValue(15)}} color={AppTheme.colors.lightGrey}>
          Enter your username or e-mail and we'll send you a link to get your account.
        </AppText>

        <AppInput
          editable={!state.loading}
          type={'email'}
          label={'Username or e-mail'}
          onChangeText={(val) => {
            setState((prev) => ({...prev, email: val}));
          }}
        />

        <View style={{flex: 1, justifyContent: 'center'}}>
          <AppButton loading={state.loading} onPress={onSubmit} label={'Send me a Recovery Link'} />
        </View>
      </View>

      <View style={{paddingHorizontal: RFValue(15), flex: 0.5}}></View>
    </View>
  );
};

export {ForgotPassword};
