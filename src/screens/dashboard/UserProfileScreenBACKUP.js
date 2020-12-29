

import React, { useEffect, useRef, useState } from 'react';
import { LayoutAnimation, Platform, ScrollView, TouchableOpacity, UIManager, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { BACKGROUND_IMG } from '../../../assets/images';
import { AppGoldCoin, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { AppLogger } from '../../utils/AppHelperMethods';
import { FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '../../utils/AppIcons';
import { UserProfileTabs } from './UserProfileTabs/UserProfileTabs';

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UserProfileScreen = ({ navigation, route, }) => {
    let [state, setState] = useState({
        loading: false,
        LHeight: 0,
        LWidth: 0,
        bioShowMoreLines: 3,
        scrollPosition: 0,

        //for scroll to stick tab header to the top:-
        enableScrollViewScroll: true
    });
    let ScrollRef = useRef(null);
    useEffect(() => {

    }, [ScrollRef])

    const TRANS_BLACK = 'rgba(0,0,0,0.0)';
    const BLACK = 'black';
    const COLORS_ARR = [AppTheme.colors.darkGrey, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, BLACK, BLACK];

    AppLogger('---------SCROLL STATUS-------', state.enableScrollViewScroll)
    return (
        <View
            onStartShouldSetResponder={() => {
                setState(prev => ({ ...prev, enableScrollViewScroll: true }))
            }}
            style={{ flex: 1, backgroundColor: 'black', }} onLayout={(event) => {
                var { x, y, width, height } = event.nativeEvent.layout;
                setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
            }}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, state.enableScrollViewScroll ? { top: 0, position: 'absolute', left: 0, right: 0, zIndex: 10 } : {}]}>
                <View style={{ flex: 0.3 }}>
                    <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(10) }} />
                </View>
                <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={() => navigation.navigate("UserProfileCustomizeScreen")}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5 name="brush" style={{ fontSize: RFValue(20), color: 'white' }} />
                        <AppText style={{ paddingLeft: RFValue(15) }} >Customize</AppText>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 0.3 }}>
                    <SimpleLineIcons onPress={() => navigation.navigate("AppSettingsScreen")} name="settings" style={{ fontSize: RFValue(24), textAlign: 'right', padding: RFValue(10), color: 'white' }} />
                </View>
            </View>

            <ScrollView style={{}}
                ref={ref => ScrollRef = ref}
                nestedScrollEnabled={true}
                scrollEnabled={state.enableScrollViewScroll}
                onScroll={(event) => {
                    if (event?.nativeEvent?.contentOffset?.y) {
                        event.persist();
                        let scollNum = event?.nativeEvent?.contentOffset?.y || 3
                        if (scollNum > (state.LHeight * 1.2)) {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                            if (state.enableScrollViewScroll)
                                setState(prev => ({ ...prev, enableScrollViewScroll: false }))
                        }
                    }
                }}
                scrollEventThrottle={1}>
                <View style={{}}>
                    <View style={{ height: state.LHeight, width: state.LWidth }}>
                        <FastImage source={BACKGROUND_IMG} style={{ height: state.LHeight, width: state.LWidth, }} >
                            <LinearGradient colors={COLORS_ARR} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <UserAvatar corner={user?.corner || ''} color={user?.cornerColor} size={100} />
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

                    <View style={{ padding: RFValue(10) }}>
                        <AppText onPress={() => {
                            setState(prev => ({ ...prev, bioShowMoreLines: state.bioShowMoreLines === 3 ? 10 : 3 }))
                        }} lines={state.bioShowMoreLines} style={{}}>Lorem ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, </AppText>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            setState(prev => ({ ...prev, bioShowMoreLines: state.bioShowMoreLines === 3 ? 10 : 3 }))
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AppText color={AppTheme.colors.lightGrey} style={{ paddingVertical: RFValue(10) }}>{state.bioShowMoreLines === 3 ? "More about me" : "Less about me"} </AppText>
                                <MaterialIcons name={state.bioShowMoreLines === 3 ? "keyboard-arrow-down" : "keyboard-arrow-up"} style={{ fontSize: RFValue(20), color: AppTheme.colors.lightGrey }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <AppText onPress={() => {
                            navigation.navigate("AppFollowersAndFollowingList", { isFollowerMode: true, userID: route?.params?.userID })
                        }} color={AppTheme.colors.primary}>112 mln <AppText color={AppTheme.colors.lightGrey}>Followers</AppText></AppText>
                        <AppText onPress={() => {
                            navigation.navigate("AppFollowersAndFollowingList", { isFollowerMode: false, userID: route?.params?.userID })
                        }} color={AppTheme.colors.primary}>1123 <AppText color={AppTheme.colors.lightGrey}>Followings</AppText></AppText>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("EditUserProfileScreen")}>
                        <View style={{ marginVertical: RFValue(25), marginHorizontal: RFValue(10), borderWidth: 1, borderColor: AppTheme.colors.lightGrey, borderRadius: 90, padding: RFValue(10), justifyContent: 'center', alignItems: 'center' }}>
                            <AppText size={2} color={AppTheme.colors.lightGrey} bold={true}>EDIT PROFILE</AppText>
                        </View>
                    </TouchableOpacity>

                </View>

                <View
                    style={{ height: state.LHeight, width: state.LWidth, }}>
                    <UserProfileTabs navigation={navigation} route={route}
                        scrollPosition={({ scroll, index }) => {
                            AppLogger('---------', index)
                            if (scroll && scroll < 300 && index < 3)
                                setState(prev => ({ ...prev, enableScrollViewScroll: true }));
                        }}
                        autoPlay={!state.enableScrollViewScroll}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export { UserProfileScreen };