// import Slider from '@react-native-community/slider';
import Slider from 'react-native-custom-slider';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppTheme} from '../config';
import {AppText} from './AppText';
import {SLIDER_COLORS} from '../utils/AppConstants';

const AppCustomSlider = ({onChange, rating}) => {
  const [state, setState] = useState({
    value: 5,
    currentR: 255,
    currentG: 26,
    currentB: 76,
    currentColor: `rgb(255, 26, 76)`,
  });

  useEffect(() => {
    if (rating) {
      let pickedColor = SLIDER_COLORS[Math.ceil(rating)];
      setState((prev) => ({
        ...prev,
        value: rating,
        currentColor: `rgb(${pickedColor?.r},${pickedColor?.g},${pickedColor?.b})`,
      }));
    }
  }, [rating]);

  return (
    <View style={{paddingTop: RFValue(30)}}>
      <View style={{}}>
        <Slider
          value={state.value}
          // thumbImage={() => <FastImage source={BACKGROUND_IMG} style={{ height: 10, width: 10 }} />}
          // step={0.5}
          minimumTrackTintColor={'transparent'}
          maximumTrackTintColor={'transparent'}
          minimumValue={0}
          maximumValue={10}
          // thumbStyle={{ bottom: RFValue(28) }}
          style={{}}
          thumbTouchSize={{width: Dimensions.get('window').width, height: 100}}
          trackStyle={{height: RFValue(40), width: RFValue(40)}}
          thumbStyle={{height: RFValue(70), width: RFValue(40)}}
          customThumb={
            <View style={{zIndex: 10}}>
              <View
                style={{
                  width: RFValue(40),
                  height: RFValue(40),
                  borderRadius: 90,
                  transform: [{rotate: '45deg'}],
                  borderTopLeftRadius: 90,
                  borderTopRightRadius: 90,
                  borderBottomLeftRadius: 90,
                  borderBottomRightRadius: 0,
                  backgroundColor: state.currentColor,
                }}></View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AppText size={3} bold={true}>
                  {state.value.toFixed(1)}
                </AppText>
              </View>
            </View>
          }
          onValueChange={(value) => {
            if (onChange) onChange(value);

            let pickedColor = SLIDER_COLORS[Math.ceil(value)];
            setState((prev) => ({
              ...prev,
              currentColor: `rgb(${pickedColor?.r},${pickedColor?.g},${pickedColor?.b})`,
              value: value,
            }));
          }}
        />
        <View style={{marginLeft: RFValue(15), marginRight: RFValue(15)}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[AppTheme.colors.red, AppTheme.colors.green]}
            style={{zIndex: -1, bottom: 0, height: RFValue(3), width: '100%'}}
          />
        </View>
      </View>
    </View>
  );
};

export {AppCustomSlider};
