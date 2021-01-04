import * as React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_FACEBOOK, ICON_GOOGLE, ICON_INSTAGRAM, ICON_TWITTER } from '../../assets/icons';
import { AntDesign } from '../utils/AppIcons';

let ICON_SIZE = RFValue(45);
const AppSocialButton = ({ onPress, name }) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={styles.containerStyle}>
                {name === 'facebook' ?
                    <FastImage source={ICON_FACEBOOK} style={styles.iconStyle} />
                    : name === 'twitter' ?
                        <FastImage source={ICON_TWITTER} style={styles.iconStyle} />
                        : name === "instagram" ?
                            <FastImage source={ICON_INSTAGRAM} style={styles.iconStyle} />
                            : name === "apple" ?
                                <View style={styles.customIcon}>
                                    <AntDesign name={"apple1"} style={{ fontSize: RFValue(25), color: 'grey' }} />
                                </View>
                                : <FastImage source={ICON_GOOGLE} style={styles.iconStyle} />
                }
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    iconStyle: { height: ICON_SIZE, width: ICON_SIZE },
    containerStyle: { borderRadius: 90, marginHorizontal: RFValue(5), padding: RFValue(2), justifyContent: 'center', alignItems: 'center' },
    customIcon: { borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.1)', padding: RFValue(10) }
})
export { AppSocialButton };