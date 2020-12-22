

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_USER_PIC } from '../../assets/images';

const UserAvatar = ({ source, size, onPress, corner }) => {
    const SIZE = size ? RFValue(size) : RFValue(40);
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: SIZE, width: SIZE, }}>
                <FastImage source={source || DEFAULT_USER_PIC} style={{ height: SIZE - RFValue(5), width: SIZE - RFValue(5), borderRadius: 100, overflow: 'hidden', borderWidth: 1, borderColor: 'white' }} />
                {corner ?
                    <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                        <FastImage source={{ uri: corner || '' }} style={{ height: SIZE, width: SIZE, borderRadius: 100, overflow: 'hidden', borderWidth: 1, borderColor: 'white' }} />
                    </View>
                    : null}
            </View>
        </TouchableOpacity>
    );
};

export { UserAvatar };
