import React, {useState, useEffect} from 'react';
import {StyleSheet, AppState} from 'react-native';
import Video from 'react-native-video';
import convertToCache from 'react-native-video-cache';

const AppVideoPlayer = ({source, startPlaying, style, controls}) => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [pauseVideo, setPause] = useState(false);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      setPause(true);
    } else {
      setPause(false);
    }
    if (appState != nextAppState) {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
      }
      setAppState(nextAppState);
    }
  };
  // console.log(source.uri)
  return (
    <Video
      source={
        source?.uri
          ? {
              uri: /^((http|https|ftp):\/\/)/.test(source.uri) ? convertToCache(source.uri) : source.uri,
            }
          : source
      } // Can be a URL or a local file.
      // source={{uri:"https://pp.tedcdn.com/vids/intro_00/v01/master.m3u8"}}  // -> video streaming URL , (supper fast playback)
      // source={{ uri: source.uri }}
      //paused= {!startPlaying}
      paused={pauseVideo}
      controls={controls}
      repeat={startPlaying}
      playInBackground={false}
      playWhenInactive={false}
      onLoadStart={(dta) => {
        // setBuffering(dta?.isBuffering)
        // console.log('--------------ON LOAD-------', dta)
      }}
      onBuffer={(dta) => {
        // setBuffering(dta?.isBuffering)
        // console.log('--------------BUFFERING-------', dta)
      }}
      onError={(err) => {
        // console.log('--------------VIDEO PLAY BACK ERROR-------', err)
      }}
      resizeMode={'cover'}
      bufferConfig={{
        minBufferMs: 5000,
        maxBufferMs: 5000,
        // bufferForPlaybackMs: 100,
        // bufferForPlaybackAfterRebufferMs: 1000,
      }}
      style={[styles.backgroundVideo, style ? style : {}]}
    />
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
});
export {AppVideoPlayer};
