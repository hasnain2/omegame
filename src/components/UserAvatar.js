

import React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_USER_PIC } from '../../assets/images';

const UserAvatar = ({ source, size, onPress }) => {
    const SIZE = size ? RFValue(size) : RFValue(40);
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
            <FastImage source={source || DEFAULT_USER_PIC} style={{ height: SIZE, width: SIZE, borderRadius: 100, overflow: 'hidden', borderWidth: 1, borderColor: 'white' }} />
        </TouchableOpacity>

    );
};

export { UserAvatar };
