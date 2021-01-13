import React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
import convertToCache from 'react-native-video-cache';

const AppVideoPlayer = ({ source, startPlaying, style, controls }) => {
    return (
        <Video
            source={source?.uri ? { uri: /^((http|https|ftp):\/\/)/.test(source.uri) ? convertToCache(source.uri) : source.uri } : source}   // Can be a URL or a local file.
            paused={!startPlaying}
            controls={controls}
            repeat={startPlaying}
            onLoadStart={(dta) => {
                // setBuffering(dta?.isBuffering)
                console.log('--------------ON LOAD-------', dta)
            }}
            onBuffer={(dta) => {
                // setBuffering(dta?.isBuffering)
                console.log('--------------BUFFERING-------', dta)
            }}
            onError={(err) => {
                console.log('--------------VIDEO PLAY BACK ERROR-------', err)
            }}
            resizeMode={"cover"}
            bufferConfig={{
                minBufferMs: 100,
                maxBufferMs: 100,
                bufferForPlaybackMs: 500,
                bufferForPlaybackAfterRebufferMs: 200,
            }}
            style={[styles.backgroundVideo, style ? style : {}]} />
    );
};
const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        bottom: 0,
        right: 0,
    },
})
export { AppVideoPlayer };
