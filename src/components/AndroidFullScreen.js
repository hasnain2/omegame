//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

// create a component
const AndroidFullScreen = ({navigation, route}) => {
  const {uri} = route.params;
  return (
    <View style={styles.container}>
      <VideoPlayer navigation={navigation} source={{uri: uri}} onBack={() => navigation.goBack()} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default AndroidFullScreen;
