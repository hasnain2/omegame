

import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_ACCOUNT_SETTINGS, ICON_GAMEOVER, ICON_INFO, ICON_NOTIFICATION, ICON_PRIVATE, ICON_SAVE_POST } from '../../../assets/icons';
import { AppBackButton, AppSwitchButton, AppText } from '../../components';
import { AppTheme } from '../../config';
import { setUser } from '../../redux/reducers/userSlice';
import { store } from '../../redux/store';
import { UpdateProfile } from '../../services';
import { LogOutUser } from '../../services/authService';
import { EvilIcons } from '../../utils/AppIcons';
import { storeData } from '../../utils/AppStorage';

const ICONSTYLE = { height: RFValue(30), width: RFValue(30), tintColor: 'white' }
const AppSettingsScreen = ({ navigation, route, }) => {
    let { user } = useSelector(state => state.root)
    let [state, setState] = useState({
        loading: false,
        isNotificationOn: true,
        accountSettingDetails: false,
        infoHelpDetails: false,
    })
    const rendListItem = (Iconn, name, toggle) => {
        return (
            <View pointerEvents={'none'} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 0.15, padding: RFValue(8) }}>
                    <Image source={Iconn} style={ICONSTYLE} />
                </View>
                <View style={{ flex: 1, }}>
                    <AppText size={2} >{name}</AppText>
                </View>
                <View style={{ flex: 0.3, }}>
                    {name === "Notifications" || name === "Private Account" ?
                        <AppSwitchButton value={toggle} />
                        :
                        null}
                </View>
            </View>
        )
    }

    const rendOptionsItem = (name) => {
        return (
            <View style={{ flexDirection: 'row', paddingBottom: RFValue(10) }}>
                <AppText size={2} color={AppTheme.colors.lightGrey} style={{}}>{name}</AppText>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppBackButton navigation={navigation} />

            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ padding: RFValue(10) }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        navigation.navigate("UserSavedPosts")
                    }}>
                        {rendListItem(ICON_SAVE_POST, "Saved Posts", false)}
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, isNotificationOn: !state.isNotificationOn }))
                    }}>
                        {rendListItem(ICON_NOTIFICATION, "Notifications", state.isNotificationOn)}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        UpdateProfile((res) => {
                            if (res) {
                                let tempUser = { ...store.getState().root.user };
                                tempUser.isPrivate = !user.isPrivate;
                                storeData('user', tempUser)
                                store.dispatch(setUser(tempUser));
                            }
                        }, { isPrivate: !user.isPrivate });
                    }}>
                        {rendListItem(ICON_PRIVATE, "Private Account", user.isPrivate)}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, accountSettingDetails: !state.accountSettingDetails, infoHelpDetails: false }))
                    }}>
                        {rendListItem(ICON_ACCOUNT_SETTINGS, "Account Settings", false)}
                    </TouchableOpacity>
                    {state.accountSettingDetails ?
                        <View style={{ paddingLeft: RFValue(50) }}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate("PersonalInformationScreen")
                            }}>
                                {rendOptionsItem("Personal Information")}
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate("ChangePasswordScreen");
                            }}>
                                {rendOptionsItem("Change Password")}
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate("RequestVerificationScreen");
                            }}>
                                {rendOptionsItem("Request Verification")}
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate("BlockedAccounts");
                            }}>
                                {rendOptionsItem("Blocked Account")}
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate("DeleteAccount")
                            }}>
                                {rendOptionsItem("Delete account")}
                            </TouchableOpacity>
                        </View>
                        : null}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, infoHelpDetails: !state.infoHelpDetails, accountSettingDetails: false }))
                    }}>
                        {rendListItem(ICON_INFO, "Info & Help", false)}
                    </TouchableOpacity>

                    {state.infoHelpDetails ?
                        <View style={{ paddingLeft: RFValue(50) }}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {

                            }}>
                                {rendOptionsItem("App Version")}
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate("DataPolicyScreen")
                            }}>
                                {rendOptionsItem("Data Policy")}
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate('TermsAndConditions')
                            }}>
                                {rendOptionsItem("Terms of Use")}
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => {

                            }}>
                                {rendOptionsItem("Report a problem")}
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => {

                            }}>
                                {rendOptionsItem("Help Center")}
                            </TouchableOpacity>
                        </View>
                        : null}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        Alert.alert(
                            "Logout",
                            "Are you sure you want to logout?",
                            [{
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            }, {
                                text: "LOGOUT", onPress: () => {
                                    LogOutUser((dta) => { });
                                }
                            }], { cancelable: false });
                    }}>
                        {rendListItem(ICON_GAMEOVER, "Gameover", false)}
                    </TouchableOpacity>

                </View>

                <View style={{ borderTopColor: AppTheme.colors.lightGrey, borderTopWidth: 0.5, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', padding: RFValue(25) }}>
                    <EvilIcons name="star" style={{ fontSize: RFValue(20), color: AppTheme.colors.lightBlue }} />
                    <AppText size={2} color={AppTheme.colors.lightBlue} >Leave a feedback</AppText>
                </View>

            </View>
        </View>

    );
};

export { AppSettingsScreen };
