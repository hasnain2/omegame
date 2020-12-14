
import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppText } from '../components';
import { AppTheme } from '../config';
import { AppVideoPlayer } from './AppVideoPlayer';
import { PostPoolBottomBar } from './PostPoolBottomBar';
import { PostPoolTopBar } from './PostPoolTopBar';

const PostCard = ({ item, startPlaying, navigation }) => {
    useEffect(() => {

    }, [])
    return (
        <View style={{ borderBottomColor: AppTheme.colors.darkGrey, borderBottomWidth: 0.5 }}>
            <PostPoolTopBar item={item} navigation={navigation} />
            <AppText size={1} style={{ padding: RFValue(15), paddingTop: 0 }}>{item.text}</AppText>

            {item?.attachments && item?.attachments[0] ?
                <TouchableOpacity activeOpacity={0.9} onPress={() => {
                    navigation.navigate("PostDetailScreenWithComments", { post: item })
                }}>
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
                </TouchableOpacity>
                : null}
            <PostPoolBottomBar item={item} navigation={navigation} />
        </View>
    )
};

export { PostCard };
