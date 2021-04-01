import React, {useEffect} from 'react';
import {TouchableOpacity, Image, View, StyleSheet, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {DEFAULT_USER_PIC} from '../../assets/images';

const UserAvatar = ({source, size, onPress, corner, color}) => {
  const SIZE = size ? RFValue(size) : RFValue(40);
  useEffect(() => {}, [source, size, onPress, corner, color]);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{}}>
      <ImageBackground
        source={{uri: corner || null}}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: SIZE * 1.13,
          width: SIZE * 1.13,
          //   padding: SIZE,
          //   backgroundColor: 'red',
          borderRadius: SIZE,
          overflow: 'hidden',
          borderWidth: corner && color ? SIZE * 0.14 : 0,
          borderColor: color,
        }}>
        {/* {corner ? (
          <View
            style={
              {
                //   position: 'absolute',
                //   top: 0,
                //   bottom: 0,
                //   right: 0,
                //   left: 0,
              }
            }>
            {color ? (
              <Image
                source={{uri: corner || ''}}
                style={[
                  {
                    height: SIZE * 1.3,
                    width: SIZE * 1.3,
                    borderRadius: 100,
                    overflow: 'hidden',
                  },
                  color ? {tintColor: color} : null,
                ]}
                resizeMode="contain"
              />
            ) : (
              <FastImage
                source={{uri: ''}}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    height: SIZE,
                    width: SIZE,
                    // borderRadius: SIZE,
                  },
                ]}
                resizeMode="contain"
              />
            )}
          </View>
        ) : null} */}

        <FastImage
          source={source || DEFAULT_USER_PIC}
          style={{
            height: SIZE - RFValue(10),
            width: SIZE - RFValue(10),
            borderRadius: 100,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'white',
          }}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export {UserAvatar};
