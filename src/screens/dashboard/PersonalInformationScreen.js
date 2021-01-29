

import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppHeaderCommon, AppText } from '../../components';
import { AppTheme } from '../../config';

const renderOptionItem = (label, value) =>
    <View style={{ paddingVertical: RFValue(10) }} >
        <AppText color={AppTheme.colors.lightGrey} size={1}>{label}</AppText>
        <AppText color={'white'} size={2} style={{ paddingTop: RFValue(5) }}>{value}</AppText>
    </View>

const PersonalInformationScreen = ({ navigation, route, }) => {
    const { user } = useSelector(state => state.root);

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppHeaderCommon navigation={navigation} label={"PERSONAL INFORMATION"} />
            <View style={{ flex: 1, padding: RFValue(20) }}>
                <AppText size={2} color={AppTheme.colors.lightGrey}>Your personal information won't be part of your public profile.</AppText>
                <View style={{ paddingTop: RFValue(20) }}>
                    {renderOptionItem("Username:", user.userName)}
                    {renderOptionItem("E-mail:", user.email)}
                    {renderOptionItem("Gender:", user.gender || user?.gender || "")}
                    {renderOptionItem("Date of Birth:", user?.dateOfBirth ? moment(user?.dateOfBirth).format('DD / MM / YYYY') : '')}
                </View>
            </View>
        </View>
    );
};

export { PersonalInformationScreen };
