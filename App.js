
import { firebase } from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
import NotificationPopup from 'react-native-push-notification-popup';
import { useSelector } from 'react-redux';
import { AppTheme } from './src/config';
import { AuthStack, DashboardTabs } from './src/navigations';
import { setUser } from './src/redux/reducers/userSlice';
import { store } from './src/redux/store';
import { AuthLoading } from './src/screens';
import { getData } from './src/utils/AppStorage';
import Interceptor from './src/utils/Interceptor';

const App = ({ }) => {
  let [state, setState] = useState({
    loading: true,
  });
  let navRef = useRef(null)
  let { user, settings } = useSelector(state => state.root);
  if (user?._id) {
    firebase.messaging().subscribeToTopic(user?._id);
  }
  useEffect(() => {
    getData('user', (storageUser) => {
      setState({ loading: false })
      if (storageUser) {
        Interceptor.setToken(storageUser.token);
        store.dispatch(setUser(storageUser));
      }
    });

  }, [])
  return (
    <PaperProvider theme={AppTheme}>
      <StatusBar barStyle={'dark-content'} backgroundColor="black" />
      <NavigationContainer ref={navRef}>
        <StatusBar barStyle="light-content" />
        <MenuProvider>
          <SafeAreaView style={{ flex: 1,
             backgroundColor: settings.bgColor ,
            //  backgroundColor: 'black' ,
             }}>
            {state.loading ?
              <AuthLoading />
              : user.token ?
                <DashboardTabs />
                : <AuthStack />
            }
          </SafeAreaView>
        </MenuProvider>

        <NotificationPopup ref={ref => global.popupRef = ref} />
      </NavigationContainer>

    </PaperProvider>
  )
};

export default App;