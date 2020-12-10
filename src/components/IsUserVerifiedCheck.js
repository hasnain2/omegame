
import React from 'react';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_VERIFIED_ACCOUNT } from '../../assets/icons';
import { AppTheme } from '../config';
const SIZE = RFValue(13);
const IsUserVerifiedCheck = ({ check }) => {
    if (check)
        return <FastImage source={ICON_VERIFIED_ACCOUNT}
            style={{ marginHorizontal: RFValue(4), height: SIZE, width: SIZE, color: AppTheme.colors.gradientB }}
            resizeMode={'cover'} />
    else return null
};

export { IsUserVerifiedCheck };