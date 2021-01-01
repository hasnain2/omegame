import messaging from '@react-native-firebase/messaging';

import { PermissionsAndroid, Platform } from "react-native";
import { AppLogger } from '../../utils/AppHelperMethods';

async function requestReadWritePermission() {
    if (Platform.OS === 'android') {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    } else
        return true;
}


async function requestPushNotificationPermission() {
    const authStatus = await messaging().requestPermission({
        sound: true,
        announcement: true,
        // ... other permission settings
      });
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        AppLogger('Authorization status:', authStatus);
    }
}

export { requestPushNotificationPermission, requestReadWritePermission }