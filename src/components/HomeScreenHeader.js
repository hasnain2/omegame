

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_CHAT, ICON_NOTIFICATION } from '../../assets/icons';
import { DEFAULT_USER_PIC } from '../../assets/images';
import { UserAvatar } from '../components/UserAvatar';
import { AppTheme } from '../config';
import { AppBadge } from './AppBadge';

const HomeScreenHeader = ({ route, navigation }) => {
    let user = useSelector(state => state.root.user)
    return (
        <View style={{ backgroundColor: AppTheme.colors.darkGrey, padding: RFValue(10), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                navigation.navigate("UserProfileScreen", { userID: user._id })
            }}>
                <View pointerEvents={'none'} style={{ padding: RFValue(5) }}>
                    <AppBadge count={0} />
                    <UserAvatar source={user?.pic ? { uri: user.pic } : DEFAULT_USER_PIC} size={30} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                navigation.navigate("NotificationScreen")
            }}>
                <View pointerEvents={'none'} style={{}}>
                    <AppBadge count={15} />
                    <FastImage source={ICON_NOTIFICATION} style={{ height: RFValue(40), width: RFValue(40) }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                navigation.navigate("InboxScreen");
            }}>
                <View pointerEvents={'none'} style={{}}>
                    <AppBadge count={4} />
                    <FastImage source={ICON_CHAT} style={{ height: RFValue(40), width: RFValue(40) }} />
                </View>
            </TouchableOpacity>
        </View>
    );
};


export { HomeScreenHeader };
