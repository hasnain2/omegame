import messaging from '@react-native-firebase/messaging';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/redux/store';

messaging().setBackgroundMessageHandler(async () => { });

const EntryPoint = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => EntryPoint);
