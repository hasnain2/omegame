
import { Platform } from "react-native";
import Config from 'react-native-config';

const AppConfig = {
    appName: "Omegame",
   
    GOOGLE_PLACES_API_KEY: Config.GOOGLE_PLACES_API_KEY,
    IS_IOS_DEVICE: Platform.OS === 'ios',
    VideoOptions: {
        mediaType: 'video',
        durationLimit: 60,

    },

    INSTAGRAM_APP_ID: Config.INSTAGRAM_APP_ID,
    INSTAGRAM_APP_SECRET: Config.INSTAGRAM_APP_SECRET,

    App_Deep_Link: "https://omegame.page.link/omegame?",
    //----S3 SERVER CREDENTIALS
    S3_CONFIGURATION: (bucket) => {
        return {
            // keyPrefix: "post/",
            bucket: bucket,
            region: "us-east-2",
            accessKey: Config.S3_ACCESS_KEY,
            secretKey: Config.S3_SECRET_KEY,
            successActionStatus: 201,
        }
    },
    //For Direct upload
    S3_DIRECT_UPLOAD_CONFIGURATION: {
        accessKeyId: Config.S3_ACCESS_KEY,
        secretAccessKey: Config.S3_SECRET_KEY,
        region: "us-east-2",
        signatureVersion: 'v4',
        // bucket: "project-omegame",
        apiVersion: "2006-03-01",
        signatureCache: false
    },

    APP_TERMS_AND_CONDITIONS: "https://omegame.net/termsandconditions/",
    APP_PRIVACY_POLICY: "https://omegame.net/privacy-notice/",
}

export { AppConfig };
