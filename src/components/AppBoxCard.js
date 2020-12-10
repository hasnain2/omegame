
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_USER_PIC } from '../../assets/images';
import { AppTheme } from '../config';
import { EvilIcons } from '../utils/AppIcons';
import { AppVideoPlayer } from './AppVideoPlayer';
const AppBoxCard = ({ item, navigation, size, startPlaying }) => {
    return (
        <View style={{ height: size, width: size }}>
            {item.file?.type === 'video' || item.type === 'video' ?
                <>
                    {item.file?.link ?
                        item.file?.type === 'video' ?
                            <FastImage source={item.file?.thumbnail ? { uri: item.file?.thumbnail } : DEFAULT_USER_PIC} style={{ height: size, width: size }} />
                            :
                            <FastImage source={{ uri: item.file?.link || item.link }} style={{ height: size, width: size }} />
                        : null}
                    <View style={{ position: 'absolute', top: RFValue(5), right: RFValue(5) }}>
                        <EvilIcons name="play" style={{ fontSize: RFValue(25), color: AppTheme.colors.primary, }} />
                    </View>
                </>
                :
                <FastImage source={{ uri: item.file?.link || item.link }} style={{ height: size, width: size }} />
            }

        </View>
    )
};

export { AppBoxCard };
