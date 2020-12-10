import iid from '@react-native-firebase/iid';

const getFCMToken = (callback) => {
    iid().getToken().then(token => {
        console.log('------|||||||---FCM TOKEN---|||||||------')
        callback(token)
    }).catch(err => {
        console.log('-------ERROR GETTING FCM TOKEN-----', err)
    });
}

export { getFCMToken }