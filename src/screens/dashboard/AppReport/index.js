

import React from 'react';
import { View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppBackButton, AppText } from '../../../components';
import { REPORT_TYPE } from '../../../utils/AppConstants';

const AppReport = ({ navigation, route, }) => {

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppBackButton navigation={navigation} name={"REPORT A PROBLEM"} />
            </View>
            <KeyboardAvoidingScrollView >
                <View style={{ padding: RFValue(15) }}>
                    <AppText style={{ fontSize: RFValue(24), fontWeight: 'bold' }} >What do you want to report?{"\n"}</AppText>

                    {REPORT_TYPE.map(item => (
                        <AppText onPress={() => {
                            navigation.navigate(item.nav)
                        }} style={{ paddingVertical: RFValue(10) }} >{item.name}</AppText>
                    ))}
                </View>
            </KeyboardAvoidingScrollView>
        </View>
    );
};

export { AppReport };
