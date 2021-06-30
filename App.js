import {firebase} from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {MenuProvider} from 'react-native-popup-menu';
import NotificationPopup from 'react-native-push-notification-popup';
import {useSelector} from 'react-redux';
import {AppTheme} from './src/config';
import {AuthStack, DashboardTabs} from './src/navigations';
import {setUser} from './src/redux/reducers/userSlice';
import {store} from './src/redux/store';
import {AuthLoading} from './src/screens';
import {getData} from './src/utils/AppStorage';
import Interceptor from './src/utils/Interceptor';
import SplashScreen from 'react-native-splash-screen';
import {getFCMToken, requestPushNotificationPermission} from './src/services';
global.PaymentRequest = require('react-native-payments').PaymentRequest;
const App = ({}) => {
  let [state, setState] = useState({
    loading: true,
  });
  const linking = {
    prefixes: ['https://omegame.net'],
    config: {
      screens: {
        UserProfileScreen: 'user/:id',
      },
    },
  };

  let navRef = useRef(null);
  let {user, settings} = useSelector((state) => state.root);

  useEffect(() => {
    requestPushNotificationPermission();
    getFCMToken((token) => {});
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    getData('user', (storageUser) => {
      if (storageUser) {
        if (storageUser?._id) {
          firebase.messaging().subscribeToTopic(storageUser?._id);
        }
        Interceptor.setToken(storageUser.token);
        store.dispatch(setUser(storageUser));
      }
      setTimeout(() => {
        setState({loading: false});
      }, 700);
    });
  }, []);
  return (
    <PaperProvider theme={AppTheme}>
      <StatusBar barStyle={'dark-content'} backgroundColor="black" />
      <NavigationContainer ref={navRef}>
        <StatusBar barStyle="light-content" />
        <MenuProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: settings.bgColor,
              //  backgroundColor: 'black' ,
            }}>
            {(() => {
              if (user.token) {
                return <DashboardTabs />;
              } else if (!state.loading && !user.token) {
                return <AuthStack />;
              } else {
                return <AuthLoading />;
              }
            })()}
          </SafeAreaView>
        </MenuProvider>
        <NotificationPopup ref={(ref) => (global.popupRef = ref)} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
