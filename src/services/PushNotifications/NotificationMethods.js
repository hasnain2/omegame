import iid from '@react-native-firebase/iid';
import { AppConfig } from '../../config';
import { EndPoints } from '../../utils/AppEndpoints';
import Interceptor from '../../utils/Interceptor';

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


const GetNotificationHistory = (callback, cursor) => {
    fetch(`${EndPoints.GET_NOTIFICATION_HISTORY}${cursor ? ("?cursor=" + cursor + "&limit=" + LIMIT) : ''}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------NOTIFICATION HISTORY RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------NOTIFICATION HISTORY ERROR-----------', error)
        callback(false)
    });
}

const UpdateNotificationStatus = (callback, notificationID) => {
    fetch(`${EndPoints.NOTIFICATION_STATUS_SET}${notificationID}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------NOTIFICATION STATUS READ STATUS ERROR-----------', error)
        callback(false)
    });
}


export { getFCMToken, AppShowPushNotification, GetNotificationHistory, UpdateNotificationStatus }