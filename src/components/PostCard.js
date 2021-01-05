
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_IMAGE_PLACEHOLDER } from '../../assets/images';
import { AppText } from '../components';
import { AppTheme } from '../config';
import { AppLogger } from '../utils/AppHelperMethods';
import { AppVideoPlayer } from './AppVideoPlayer';
import { PostPoolBottomBar } from './PostPoolBottomBar';
import { PostPoolTopBar } from './PostPoolTopBar';

const PostCard = ({ item, startPlaying, navigation }) => {
    let [state, setState] = useState({
        stopPlaying: false,
        imageLoaded: false,
    })
    useEffect(() => {

    }, [])
    return (
        <View style={{ borderBottomColor: AppTheme.colors.darkGrey, borderBottomWidth: 0.5 }}>
            <PostPoolTopBar item={item} navigation={navigation} />
            <AppText size={1} style={{ padding: RFValue(15), paddingTop: 0 }}>{item.text}</AppText>

            {item.location?.addressName ?
                <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(15), paddingBottom: RFValue(10), flexWrap: 'wrap' }}>
                    <AppText size={0} color={'grey'} style={{ paddingTop: 0 }}>Location: {item.location?.addressName || ''}, {item.location?.country || ''}</AppText>
                </View>
                : null}

            {item.tagged?.length > 0 ?
                <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(15), paddingBottom: RFValue(10), flexWrap: 'wrap' }}>
                    {item.tagged.map((iii, ind) => (
                        <AppText onPress={() => {
                            if (iii?._id)
                                navigation.navigate("UserProfileScreen", { userID: iii?._id })
                        }} key={`${iii?.userName}${ind}`} size={0} color={AppTheme.colors.primary} style={{ paddingTop: 0 }}>@{iii?.userName}, </AppText>
                    ))}
                </View>
                : null}

            {item?.attachments && item?.attachments?.length > 0 ?
                <TouchableOpacity activeOpacity={0.9} onPress={() => {
                    navigation.navigate("PostDetailScreenWithComments", { post: item })
                }}>
                    <View style={{ height: RFValue(300), width: '100%' }}>
                        {item?.attachments[0]?.type.includes('video') ?
                            <AppVideoPlayer source={{ uri: item?.attachments[0]?.url }} startPlaying={startPlaying && !state.stopPlaying} />
                            :
                            <FastImage
                                source={state.imageLoaded ? {
                                    uri: item?.attachments[0]?.url
                                } : DEFAULT_IMAGE_PLACEHOLDER} style={{ height: RFValue(300) }}
                                // fallback
                                onLoadEnd={(res) => {
                                    setState(prev => ({ ...prev, imageLoaded: true }))
                                }}
                                // defaultSource={DEFAULT_IMAGE_PLACEHOLDER}
                                resizeMode="cover" />
                        }
                    </View>
                </TouchableOpacity>
                : null}
            <PostPoolBottomBar item={item} navigation={navigation} stopPlaying={(val) => {
                setState(prev => ({ ...prev, stopPlaying: val }))
            }} />
        </View>
    )
};

export { PostCard };
