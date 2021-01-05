import Slider from '@react-native-community/slider';
import React, { useState } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";
import { BACKGROUND_IMG } from "../../assets/images";
import { AppTheme } from "../config";
import { AppLogger } from '../utils/AppHelperMethods';



const AppCustomSlider = ({ onChange }) => {
    let [state, setState] = useState({
        value: 5
    })
    return (
        <View style={{ paddingTop: RFValue(30) }}>

            <View style={{}} >
                <Slider
                    value={state.value}
                    // thumbImage={() => <FastImage source={BACKGROUND_IMG} style={{ height: 10, width: 10 }} />}
                    step={0.5}
                    thumbTintColor={state.value<=5?AppTheme.colors.red:AppTheme.colors.green}
                    tapToSeek={true}
                    maximumValue={10}
                    minimumValue={0}
                    minimumTrackTintColor={'rgba(0,0,0,0)'}
                    maximumTrackTintColor={'rgba(0,0,0,0)'}
                    style={{ width: '100%', opacity: 1, height: 50, }}
                    onSlidingStart={value =>{
                        debugger
                   } }
                    onValueChange={value => {
                        if (onChange) {
                            onChange(value)
                        }
                        setState(prev => ({ ...prev, value: value }))
                    }}
                >
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[AppTheme.colors.red, AppTheme.colors.green]}
                        style={{ position: 'absolute', bottom: RFValue(18), height: RFValue(3), zIndex: -1, width: '100%' }} />
                </Slider>
            </View>


        </View>
    )
}

export { AppCustomSlider };
