
import { Platform } from "react-native";

const AppConfig = {
    appName: "OmeGame",
    // GOOGLE_PLACES_API_KEY: "AIzaSyArMLwlK0oxww875fx9OGx8w-ns-K14pcw", // -- this key need billing enabled account to work

    GOOGLE_PLACES_API_KEY: "AIzaSyBtPVcikwM0s8vtarB9xYssMcFN_A8M3Qo",
    IS_IOS_DEVICE: Platform.OS === 'ios',
    instagram_app_id: "706690093479063",
    instagram_app_secret: "9c530d1c09d626129a7c4138cbeb7efc",
    VideoOptions: {
        mediaType: 'video',
        durationLimit: 60,

    },

    App_Deep_Link: "https://omegame.page.link/omegame?",
    //----S3 SERVER CREDENTIALS
    S3_CONFIGURATION: (bucket) => {
        return {
            // keyPrefix: "post/",
            bucket: bucket,
            region: "us-east-2",
            accessKey: "AKIAJI54UYLYINB4MQFQ",
            secretKey: "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",
            successActionStatus: 201,
        }

    },
    //For Direct upload
    S3_DIRECT_UPLOAD_CONFIGURATION: {
        accessKeyId: 'AKIAJI54UYLYINB4MQFQ',
        secretAccessKey: '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',
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
