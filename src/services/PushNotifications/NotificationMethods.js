import iid from '@react-native-firebase/iid';
import { AppConfig } from '../../config';

const getFCMToken = (callback) => {
    iid().getToken().then(token => {
        console.log('------|||||||---FCM TOKEN---|||||||------')
        callback(token)
    }).catch(err => {
        console.log('-------ERROR GETTING FCM TOKEN-----', err)
    });
}

const AppShowPushNotification = (title, body) => {
    if (global.popupRef) {
        global.popupRef.show({
            onPress: function () { console.log('Pressed') },
            // appIconSource: require('./assets/icon.jpg'),
            appTitle: AppConfig.appName,
            timeText: 'Now',
            title,
            body,
            slideOutTime: 3000
        });
    }
}

export { getFCMToken, AppShowPushNotification }