import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {AppGoldCoin, AppText} from '../../components';
import {AppTheme} from '../../config';
import {largeNumberShortify} from '../../utils/AppHelperMethods';
import {Ionicons} from '../../utils/AppIcons';
import {OmegaStoreBackgroundsTab} from './OmegaStoreBackgroundsTab';
import {OmegaStoreCornersTab} from './OmegaStoreCornersTab';
import {OmegaStoreNicknameTab} from './OmegaStoreNicknameTab';
import {BlurView} from '@react-native-community/blur';
const Tab = createMaterialTopTabNavigator();

const OmegaStoreTabs = ({navigation, route}) => {
  let {user} = useSelector((state) => state.root);
  const [values, setValues] = useState({
    showBlur: false,
  });
  const toggle = () => {
    setValues((prev) => ({...prev, showBlur: !values.showBlur}));
  };
  useEffect(() => {}, []);
  const paddings = 5;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 1, backgroundColor: 'black', paddingHorizontal: RFValue(paddings)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.3}}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              style={{fontSize: RFValue(25), color: 'white', padding: RFValue(0)}}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <AppGoldCoin size={35} />
            <AppText style={{paddingLeft: RFValue(10)}}>
              {largeNumberShortify(user?.earnedCoins || 0)} OmegaCoins
            </AppText>
          </View>
          <View style={{flex: 0.3}} />
        </View>
        <Tab.Navigator
          initialRouteName={
            route?.params?.name === 'Corners'
              ? 'Corners'
              : route?.params?.name === 'nickNames'
              ? 'Nickname'
              : 'Backgrounds'
          }
          tabBarOptions={{
            showLabel: true,
            showIcon: false,
            activeTintColor: AppTheme.colors.primary,
            inactiveTintColor: '#616161',
            labelStyle: {
              fontSize: RFValue(12),
              margin: 0,
              fontWeight: 'bold',
              textTransform: 'capitalize',
            },
            tabStyle: {
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 0,
              margin: 1,
              paddingBottom: RFValue(8),
            },
            indicatorStyle: {
              backgroundColor: AppTheme.colors.primary,
            },
            style: {
              backgroundColor: 'black',
            },
          }}>
          <Tab.Screen
            name="Backgrounds"
            children={() => (
              <OmegaStoreBackgroundsTab
                navigation={navigation}
                showBlur={values.showBlur}
                toggleBlur={toggle}
                paddings={paddings}
              />
            )}
          />
          <Tab.Screen
            name="Corners"
            children={() => (
              <OmegaStoreCornersTab navigation={navigation} showBlur={values.showBlur} toggleBlur={toggle} />
            )}
          />
          <Tab.Screen
            name="Nickname"
            children={() => (
              <OmegaStoreNicknameTab navigation={navigation} showBlur={values.showBlur} toggleBlur={toggle} />
            )}
          />
        </Tab.Navigator>
        {values.showBlur ? (
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            reducedTransparencyFallbackColor="gray"
            blurType="light"
            blurAmount={1}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export {OmegaStoreTabs};
