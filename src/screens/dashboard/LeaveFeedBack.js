import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {AppBackButton, AppButton, AppCustomSlider, AppText, UserAvatar} from '../../components';
import {AppConfig, AppTheme} from '../../config';
import {AppShowToast} from '../../utils/AppHelperMethods';
const NUMBER_OF_COLUMNS = 2;
const LeaveFeedBack = ({navigation, route}) => {
  let gameData = route?.params?.gameData;
  const [state, setState] = useState({
    loading: false,
    feedbacktext: '',
    rating: 5,
    selectedConsole: 'Ps4',
    showFilter: false,
  });
  const {user} = useSelector((state) => state.root);

  const onSubmit = () => {
    if (state.feedbacktext.trim()) {
    } else {
      AppShowToast('kindly provide feedback');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AppBackButton navigation={navigation} name={'LEAVE FEEDBACK'} />
      </View>

      <KeyboardAvoidingScrollView>
        <View style={{padding: RFValue(15), borderBottomColor: AppTheme.colors.lightGrey, borderBottomWidth: 0.4}}>
          <AppText bold={true}>Thanks for your interest in sending us feedback!{'\n'}</AppText>
          <AppText size={3} color={'grey'}>
            We sincerely appreciate hearing what we can do to make the Omegame experience better for everyone.{'\n'}
          </AppText>
          <AppText size={3} color={'grey'}>
            If you have comments, concerns or compliments, please feel welcome to let us know.{'\n\n'}
          </AppText>
          <AppText size={3} color={'white'} style={{}}>
            How much did you like {AppConfig.appName}?
          </AppText>
          <AppText
            size={3}
            bold={true}
            color={state.rating > 5 ? AppTheme.colors.green : AppTheme.colors.red}
            style={{textAlign: 'right'}}>
            {state.rating.toFixed(2)}
          </AppText>
          <AppCustomSlider
            onChange={(val) => {
              setState((prev) => ({...prev, rating: val}));
            }}
          />
        </View>

        <View style={{flexDirection: 'row', padding: RFValue(20)}}>
          <UserAvatar
            corner={user?.corner || ''}
            color={user?.cornerColor}
            source={user?.pic ? {uri: user.pic} : DEFAULT_USER_PIC}
            size={40}
          />
          <TextInput
            placeholder={'Write a feedback...'}
            placeholderTextColor={AppTheme.colors.lightGrey}
            multiline={true}
            blurOnSubmit={true}
            style={{
              flex: 1,
              color: 'white',
              fontSize: RFValue(18),
              height: '100%',
              maxHeight: RFValue(200),
              marginLeft: RFValue(10),
            }}
            onChangeText={(val) => {
              setState((prev) => ({...prev, feedbacktext: val}));
            }}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={{padding: RFValue(15), paddingTop: 0}}>
        <AppButton bgColor="black" onPress={onSubmit} label={'SEND FEEDBACK'} />
      </View>
    </View>
  );
};

export {LeaveFeedBack};
