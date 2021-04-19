import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICON_MENU} from '../../assets/icons';
import {AppUserBoxNameAvatar} from '../components';
import {AppPostMenuContents} from './AppPostMenuContents';
const PostPoolTopBar = ({item, navigation, goBack}) => {
  let [state, setState] = useState({
    showMenu: '',
  });
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: RFValue(10),
        }}>
        <AppUserBoxNameAvatar navigation={navigation} createdAt={item?.createdAt} item={item?.createdBy} />
        <TouchableOpacity
          onPress={() => {
            setState((prev) => ({...prev, showMenu: item?._id}));
          }}>
          <Image
            source={ICON_MENU}
            style={{
              tintColor: 'white',
              height: RFValue(28),
              width: RFValue(10),
            }}
          />
        </TouchableOpacity>
      </View>

      <AppPostMenuContents
        goBack={goBack}
        navigation={navigation}
        item={item}
        show={state.showMenu === item?._id}
        toggle={() => {
          setState((prev) => ({...prev, showMenu: ''}));
        }}
      />
    </>
  );
};

export {PostPoolTopBar};
