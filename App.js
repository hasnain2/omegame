
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';
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
  let user = useSelector(state => state.root.user);


  useEffect(() => {
    getData('user', (storageUser) => {
      if (storageUser) {
        Interceptor.setToken(storageUser.token);
        store.dispatch(setUser(storageUser))
        debugger
        setState({ loading: false })
      } else
        setState({ loading: false, })
    })
  }, [])
  return (
    <PaperProvider theme={AppTheme}>
      <StatusBar barStyle={'dark-content'} backgroundColor="black" />
      <NavigationContainer ref={navRef}>
        <StatusBar barStyle="light-content" />
        <MenuProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: AppTheme.colors.darkGrey }}>
            {state.loading ?
              <AuthLoading />
              : user.token ?
                <DashboardTabs />
                : <AuthStack />
            }
          </SafeAreaView>
        </MenuProvider>
      </NavigationContainer>
    </PaperProvider>
  )
};

export default App;