import iid from '@react-native-firebase/iid';
import { JSONBodyHelper } from '..';
import { AppConfig } from '../../config';
import { EndPoints } from '../../utils/AppEndpoints';
import { AppLogger } from '../../utils/AppHelperMethods';
import Interceptor from '../../utils/Interceptor';

const getFCMToken = (callback) => {
    iid().getToken().then(token => {
        AppLogger('------|||||||---FCM TOKEN---|||||||------', '')
        callback(token)
    }).catch(err => {
        AppLogger('-------ERROR GETTING FCM TOKEN-----', err)
    });
}

const AppShowPushNotification = (title, body, onPress) => {
    if (global.popupRef) {
        global.popupRef.show({
            onPress: onPress ? onPress : () => { },
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
    fetch(`${EndPoints.GET_NOTIFICATION_HISTORY}${cursor ? ("?cursor=" + cursor + "&limit=" + 3) : ''}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('-----------NOTIFICATION HISTORY RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------NOTIFICATION HISTORY ERROR-----------', error)
        callback(false)
    });
}

const ReadUpdateNotificationStatus = (notificationID) => {
    fetch(`${EndPoints.NOTIFICATION_STATUS_SET}${notificationID}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then(JSONBodyHelper).then(([status, data]) => {
        AppLogger('---------NOTIFICATION STATUS READ STATUS RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        AppLogger('---------NOTIFICATION STATUS READ STATUS ERROR-----------', error)
        callback(false)
    });
}


export { getFCMToken, AppShowPushNotification, GetNotificationHistory, ReadUpdateNotificationStatus }