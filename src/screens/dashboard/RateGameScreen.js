

import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { BACKGROUND_IMG } from '../../../assets/images';
import { AppButton, AppCustomSlider, AppText, UserAvatar } from '../../components';
import { AppTheme } from '../../config';
import { Ionicons } from '../../utils/AppIcons';

const RateGameScreen = ({ navigation, route, }) => {
    let [state, setState] = useState({
        loading: false,
        selectedConsole: 'Ps4'
    })

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(20) }} />
            </View>

            <KeyboardAvoidingScrollView >

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(15) }}>
                    <UserAvatar source={BACKGROUND_IMG} size={50} />

                    <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(15), paddingVertical: RFValue(10), justifyContent: 'space-between', }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <AppText size={3} color={'white'} bold={true} style={{}}>Game Name</AppText>
                            <AppText size={2} color={AppTheme.colors.lightGrey} style={{}}>Console game</AppText>
                            <AppText size={1} color={AppTheme.colors.lightGrey} style={{}}>Release date: DD month YYYY</AppText>
                        </View>
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.7}  onPress={() => {

                }}>
                    <View style={{ padding: RFValue(15), borderBottomColor: AppTheme.colors.lightGrey, borderBottomWidth: 0.4 }}>
                        <AppText size={3} color={'white'} style={{}}>Choose the console you wish to rate:</AppText>
                        <AppText size={3} color={AppTheme.colors.primary} bold={true} style={{ paddingTop: RFValue(10) }}>{state.selectedConsole}</AppText>
                    </View>
                </TouchableOpacity>

                <View style={{ padding: RFValue(15), borderBottomColor: AppTheme.colors.lightGrey, borderBottomWidth: 0.4 }}>
                    <AppText size={3} color={'white'} style={{}}>How much did you like this game?</AppText>
                    <AppCustomSlider />
                </View>


                <View style={{ flexDirection: 'row', padding: RFValue(20) }}>
                    <UserAvatar size={40} />
                    <TextInput placeholder={"Let us know what do you think about this game..."}
                        placeholderTextColor={AppTheme.colors.lightGrey}
                        style={{ flex: 1, color: 'white', height: '100%', marginLeft: RFValue(10) }}
                        onChangeText={(val) => { setState(prev => ({ ...prev, whatsNewText: val })) }}
                    />
                </View>

                <View style={{ padding: RFValue(15) }}>
                    <AppButton bgColor="black" onPress={() => { }} label={"RATE THIS GAME"} />
                </View>

            </KeyboardAvoidingScrollView>
        </View>
    );
};

export { RateGameScreen };
