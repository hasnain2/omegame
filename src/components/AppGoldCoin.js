
import React from 'react';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_COIN } from '../../assets/icons';

const AppGoldCoin = ({ size }) => <FastImage source={ICON_COIN} style={{ height: RFValue(size || 20), width: RFValue(size || 20) }} />;

export { AppGoldCoin };
