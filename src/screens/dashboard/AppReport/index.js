import React from 'react';
import {View} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppBackButton, AppText} from '../../../components';

const REPORT_TYPE = [
  {
    name: 'Abuse or spam',
    key: 'ABUSE_OR_SPAM',
    nav: 'ReportAbuseOrSpam',
  },
  {
    name: 'Exposed private information',
    key: 'EXPOSED_PRIVATE_INFORMATION',
    nav: 'ReportExposedPrivateInfo',
  },
  {
    name: 'Hacked account',
    key: 'HACKED_ACCOUNT',
    nav: 'ReportAccountHack',
  },
  {
    name: 'Impersonation',
    key: 'IMPERSONATION',
    nav: 'ReportImpersonation',
  },
  {
    name: 'System issue',
    key: 'SYSTEM_ISSUE',
    nav: 'ReportSystemIssue',
  },
];

const AppReport = ({navigation, route}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AppBackButton navigation={navigation} name={'REPORT A PROBLEM'} />
      </View>
      <KeyboardAvoidingScrollView>
        <View style={{padding: RFValue(15)}}>
          <AppText style={{fontSize: RFValue(20), fontWeight: 'bold'}}>What do you want to report?{'\n'}</AppText>

          {REPORT_TYPE.map((item) => (
            <AppText
              size={3}
              onPress={() => {
                navigation.navigate(item.nav);
              }}
              style={{paddingVertical: RFValue(10)}}>
              {item.name}
            </AppText>
          ))}
        </View>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

export {AppReport};
