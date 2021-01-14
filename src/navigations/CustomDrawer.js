import * as React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_ACCOUNT_SETTINGS, ICON_CUSTOMIZE, ICON_FEEDBACK, ICON_HOME, ICON_SAVE_POST, ICON_SHOP } from '../../assets/icons';
import { BACKGROUND_IMG, DEFAULT_USER_PIC } from '../../assets/images';
import { AppGoldCoin, AppText, IsUserVerifiedCheck, UserAvatar } from '../components';
import { AppTheme } from '../config';
import { setUser } from '../redux/reducers/userSlice';
import { store } from '../redux/store';
import { GetSingleUserProfile, UpdateUserProfile } from '../services';
import { largeNumberShortify } from '../utils/AppHelperMethods';

const LWidth = '100%';
const LHeight = '50%';
const TRANS_BLACK = 'rgba(0,0,0,0.0)';
const BLACK = 'black';
const COLORS_ARR = [AppTheme.colors.darkGrey, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, BLACK, BLACK];
const ICONSTYLE = { height: RFValue(30), width: RFValue(30), tintColor: 'white' };

const CustomDrawer = ({ state: { routeNames }, navigation }) => {
    let { user } = useSelector(state => state.root);

    React.useEffect(() => {
        UpdateUserProfile()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <FastImage source={user?.cover ? { uri: user.cover } : BACKGROUND_IMG} style={{ height: LHeight, width: LWidth, }} >
                <LinearGradient colors={COLORS_ARR} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <UserAvatar corner={user?.corner || ''} color={user?.cornerColor} source={user.pic ? { uri: user.pic } : DEFAULT_USER_PIC} size={75} />
                    <View style={{ flexDirection: 'row', padding: RFValue(15), alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                            <AppGoldCoin />
                            <AppText bold={true} size={1} style={{ paddingHorizontal: RFValue(10) }}>{largeNumberShortify(user?.earnedCoins || 0)}</AppText>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <ProgressBar style={{ height: RFValue(12), borderRadius: 3 }} progress={(user?.earnedXps || 0) / 100} color={AppTheme.colors.primary} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                            <AppText size={1} bold={true} style={{}}>XP {largeNumberShortify(user?.earnedXps || 0) || '0'}/100</AppText>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(10), paddingBottom: RFValue(10), justifyContent: 'space-between', }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <AppText size={2} color={AppTheme.colors.lightGrey} bold={true} style={{}}>{user?.userName} <IsUserVerifiedCheck check={user?.isVerified} /></AppText>
                            <AppText size={1} color={user?.nickNameColor ? user?.nickNameColor : AppTheme.colors.lightGrey}>{user?.nickName || user?.firstName || user?.userName}</AppText>
                        </View>
                        <View style={{ borderRadius: RFValue(5), borderWidth: 1, justifyContent: 'center', padding: RFValue(10), alignItems: 'center', borderColor: AppTheme.colors.primary }}>
                            <AppText size={1} color={AppTheme.colors.primary} bold={true} style={{}}>LEVEL</AppText>
                            <AppText size={4} color={AppTheme.colors.primary} bold={true} style={{}}>{user?.level || '0'}</AppText>
                        </View>
                    </View>
                </LinearGradient>
            </FastImage>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => navigation.navigate("AppFollowersAndFollowingList", { isFollowerMode: true, userID: user?._id })}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AppText bold={true} size={2} color={AppTheme.colors.primary}>{user?.followers || "0"} </AppText>
                        <AppText size={2} color={AppTheme.colors.lightGrey}>Followers</AppText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("AppFollowersAndFollowingList", { isFollowerMode: false, userID: user?._id })}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AppText bold={true} size={2} color={AppTheme.colors.primary}>{user?.following || "0"} </AppText>
                        <AppText size={2} color={AppTheme.colors.lightGrey}>Following</AppText>
                    </View>
                </TouchableOpacity>
            </View>


            <ScrollView style={{ padding: RFValue(10) }}>
                {routeNames.map((itm, indx) => {
                    let ICON = null;
                    let NAV_NAME = '';
                    if (itm === "Home") {
                        NAV_NAME = "Home"
                        ICON = () => <Image key={`${indx}key`} source={ICON_HOME} style={ICONSTYLE} />
                    } else if (itm === "UserProfileCustomizeScreen") {
                        ICON = () => <Image key={`${indx}key`} source={ICON_CUSTOMIZE} style={ICONSTYLE} />
                    } else if (itm === "OmegaStore") {
                        ICON = () => <Image key={`${indx}key`} source={ICON_SHOP} style={ICONSTYLE} />
                    } else if (itm === "UserSavedPosts") {
                        ICON = () => <Image key={`${indx}key`} source={ICON_SAVE_POST} style={ICONSTYLE} />
                    } else if (itm === "AppSettingsScreen") {
                        ICON = () => <Image key={`${indx}key`} source={ICON_ACCOUNT_SETTINGS} style={ICONSTYLE} />
                    } else if (itm === "LeaveFeedBack") {
                        ICON = () => <Image key={`${indx}key`} source={ICON_FEEDBACK} style={ICONSTYLE} />
                    }
                    if (NAV_NAME !== 'Home')
                        return (
                            <TouchableOpacity key={`${indx}key`} activeOpacity={0.7} onPress={() => {
                                if (NAV_NAME === 'Home') {
                                    navigation.toggleDrawer()
                                } else {
                                    navigation.toggleDrawer()
                                    navigation.push(itm)
                                }
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(13) }}>
                                    <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                                        {ICON()}
                                    </View>
                                    <AppText color="white" size={2} style={{ flex: 1, paddingLeft: RFValue(15) }}>{
                                        itm === "UserSavedPosts" ?
                                            "Saved Posts" :
                                            itm === "AppSettingsScreen" ? "Account Settings" :
                                                itm === "LeaveFeedBack" ? "Leave Feedback" : itm === "UserProfileCustomizeScreen" ? "Customize" : itm}</AppText>
                                </View>
                            </TouchableOpacity>
                        )
                    return null
                })}
            </ScrollView>
        </View>
    )
}

export { CustomDrawer };
