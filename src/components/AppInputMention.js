import React, {useEffect, useState} from 'react';
import {Dimensions, Keyboard, Platform, TextInput, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppText} from '../components';
import {AppTheme} from '../config';
import {AntDesign} from '../utils/AppIcons';
import CustomMention from '../screens/dashboard/PostCreation/CustomMention';
import {replaceMentionValues} from 'react-native-controlled-mentions';

const DHeight = Dimensions.get('screen').height;

const AppInputMention = ({LHeight, onSend, chat, removeTag, placeholder}) => {
  let [state, setState] = useState({
    loading: false,
    selectedSortType: 'recent',
    comment: '',
    keyboardIsVisible: 0,
    LWidth: 0,
    selectedContent: [],
  });
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, [LHeight]);
  const setSeletedValue = (value) => {
    setState((prev) => ({...prev, comment: value}));
  };

  function _keyboardDidShow(e) {
    setState((prev) => ({...prev, keyboardIsVisible: e.endCoordinates.height - (DHeight - LHeight) / 2}));
  }

  function _keyboardDidHide() {
    setState((prev) => ({...prev, keyboardIsVisible: 0}));
  }

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0)', 'black', 'black', 'black']}
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          overflow: 'visible',
          bottom: Platform.OS === 'ios' ? state.keyboardIsVisible : 0,
        },
      ]}>
      {removeTag && placeholder && state.comment ? (
        <AppText size={1} style={{paddingHorizontal: RFValue(15)}}>
          {placeholder}
        </AppText>
      ) : null}
      <View
        style={{
          flex: 1,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 50,
          margin: RFValue(10),
          paddingLeft: RFValue(10),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* <Fontisto name="smiley" style={{ fontSize: RFValue(25), color: 'white', padding: RFValue(5) }} /> */}
        <View style={{height: '100%', paddingVertical: RFValue(15), fontSize: RFValue(16), color: 'white', flex: 1}}>
          <CustomMention
            placeholder={placeholder}
            setSeletedValue={setSeletedValue}
            value={state.comment}
            selected={selected}
            setSelectedContent={(content) => {
              selected.push({id: content.id});
              //setSelected(temp);
            }}
          />
        </View>
        {/* <TextInput placeholderTextColor={AppTheme.colors.lightGrey} placeholder={placeholder ? placeholder : "Type a message"}
                    onChangeText={(txt) => { setState(prev => ({ ...prev, comment: txt })) }}
                    value={state.comment}
                    style={{ height: '100%', paddingVertical: RFValue(15), fontSize: RFValue(16), color: 'white', flex: 1 }} /> */}
        <TouchableOpacity onPress={() => {}}>
          {/* <FastImage source={ICON_ANNEX} style={{ height: RFValue(30), width: RFValue(30) }} /> */}
        </TouchableOpacity>
        {removeTag && placeholder && !state.comment.trim() ? (
          <AntDesign name="close" onPress={removeTag} style={{color: 'white', fontSize: RFValue(30)}} />
        ) : (
          <TouchableOpacity
            style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              if (state.comment.trim()) {
                onSend(
                  replaceMentionValues(state.comment, ({name}) => `@${name}`),
                  selected,
                );
                setState((prev) => ({...prev, comment: '', selectedContent: []}));
                setSelected([]);
              }
            }}>
            <AppText
              color={AppTheme.colors.primary}
              size={2}
              bold={true}
              style={{paddingHorizontal: RFValue(15), textAlign: 'center'}}>
              SEND
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export {AppInputMention};
