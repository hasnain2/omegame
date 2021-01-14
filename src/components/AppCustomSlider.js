// import Slider from '@react-native-community/slider';
import Slider from 'react-native-custom-slider';
import React, { useState } from "react";
import { View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";
import { AppTheme } from "../config";
import { AppText } from './AppText';

const AppCustomSlider = ({ onChange }) => {
    const [state, setState] = useState({ value: 5 })
    return (
        <View style={{ paddingTop: RFValue(30) }}>

            <View style={{}} >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[AppTheme.colors.red, AppTheme.colors.green]}
                    style={{ position: 'absolute', bottom: RFValue(18), height: RFValue(3), width: '100%' }} />

                <Slider
                    value={state.value}
                    // thumbImage={() => <FastImage source={BACKGROUND_IMG} style={{ height: 10, width: 10 }} />}
                    step={0.5}

                    trackStyle={{ height: 100 }}
                    minimumTrackTintColor={'transparent'}
                    maximumTrackTintColor={'transparent'}
                    minimumValue={0}
                    maximumValue={10}
                    // thumbStyle={{ bottom: RFValue(28) }}
                    customThumb={
                        <>
                            <View
                                style={{
                                    width: RFValue(40),
                                    height: RFValue(40),
                                    borderRadius: 90,
                                    // transform: [{ rotate: '45deg' }],
                                    // borderTopLeftRadius: 90,
                                    // borderTopRightRadius: 90,
                                    // borderBottomLeftRadius: 90,
                                    // borderBottomRightRadius: 0,
                                    backgroundColor: state.value > 5 ? AppTheme.colors.green : AppTheme.colors.red
                                }}
                            >
                            </View>
                            <View style={{
                                position: 'absolute',
                                top: 0, left: 0,
                                bottom: 0,
                                right: 0,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <AppText size={3} bold={true}>{state.value.toFixed(1)}</AppText>
                            </View>


                        </>
                    }


                    onValueChange={value => {
                        if (onChange)
                            onChange(value)
                        setState(prev => ({ ...prev, value: value }))
                    }}
                />

            </View>


        </View>
    )
}

export { AppCustomSlider };
