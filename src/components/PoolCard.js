
import React, { useState } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppText } from '../components';
import { AppTheme } from '../config';
import { AppButton } from './AppButton';
import { AppGradientContainer } from './AppGradientContainer';
import { AppRadioButton } from './AppRadioButton';
import { PostPoolBottomBar } from './PostPoolBottomBar';
import { PostPoolTopBar } from './PostPoolTopBar';
const PoolCard = ({ item, navigation, onMenuPress, bookmarkPress, likePress }) => {
    let [state, setState] = useState({
        selectedOption: 99999,
        voded: false
    })
    return (
        <View style={{ borderBottomColor: AppTheme.colors.darkGrey, borderBottomWidth: 0.5 }}>
            <PostPoolTopBar item={item} navigation={navigation} onMenuPress={onMenuPress} />
            <AppText size={1} style={{ padding: RFValue(15), paddingTop: 0 }}>{item.question}</AppText>

            {state.voded ?
                <View style={{ paddingHorizontal: RFValue(15) }}>
                    {item.options.map((itm, ind) => (
                        <View style={{ paddingVertical: RFValue(10) }}>
                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <View style={{ flex: 0.16, }}>
                                    <AppText color={AppTheme.colors.lightGrey} size={2}>{itm.votes + "%"}</AppText>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <AppText color={'white'} size={2}>{itm.label}</AppText>
                                </View>
                            </View>

                            <View style={{ width: '100%', height: RFValue(10), paddingVertical: RFValue(3) }}>
                                <AppGradientContainer style={{ height: RFValue(10), width: itm.votes + '%', borderRadius: 10 }}>

                                </AppGradientContainer>
                            </View>
                        </View>
                    ))}
                </View>
                :
                <>
                    <View style={{ paddingHorizontal: RFValue(15) }}>
                        {item.options.map((itm, ind) => (
                            <AppRadioButton key={ind + 'sd'} onPress={() => { setState(prev => ({ ...prev, selectedOption: ind })) }} val={state.selectedOption === ind} size={16} label={itm.label} style={{ paddingVertical: RFValue(10) }} />
                        ))}
                    </View>

                    <View style={{ flex: 1, padding: RFValue(15), justifyContent: 'center' }}>
                        <AppButton onPress={() => { setState(prev => ({ ...prev, voded: true })) }} label={"Vote"} />
                    </View>

                </>
            }

            <AppText size={1} color={AppTheme.colors.lightGrey} style={{ textAlign: 'center', padding: RFValue(5) }}>TIME LEFT: 3d 4h 50m</AppText>
            <PostPoolBottomBar item={item} navigation={navigation} likePress={likePress} bookmarkPress={bookmarkPress} />
        </View>
    )
};

export { PoolCard };
