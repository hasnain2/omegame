
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppTheme } from '../config';
import { EvilIcons } from '../utils/AppIcons';
import { AppVideoPlayer } from './AppVideoPlayer';
const AppBoxCard = ({ item, navigation, size, startPlaying }) => {
    return (
        <View style={{ height: size, width: size }}>
            {item.attachments && item.attachments.length > 0 ?
                item?.attachments[0]?.type.includes('video') ?
                    <View style={{ height: size, width: size }}>
                        <AppVideoPlayer source={{ uri: item?.attachments[0]?.url }} startPlaying={false} />
                    </View>
                    :
                    <FastImage source={{ uri: item?.attachments[0]?.url }} style={{ height: size, width: size }} />
                : null}
            {item?.attachments[0]?.type.includes('video') ?
                <View style={{ position: 'absolute', top: RFValue(5), right: RFValue(5) }}>
                    <EvilIcons name="play" style={{ fontSize: RFValue(25), color: AppTheme.colors.primary, }} />
                </View>
                : null}
        </View>
    )
};

export { AppBoxCard };
