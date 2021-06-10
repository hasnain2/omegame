import React, {useState, useEffect} from 'react';
import {StyleSheet, AppState, Button, View, TouchableOpacity, Platform} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Video from 'react-native-video';
import convertToCache from 'react-native-video-cache';
import {AppModal} from './AppModal';
import AntIcon from 'react-native-vector-icons/AntDesign';
const AppVideoPlayer = ({source, startPlaying, style, controls}) => {
  const [appState, setAppState] = useState(AppState.currentState);
  const [pauseVideo, setPause] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

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
    <>
    <AppModal show={fullScreen} toggle={()=>{setFullScreen(!fullScreen)}} >
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
      paused={pauseVideo ? true : !startPlaying}
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
      style={{width: '100%', height: '100%',position: 'absolute'}}
      
      
    />
    <TouchableOpacity style={{height: "5%", width: '5%',marginBottom: 720,marginRight: 15,  alignSelf: 'flex-end'}} onPress={()=>{setFullScreen(!fullScreen)}}>
    <AntIcon name="shrink" color="white" size={RFValue(20)} />
    </TouchableOpacity>
    </AppModal>
   {!fullScreen?
   <>
   <View style={{flex: 1, position:'relative'}}>
   {
      Platform.OS === 'android' ?
        <View style={{height: RFValue(20), width: RFValue(20), position: 'absolute', top:15,right:10,zIndex:100}} >
          <TouchableOpacity onPress={()=>{setFullScreen(!fullScreen)}}>
          <AntIcon name="arrowsalt" color="white" size={RFValue(20)} />
        </TouchableOpacity>
        </View>
        :null
    }
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
      paused={pauseVideo ? true : !startPlaying}
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
    </View>
    
    </>
    :null}
    </>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: '100%',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // backgroundColor: 'black',
    // bottom: 0,
    // right: 0,
    // zIndex: 1,
    // elevation: 1,
  },
});
export {AppVideoPlayer};
