

import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BACKGROUND_IMG } from '../../../assets/images';
import { AppGoldCoin, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { Ionicons, MaterialIcons } from '../../utils/AppIcons';
import { OmegaStoreTabs } from '../OmegaStore/OmegaStoreTabs';
import { CustomizeTabs } from './CustomizeProfileTabs/CustomizeTabs';
import { UserProfileTabs } from './UserProfileTabs/UserProfileTabs';
const UserProfileCustomizeScreen = ({ navigation, route, }) => {
    let [state, setState] = useState({
        loading: false,
        LHeight: 0,
        LWidth: 0,
        bioShowMoreLines: 3,
    })
    const TRANS_BLACK = 'rgba(0,0,0,0.0)';
    const BLACK = 'black';
    const COLORS_ARR = [AppTheme.colors.darkGrey, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, BLACK, BLACK];

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }} onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
        }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
                <View style={{ flex: 0.3 }}>
                    <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(10) }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} />
                <View style={{ flex: 0.3 }} />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: state.LHeight, width: state.LWidth }}>
                    <FastImage source={BACKGROUND_IMG} style={{ height: state.LHeight, width: state.LWidth, }} >
                        <LinearGradient colors={COLORS_ARR} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <UserAvatar size={100} />
                            <View style={{ flexDirection: 'row', paddingVertical: RFValue(15), alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                                    <AppGoldCoin />
                                    <AppText style={{ paddingHorizontal: RFValue(10) }}>1123</AppText>
                                </View>
                                <View style={{ flex: 0.55 }}>
                                    <ProgressBar style={{ height: RFValue(10), borderRadius: 3 }} progress={0.5} color={AppTheme.colors.primary} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                                    <AppText size={1} bold={true} style={{}}>XP 50/100</AppText>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(10), paddingBottom: RFValue(10), justifyContent: 'space-between', }}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <AppText size={2} color={AppTheme.colors.lightGrey} bold={true} style={{}}>Username <IsUserVerifiedCheck check={true} /></AppText>
                                    <AppText size={1} color={AppTheme.colors.lightGrey} style={{}}>NickName</AppText>
                                </View>
                                <View style={{ borderRadius: RFValue(5), borderWidth: 1, justifyContent: 'center', padding: RFValue(10), alignItems: 'center', borderColor: AppTheme.colors.primary }}>
                                    <AppText size={1} color={AppTheme.colors.primary} bold={true} style={{}}>LEVEL</AppText>
                                    <AppText size={4} color={AppTheme.colors.primary} bold={true} style={{}}>1123</AppText>
                                </View>
                            </View>
                        </LinearGradient>
                    </FastImage>
                </View>




                <CustomizeTabs navigation={navigation} route={route} />
            </ScrollView>
        </View>
    );
};

export { UserProfileCustomizeScreen };
