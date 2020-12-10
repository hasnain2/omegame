import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_FACEBOOK, ICON_GOOGLE, ICON_INSTAGRAM, ICON_TWITTER } from '../../assets/icons';

const AppSocialButton = ({ onPress, name }) => {
    let ICON_SIZE = RFValue(45);
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={{ borderRadius: 90, marginHorizontal: RFValue(5), padding: RFValue(2), justifyContent: 'center', alignItems: 'center', }}>
                {name === 'facebook' ?
                    <FastImage source={ICON_FACEBOOK} style={{ height: ICON_SIZE, width: ICON_SIZE }} />
                    : name === 'twitter' ?
                        <FastImage source={ICON_TWITTER} style={{ height: ICON_SIZE, width: ICON_SIZE }} />
                        : name === "instagram" ?
                            <FastImage source={ICON_INSTAGRAM} style={{ height: ICON_SIZE, width: ICON_SIZE }} />
                            :
                            <FastImage source={ICON_GOOGLE} style={{ height: ICON_SIZE, width: ICON_SIZE }} />
                }
            </View>
        </TouchableOpacity>
    )
}
export { AppSocialButton };