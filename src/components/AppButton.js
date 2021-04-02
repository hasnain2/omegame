import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppTheme} from '../config/AppTheme';
import {AppText} from './AppText';

const AppButton = ({onPress, label, fill, size, bgColor, grey, loading}) => {
  let RADIUS = RFValue(90);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (!loading) onPress();
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[
          grey ? AppTheme.colors.lightGrey : AppTheme.colors.gradientA,
          grey ? AppTheme.colors.lightGrey : AppTheme.colors.gradientB,
        ]}
        style={{padding: RFValue(1.0), borderRadius: RADIUS}}>
        <View
          style={[
            {
              borderRadius: 50,
              overflow: 'hidden',
              textAlign: 'center',
              padding: RFValue(size === 'small' ? 4 : 10),
              color: grey ? AppTheme.colors.lightGrey : fill ? 'white' : '#00bbff',
              overflow: 'hidden',
            },
            fill ? null : {backgroundColor: bgColor ? bgColor : 'black'},
          ]}>
          {loading ? (
            <ActivityIndicator color={'#00bbff'} size={'small'} />
          ) : (
            <AppText
              size={size === 'small' ? 1 : 2}
              bold={true}
              style={[
                {
                  paddingVertical: RFValue(1.3),
                  textAlign: 'center',
                  color: grey ? AppTheme.colors.lightGrey : fill ? 'white' : '#00bbff',
                  overflow: 'hidden',
                },
                fill ? null : {backgroundColor: bgColor ? bgColor : 'black'},
              ]}>
              {label.toUpperCase()}
            </AppText>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export {AppButton};
