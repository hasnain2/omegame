import React, {useState} from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppHeaderCommon, AppText} from '../../components';
import {AppTheme} from '../../config';

const TermsAndConditions = ({navigation, route}) => {
  let [state, setState] = useState({
    loading: false,
  });

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <AppHeaderCommon label={'TERMS OF USE'} navigation={navigation} />

      <View style={{flex: 1, padding: RFValue(20)}}>
        <AppText style={{fontSize: RFValue(24)}} bold={true} color={'white'}>
          Terms of Use
        </AppText>
        <View style={{paddingTop: RFValue(10)}}>
          <AppText style={{paddingBottom: RFValue(10)}} color={AppTheme.colors.lightGrey} size={3}>
            Welcome to Omegame{' '}
          </AppText>
          <AppText color={AppTheme.colors.lightGrey} style={{lineHeight: RFValue(22)}} size={3}>
            Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome
            to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to
            Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame,
            Welcome to Omegame, Welcome to Omegame, Welcome to Omegame, Welcome to Omegame,{' '}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export {TermsAndConditions};
