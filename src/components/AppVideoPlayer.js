import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import convertToCache from 'react-native-video-cache';

const AppVideoPlayer = ({ source, startPlaying, style, children, controls }) => {
    return (
        <View style={{
            backgroundColor: 'black',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                position: 'absolute',
                top: 0,
                zIndex: 9,
                left: 0,
                bottom: 0,
                right: 0,
            }}>
                <Video
                    source={source?.uri ? { uri: /^((http|https|ftp):\/\/)/.test(source.uri) ? convertToCache(source.uri) : source.uri } : source}   // Can be a URL or a local file.
                    paused={!startPlaying}
                    controls={controls}
                    repeat={startPlaying}
                    resizeMode={"cover"}
                    bufferConfig={{
                        minBufferMs: 100,
                        maxBufferMs: 100,
                        bufferForPlaybackMs: 500,
                        bufferForPlaybackAfterRebufferMs: 200,
                    }}
                    style={[styles.backgroundVideo, style ? style : {}]} />

            </View>
            {children ? children : null}
        </View >
    );
};
const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})
export { AppVideoPlayer };