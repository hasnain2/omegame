import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICON_CHECKBOXCHECKED, ICON_CHECKBOXNONE} from '../../assets/icons';
import {AppText} from './AppText';

const AppRadioButton = ({size, val, label, style, textStyle, onPress, color}) => {
  const SIZE = RFValue(size + 10);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPress(!val);
      }}>
      <View style={[{flexDirection: 'row', alignItems: 'center'}, style ? style : null]}>
        {val ? (
          <FastImage source={ICON_CHECKBOXCHECKED} style={{height: SIZE, width: SIZE}} />
        ) : (
          <FastImage source={ICON_CHECKBOXNONE} style={{height: SIZE, width: SIZE}} />
        )}
        {label && (
          <AppText
            size={1}
            color={color ? color : 'lightgrey'}
            style={[{paddingLeft: RFValue(8)}, textStyle ? textStyle : null]}>
            {label}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};
export {AppRadioButton};
