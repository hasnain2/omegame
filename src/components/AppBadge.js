import React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppText } from '../components';
import { AppTheme } from '../config';

const AppBadge = ({ count }) => {
    const SIZE = RFValue(15)
    if (count && Number(count) > 0)
        return (
            <View style={{ height: SIZE, justifyContent: 'center', zIndex: 10, alignItems: 'center', minWidth: SIZE, borderTopRightRadius: 90, borderBottomRightRadius: 90, borderTopLeftRadius: 90, backgroundColor: AppTheme.colors.primary, position: 'absolute', right: 0, top: 0 }}>
                <AppText size={0} >{count}</AppText>
            </View>
        );
    else
        return null
};

export { AppBadge };