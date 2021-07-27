import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICON_ARROW_LEFT} from '../../assets/icons';
import {AppText} from './AppText';

const size = RFValue(40);
const AppBackButton = ({navigation, onPress, name}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          if (onPress) onPress();
          else navigation.goBack();
        }}
        style={{paddingRight: RFValue(8), paddingRight: 0}}>
        <Image source={ICON_ARROW_LEFT} style={{tintColor: 'white', height: size, width: size}} />
      </TouchableOpacity>
      {name && (
        <AppText size={1} bold={true} color={'grey'}>
          {name}
        </AppText>
      )}
    </View>
  );
};

export {AppBackButton};
