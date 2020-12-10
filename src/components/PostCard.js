
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppText } from '../components';
import { AppTheme } from '../config';
import { AppVideoPlayer } from './AppVideoPlayer';
import { PostPoolBottomBar } from './PostPoolBottomBar';
import { PostPoolTopBar } from './PostPoolTopBar';

const PostCard = ({ item, startPlaying, navigation, onMenuPress, likePress, bookmarkPress }) => {
    useEffect(() => {

    }, [])
    return (
        <View style={{ borderBottomColor: AppTheme.colors.darkGrey, borderBottomWidth: 0.5 }}>
            <PostPoolTopBar item={item} navigation={navigation} onMenuPress={onMenuPress} />
            <AppText size={1} style={{ padding: RFValue(15), paddingTop: 0 }}>{item.text}</AppText>

            {item?.attachments && item?.attachments[0] ?
                <View style={{ height: RFValue(300), width: '100%' }}>
                    {item?.attachments[0]?.type.includes('video') ?
                        <AppVideoPlayer source={{ uri: item?.attachments[0]?.url }} startPlaying={startPlaying} />
                        :
                        <FastImage
                            source={{
                                uri: item?.attachments[0]?.url,
                                // cache: FastImage.cacheControl.cacheOnly
                            }} style={{ height: RFValue(300) }} resizeMode="cover" />
                    }
                </View>
                : null}
            <PostPoolBottomBar item={item} navigation={navigation} likePress={likePress} bookmarkPress={bookmarkPress} />
        </View>
    )
};

export { PostCard };