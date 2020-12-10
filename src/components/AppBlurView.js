import { BlurView } from "@react-native-community/blur";
import React from 'react';
import { StyleSheet } from 'react-native';
const AppBlurView = () => {
    return (
        <BlurView
            style={styles.blurContainer}
            blurType="light"
            blurAmount={2}
            reducedTransparencyFallbackColor="white"
        />
    );
};
const styles = StyleSheet.create({
    blurContainer: {
        position: 'absolute', zIndex: -1, top: 0, justifyContent: 'center', alignItems: 'center', bottom: 0, left: 0, right: 0
    }
})
export { AppBlurView };