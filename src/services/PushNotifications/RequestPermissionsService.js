import messaging from '@react-native-firebase/messaging';

import { PermissionsAndroid, Platform } from "react-native";

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
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}

export { requestPushNotificationPermission, requestReadWritePermission }