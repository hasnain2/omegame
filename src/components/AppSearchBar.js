import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICON_FILTER, ICON_SEARCH} from '../../assets/icons';
import {AppTheme} from '../config';

const AppSearchBar = ({onChangeText, onRightPess, hideFilter, type}) => {
  let [state, setState] = useState({
    searchTerm: '',
  });
  return (
    <View
      style={{
        paddingVertical: type === 'review' ? RFValue(0) : RFValue(5),
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: AppTheme.colors.lightGrey,
        alignItems: 'center',
      }}>
      <FastImage
        source={ICON_SEARCH}
        style={{height: RFValue(30), width: RFValue(30), fontSize: RFValue(30)}}
      />
      <TextInput
        style={{height: '100%', flex: 1, color: 'white', borderBottomWidth: 0}}
        placeholder={'Search'}
        placeholderTextColor={AppTheme.colors.lightGrey}
        value={state.searchTerm}
        onChangeText={(val) => {
          onChangeText(val);
          setState((prev) => ({...prev, searchTerm: val}));
        }}
      />
      {!hideFilter ? (
        <TouchableOpacity onPress={onRightPess}>
          <FastImage
            source={ICON_FILTER}
            style={{height: RFValue(30), width: RFValue(30)}}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export {AppSearchBar};
