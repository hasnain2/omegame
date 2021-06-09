import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {AppBackButton, AppButton, UserAvatar} from '../../../components';
import {AppTheme} from '../../../config';
import {ReportIssueOrSpam} from '../../../services';
import {PostFeedback} from '../../../services/feedback';
import {AppShowToast} from '../../../utils/AppHelperMethods';

const ReportSystemIssue = ({navigation, route}) => {
  let {user} = useSelector((state) => state.root);
  let [state, setState] = useState({
    loading: false,
    feedbacktext: '',
  });

  const onSubmit = async () => {
    if (!state.feedbacktext) {
      AppShowToast("Kindly explain the issue you're facing.");
      return false;
    }

    let payload = {
      reportType: 'SYSTEM_ISSUES',
      description: state.feedbacktext?.trim(),
    };

    setState((prev) => ({...prev, loading: true}));
    PostFeedback((res)=>{console.log(res)
      navigation.goBack();
      AppShowToast('Thank you for your feedback, Report sent!');
    }, {description: state.feedbacktext})
    // const reportResponse = await ReportIssueOrSpam(payload);
    setState((prev) => ({...prev, loading: false}));
    // if (reportResponse) {
    //   navigation.goBack();
    //   AppShowToast('Thank you for your feedback, Report sent!');
    // }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AppBackButton navigation={navigation} name={'SYSTEM ISSUE'} />
      </View>
      <View style={{flex: 1, padding: RFValue(15)}}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: RFValue(40)}}>
          <UserAvatar
            corner={user?.corner || ''}
            color={user?.cornerColor}
            source={user?.pic ? {uri: user.pic} : DEFAULT_USER_PIC}
            size={40}
          />
          <TextInput
            placeholder={'What went wrong?'}
            placeholderTextColor={AppTheme.colors.lightGrey}
            multiline={true}
            blurOnSubmit={true}
            style={{flex: 1, color: 'white', backgroundColor: 'black', fontSize: RFValue(18), maxHeight: RFValue(200)}}
            onChangeText={(val) => {
              setState((prev) => ({...prev, feedbacktext: val}));
            }}
          />
        </View>

        <AppButton
          loading={state.loading || state.imageLoading}
          bgColor="black"
          onPress={() => {
            onSubmit();
          }}
          label={'REPORT'}
        />
      </View>
    </View>
  );
};

export {ReportSystemIssue};
