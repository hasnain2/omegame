import React, {useState} from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {AppText} from '../components';
import {AppTheme} from '../config';
import {AppButton} from './AppButton';
import {AppGradientContainer} from './AppGradientContainer';
import {AppRadioButton} from './AppRadioButton';
import {PostPoolBottomBar} from './PostPoolBottomBar';
import {PostPoolTopBar} from './PostPoolTopBar';
const PoolCard = ({item, navigation}) => {
  let [state, setState] = useState({
    selectedOption: 99999,
    voded: false,
  });
  return (
    <View
      style={{
        borderBottomColor: '#262626',
        borderBottomWidth: RFValue(1),
        marginVertical: RFValue(5),
        // borderBottomColor: AppTheme.colors.darkGrey,
        // borderBottomWidth: 0.5,
      }}>
      <PostPoolTopBar item={item} navigation={navigation} />
      <AppText size={1} style={{padding: RFValue(15), paddingTop: 0}}>
        {item.question}
      </AppText>

      {item.location?.addressName ? (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: RFValue(15),
            paddingBottom: RFValue(10),
            flexWrap: 'wrap',
          }}>
          <AppText size={0} color={'grey'} style={{paddingTop: 0}}>
            Location: {item.location?.addressName || ''}, {item.location?.country || ''}
          </AppText>
        </View>
      ) : null}

      {item.tagged?.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: RFValue(15),
            paddingBottom: RFValue(10),
            flexWrap: 'wrap',
          }}>
          {item.tagged.map((iii, ind) => (
            <AppText
              onPress={() => {
                if (iii?._id) navigation.navigate('UserProfileScreen', {userID: iii?._id});
              }}
              key={`${iii?.userName}${ind}`}
              size={0}
              color={AppTheme.colors.primary}
              style={{paddingTop: 0}}>
              @{iii?.userName},{' '}
            </AppText>
          ))}
        </View>
      ) : null}

      {state.voded ? (
        <View style={{paddingHorizontal: RFValue(15)}}>
          {item.options.map((itm, ind) => (
            <View key={`${ind}key`} style={{paddingVertical: RFValue(10)}}>
              <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                <View style={{flex: 0.16}}>
                  <AppText color={AppTheme.colors.lightGrey} size={2}>
                    {itm.votes + '%'}
                  </AppText>
                </View>
                <View style={{flex: 1}}>
                  <AppText color={'white'} size={2}>
                    {itm.label}
                  </AppText>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  height: RFValue(10),
                  paddingVertical: RFValue(3),
                }}>
                <AppGradientContainer
                  style={{
                    height: RFValue(10),
                    width: itm.votes + '%',
                    borderRadius: 10,
                  }}></AppGradientContainer>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <>
          <View style={{paddingHorizontal: RFValue(15)}}>
            {item.options.map((itm, ind) => (
              <AppRadioButton
                key={`${ind}sd`}
                onPress={() => {
                  setState((prev) => ({...prev, selectedOption: ind}));
                }}
                val={state.selectedOption === ind}
                size={16}
                label={itm.label}
                style={{paddingVertical: RFValue(10)}}
              />
            ))}
          </View>

          <View style={{flex: 1, padding: RFValue(15), justifyContent: 'center'}}>
            <AppButton
              onPress={() => {
                setState((prev) => ({...prev, voded: true}));
              }}
              label={'Vote'}
            />
          </View>
        </>
      )}

      <AppText size={1} color={AppTheme.colors.lightGrey} style={{textAlign: 'center', padding: RFValue(5)}}>
        TIME LEFT: 3d 4h 50m
      </AppText>
      <PostPoolBottomBar item={item} navigation={navigation} />
    </View>
  );
};

export {PoolCard};
