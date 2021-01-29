
import React from 'react';
import { Alert, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppButton, AppText } from '../../components';
import { AppTheme } from '../../config';
import { DeleteUserAccount } from '../../services';
import { Ionicons } from '../../utils/AppIcons';

const DeleteAccount = ({ navigation, route, }) => {
    const { user } = useSelector(state => state.root)

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(10) }} />
                <AppText color={AppTheme.colors.lightGrey} bold={true} size={1}>{"DELETE ACCOUNT".toUpperCase()}</AppText>
            </View>
            <View style={{ padding: RFValue(20) }}>
                <AppText size={4} bold={true} >We're sorry to see you go.</AppText>
                <AppText size={1} style={{ paddingVertical: RFValue(10) }} >Before you go...</AppText>

                <AppText onPress={() => { navigation.goBack() }} size={2} color={AppTheme.colors.lightGrey} style={{ paddingVertical: RFValue(10) }} >- If you're sick of getting notifications you can <AppText onPress={() => { navigation.goBack() }} size={2} color={AppTheme.colors.primary}>disable them here</AppText>.</AppText>
                <AppText onPress={() => { navigation.navigate("EditUserProfileScreen", { data: user, userName: true }) }} size={2} color={AppTheme.colors.lightGrey} style={{ paddingVertical: RFValue(10) }} >- If you want to change your username you can <AppText onPress={() => { }} size={2} color={AppTheme.colors.primary}>do that here</AppText>.</AppText>
                <AppText size={2} color={AppTheme.colors.lightGrey} style={{ paddingVertical: RFValue(10) }} >- Account deletion is final. <AppText onPress={() => { }} size={2} bold={true} color={AppTheme.colors.lightGrey}>You will permanently lose your profile, messages and photos</AppText>.</AppText>
            </View>
            <View style={{ paddingHorizontal: RFValue(20), paddingVertical: RFValue(10) }}>
                <AppButton fill={true} onPress={() => { navigation.goBack(); }} label={"NEVER MIND, KEEP MY ACCOUNT"} />
            </View>
            <View style={{ paddingHorizontal: RFValue(20), paddingVertical: RFValue(10) }}>
                <AppButton grey={true} bgColor={'black'} onPress={() => {
                    Alert.alert(
                        "Account deletion",
                        "Are you sure to delete your account? All data related to this account will be deleted. Proceed?",
                        [{
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "DELELTE", onPress: () => DeleteUserAccount() }
                        ], { cancelable: false });
                }} label={"DELETE MY ACCOUNT"} />
            </View>
        </View>
    );
};

export { DeleteAccount };
