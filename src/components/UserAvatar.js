import React, {useEffect} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {DEFAULT_USER_PIC} from '../../assets/images';

const UserAvatar = ({source, size, onPress, corner, color, type, screen, flag}) => {
  const SIZE = size ? RFValue(size) : RFValue(40);
  useEffect(() => {}, [source, size, onPress, corner, color]);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={flag}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: SIZE,
          width: SIZE,
        }}>
        <FastImage
          source={source || DEFAULT_USER_PIC}
          style={{
            // height: screen == 'profile' ? SIZE - RFValue(24) : SIZE - RFValue(8),
            // width: screen == 'profile' ? SIZE - RFValue(24) : SIZE - RFValue(8),
            height: screen == 'profile' ? SIZE - RFValue(8) : SIZE - RFValue(2),
            width: screen == 'profile' ? SIZE - RFValue(8) : SIZE - RFValue(2),
            borderRadius: 100,
            overflow: 'hidden',
            zIndex: 999,
            borderWidth: type === 'review' ? 0.5 : 1,
            borderColor: type === 'review' ? 'gray' : 'white',
          }}
        />
        {corner ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}>
            {color ? (
              <Image
                source={{uri: corner || ''}}
                style={[
                  {
                    height: SIZE,
                    width: SIZE,
                    borderRadius: 100,
                    overflow: 'hidden',
                  },
                  color ? {tintColor: color} : null,
                ]}
              />
            ) : (
              <FastImage
                source={{uri: corner || ''}}
                style={[
                  {
                    height: SIZE,
                    width: SIZE,
                    borderRadius: 100,
                    overflow: 'hidden',
                  },
                  color ? {tintColor: color} : null,
                ]}
              />
            )}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export {UserAvatar};
