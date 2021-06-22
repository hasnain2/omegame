import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {StyleSheet} from 'react-native';
const AppBlurView = ({children, style}) => {
  return (
    <BlurView
      style={[styles.blurContainer, style ? style : null]}
      blurType="dark"
      blurAmount={7}
      reducedTransparencyFallbackColor="black">
      {children ? children : null}
    </BlurView>
  );
};
const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export {AppBlurView};
