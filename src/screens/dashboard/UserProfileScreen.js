

import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, TouchableOpacity, UIManager, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { ICON_BLOCK, ICON_CUSTOMIZE, ICON_MENU, ICON_MUTE, ICON_REPORT, ICON_SETTINGS, ICON_UNFOLLOW } from '../../../assets/icons';
import { BACKGROUND_IMG, DEFAULT_USER_PIC } from '../../../assets/images';
import { AppBackButton, AppButton, AppGoldCoin, AppLoadingView, AppModal, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { setUser } from '../../redux/reducers/userSlice';
import { GetPostsOfSpecificUser, RemovePostsOfUserFromReduxStore } from '../../services';
import { ActionsOnUsers, GetSingleUserProfile } from '../../services/profileService';
import { FRIEND_STATUSES_ACTIONS } from '../../utils/AppConstants';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { MaterialIcons } from '../../utils/AppIcons';
import { UserProfileTabs } from './UserProfileTabs/UserProfileTabs';

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const TRANS_BLACK = 'rgba(0,0,0,0.0)';
const BLACK = 'black';
const COLORS_ARR = [AppTheme.colors.darkGrey, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, BLACK, BLACK];

const UserProfileScreen = ({ navigation, route, }) => {
    let userID = route.params.userID || false;
    let user = useSelector(state => state.root.user)
    let disp = useDispatch();
    userID = (user?._id || user?._id) === userID;

    let [state, setState] = useState({
        loading: true,
        showMenu: false,
        LHeight: 0,
        LWidth: 0,
        bioShowMoreLines: 3,
        scrollPosition: 0,
        enableScrollViewScroll: true,
        userData: userID ? user : null
    });


    let ScrollRef = useRef(null);
    useEffect(() => {
        GetSingleUserProfile((profileRes) => {
            if (profileRes) {
                setState(prev => ({ ...prev, loading: false, userData: profileRes }))
                if (userID)
                    disp(setUser(profileRes))
                debugger
            } else
                setState(prev => ({ ...prev, loading: false }))
        }, route.params.userID)
        GetPostsOfSpecificUser((postsOfUser) => {

        }, route.params.userID)
    }, [ScrollRef])


    function followuser() {
        let tempUserObj = state.userData;
        ActionsOnUsers(() => {

        }, route.params.userID, tempUserObj?.isFollowing ? FRIEND_STATUSES_ACTIONS.UNFOLLOW : FRIEND_STATUSES_ACTIONS.FOLLOW)

        tempUserObj["isFollowing"] = !(tempUserObj?.isFollowing || false);
        setState(prev => ({ ...prev, userData: tempUserObj }));
    }
    userData = userID ? user : state.userData;
    return (
        <View onStartShouldSetResponder={() => {
            setState(prev => ({ ...prev, enableScrollViewScroll: true }))
        }} style={{ flex: 1, backgroundColor: 'black', }} onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
        }}>
            {state.loading ?
                <AppLoadingView />
                : null}
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, state.enableScrollViewScroll ? { top: 0, position: 'absolute', left: 0, right: 0, zIndex: 10 } : { backgroundColor: 'black', }]}>
                <AppBackButton navigation={navigation} />

                {userID ?
                    <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={() => navigation.navigate("UserProfileCustomizeScreen")}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={ICON_CUSTOMIZE} name="brush" style={{ tintColor: 'white', height: RFValue(30), width: RFValue(30) }} />
                            <AppText size={2} style={{ paddingLeft: RFValue(15) }} >Customize</AppText>
                        </View>
                    </TouchableOpacity>
                    : null}
                {userID ?
                    <TouchableOpacity onPress={() => navigation.navigate("AppSettingsScreen")} style={{ flex: 0.3, alignItems: 'flex-end', padding: RFValue(10), }}>
                        <Image source={ICON_SETTINGS} style={{ tintColor: 'white', height: RFValue(30), width: RFValue(30) }} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => setState(prev => ({ ...prev, showMenu: true }))} style={{ flex: 0.3, alignItems: 'flex-end', padding: RFValue(10), }}>
                        <Image source={ICON_MENU} style={{ tintColor: 'white', height: RFValue(30), width: RFValue(30) }} />
                    </TouchableOpacity>}
            </View>

            <ScrollView
                style={{ flex: 1 }}
                ref={ref => ScrollRef = ref}
                decelerationRate={0.2}
                nestedScrollEnabled={true}
                scrollEventThrottle={1}>
                <View style={{}}>
                    <View style={{ height: state.LHeight, width: state.LWidth }}>
                        <FastImage source={userData?.cover ? { uri: userData?.cover } : BACKGROUND_IMG} style={{ height: state.LHeight, width: state.LWidth, }} >
                            <LinearGradient colors={COLORS_ARR} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                <UserAvatar corner={userData?.corner || ''}  source={userID ? user?.pic ? { uri: user.pic } : userData?.pic ? { uri: userData.pic } : DEFAULT_USER_PIC : userData?.pic ? { uri: userData.pic } : DEFAULT_USER_PIC} size={100} />

                                {userID ?
                                    <View style={{ flexDirection: 'row', paddingVertical: RFValue(15), alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                                            <AppGoldCoin />
                                            <AppText size={3} style={{ paddingHorizontal: RFValue(5) }}>{largeNumberShortify(userData?.earnedCoins || 0)}</AppText>
                                        </View>
                                        <View style={{ flex: 0.54 }}>
                                            <ProgressBar style={{ height: RFValue(10), borderRadius: 3 }} progress={(userData?.earnedXps || 0) / 100} color={AppTheme.colors.primary} />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                                            <AppText size={1} bold={true} style={{}}>XP {largeNumberShortify(userData?.earnedXps)}/100</AppText>
                                        </View>
                                    </View>
                                    : null}
                                <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(10), paddingBottom: RFValue(10), justifyContent: 'space-between', }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                            <AppText size={3} bold={true} >{userData?.firstName || ''}</AppText>
                                            <IsUserVerifiedCheck check={userData?.isVerified} />
                                        </View>
                                        <AppText size={1} color={AppTheme.colors.lightGrey} style={{}}>{userData?.userName}</AppText>
                                    </View>
                                    <View style={{ borderRadius: RFValue(5), borderWidth: 1, justifyContent: 'center', padding: RFValue(10), alignItems: 'center', borderColor: AppTheme.colors.primary }}>
                                        <AppText size={1} color={AppTheme.colors.primary} bold={true} style={{}}>LEVEL</AppText>
                                        <AppText size={4} color={AppTheme.colors.primary} bold={true} style={{}}>{userData?.level}</AppText>
                                    </View>
                                </View>
                            </LinearGradient>
                        </FastImage>
                    </View>

                    <View style={{ padding: RFValue(10) }}>
                        <AppText onPress={() => {
                            setState(prev => ({ ...prev, bioShowMoreLines: state.bioShowMoreLines === 3 ? 10 : 3 }))
                        }} lines={state.bioShowMoreLines} style={{}}>{userData?.bio}</AppText>
                        {userData?.bio ?
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                setState(prev => ({ ...prev, bioShowMoreLines: state.bioShowMoreLines === 3 ? 10 : 3 }))
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AppText size={2} color={AppTheme.colors.lightGrey} style={{ paddingVertical: RFValue(10) }}>{state.bioShowMoreLines === 3 ? "More about me" : "Less about me"} </AppText>
                                    <MaterialIcons name={state.bioShowMoreLines === 3 ? "keyboard-arrow-down" : "keyboard-arrow-up"} style={{ fontSize: RFValue(20), color: AppTheme.colors.lightGrey }} />
                                </View>
                            </TouchableOpacity>
                            : null}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <AppText size={2}
                            style={{ paddingVertical: RFValue(15) }}
                            onPress={() => {
                                navigation.push("AppFollowersAndFollowingList", { isFollowerMode: true, userID: route?.params?.userID })
                            }} color={AppTheme.colors.primary}>{userData?.followers} <AppText size={2} color={AppTheme.colors.lightGrey}>Followers</AppText></AppText>
                        <AppText size={2}
                            style={{ paddingVertical: RFValue(15) }}
                            onPress={() => {
                                navigation.push("AppFollowersAndFollowingList", { isFollowerMode: false, userID: route?.params?.userID })
                            }} color={AppTheme.colors.primary}>{userData?.following} <AppText size={2} color={AppTheme.colors.lightGrey}>Followings</AppText></AppText>
                    </View>

                    {userID ?
                        <TouchableOpacity style={{}} activeOpacity={0.7} onPress={() => navigation.navigate("EditUserProfileScreen", { data: userData })}>
                            <View style={{ marginHorizontal: RFValue(10), borderWidth: 1, borderColor: AppTheme.colors.lightGrey, borderRadius: 90, padding: RFValue(10), justifyContent: 'center', alignItems: 'center' }}>
                                <AppText size={2} color={AppTheme.colors.lightGrey} bold={true}>EDIT PROFILE</AppText>
                            </View>
                        </TouchableOpacity>
                        :
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(25) }}>
                            <View style={{ flex: 1, paddingRight: RFValue(10) }}>
                                <AppButton onPress={() => {
                                    followuser();
                                }} fill={true} label={userData?.isFollowing ? "UNFOLLOW" : "FOLLOW"} />
                            </View>
                            <View style={{ flex: 1, paddingLeft: RFValue(5) }}>
                                <AppButton onPress={() => {
                                    if (userData)
                                        navigation.push('ChatWindow', { friend: userData })
                                }} label={"MESSAGE"} />
                            </View>
                        </View>
                    }
                </View>

                <View
                    style={{ height: state.LHeight - RFValue(50), width: state.LWidth, }}>
                    <UserProfileTabs
                        userID={route.params.userID}
                        navigation={navigation}
                        route={route}
                        scrollPosition={({ scroll, index }) => {
                            if (scroll && scroll < 300 && index < 3)
                                setState(prev => ({ ...prev, enableScrollViewScroll: true }));
                        }}
                        decelerationRate={0.2}
                        autoPlay={state.enableScrollViewScroll === false ? true : false}
                    />
                </View>

            </ScrollView>

            <AppModal show={state.showMenu}
                type={"bottom"}
                toggle={() => { setState(prev => ({ ...prev, showMenu: '' })) }}
            >
                <View style={{ backgroundColor: 'black', width: Dimensions.get('screen').width, paddingBottom: RFValue(40) }}>
                    <View style={{ height: RFValue(3), margin: RFValue(10), width: RFValue(40), backgroundColor: AppTheme.colors.lightGrey, alignSelf: 'center', borderRadius: 20 }} />

                    <TouchableOpacity onPress={() => {
                        // modify post
                        setState(prev => ({ ...prev, showMenu: false }))
                    }} style={styles.modalListItemStyle}>
                        <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                            <Image source={ICON_REPORT} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                        </View>
                        <AppText size={2} color="white" style={{ flex: 1 }}>Report</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        // modify post
                        setState(prev => ({ ...prev, showMenu: false }))
                    }} style={styles.modalListItemStyle}>
                        <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                            <Image source={ICON_MUTE} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                        </View>
                        <AppText size={2} color="white" style={{ flex: 1 }}>Mute</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        followuser();
                        setState(prev => ({ ...prev, showMenu: false }))
                    }} style={styles.modalListItemStyle}>
                        <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                            <Image source={ICON_UNFOLLOW} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                        </View>
                        <AppText size={2} color="white" style={{ flex: 1 }}>{userData?.isFollowing ? "Unfollow" : "Follow"}</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        // modify post
                        RemovePostsOfUserFromReduxStore(route.params.userID)
                        navigation.goBack();
                        ActionsOnUsers(() => {

                        }, route.params.userID, FRIEND_STATUSES_ACTIONS.BLOCKED)
                        setState(prev => ({ ...prev, showMenu: false }))
                    }} style={styles.modalListItemStyle}>
                        <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                            <Image source={ICON_BLOCK} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                        </View>
                        <AppText size={2} color="white" style={{ flex: 1 }}>Block</AppText>
                    </TouchableOpacity>

                </View>
            </AppModal>

        </View>
    );
};

const styles = StyleSheet.create({
    modalListItemStyle: { flexDirection: 'row', alignItems: 'center', padding: RFValue(10), paddingHorizontal: RFValue(20) },
    modalIconStyle: { fontSize: RFValue(25), flex: 0.15, color: 'white' },
})

export { UserProfileScreen };
