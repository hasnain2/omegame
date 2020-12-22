import { Alert } from 'react-native';
import { createThumbnail } from "react-native-create-thumbnail";
import ImagePicker from 'react-native-image-crop-picker';
import { AppConfig } from '../config';

const MEDIA_OPTIONS = {
    width: 800,
    height: 800,
    cropping: true,
    multiple: false
}

function pickerResponseMaker(callback, response, type) {
    if (response?.path) {
        const ORIGINAL_URI = response?.path;
        let uri = ORIGINAL_URI;
        const fileName = response?.filename || response?.mime;
        const ext = fileName.split('/')[1] || ''

        if (type === 'video') { // val.node.image.fileSize
            if (AppConfig.IS_IOS_DEVICE) {
                callback({ image: { uri: ORIGINAL_URI, uri2: uri }, ext, type: 'video', oType: response?.mime ? response.mime : ('video/' + ext), uri: ORIGINAL_URI })
            } else {
                callback({ image: { uri: ORIGINAL_URI, }, ext, type: 'video', oType: response?.mime ? response.mime : ('video/' + ext), uri: ORIGINAL_URI })
            }
        } else {
            callback({ image: { uri: ORIGINAL_URI }, oType: response?.mime ? response.mime : ('image/' + ext), type, uri: ORIGINAL_URI })
        }

    } else {
        callback(false)
    }
}
const GenerateThumbnailFromVideo = (callback, videoPath) => {
    console.log('VIDEO PATH TO BE COMPRESSED----', videoPath)
    createThumbnail({
        url: videoPath,
        timeStamp: 2000,
        format: 'png',
    }).then(response => {
        console.log('--------------THUMBNAIL GENERATION RES----------', response)
        if (response.path)
            callback(response.path)
        else
            callback(false)
    }).catch(err => {
        console.log('-------ERROR GENERATING THUMBNAIL------', err)
        callback(false)
    });
}

const OpenGalleryPicker = (callback, type = 'video') => {
    ImagePicker.openPicker({
        ...MEDIA_OPTIONS,
        mediaType: type,
        cropping: type === 'photo'
    }).then((response) => {
        pickerResponseMaker((res) => {
            callback(res)
        }, response, type)
    }).catch((err) => {
        callback(false)
        console.log('---------OpenGalleryPicker ERROR------', err)
    })
}

const OpenCameraPicker = (callback, type = 'video') => {
    ImagePicker.openCamera({
        ...MEDIA_OPTIONS,
        mediaType: type,
        cropping: type === 'photo'
    }).then((response) => {
        pickerResponseMaker((res) => {
            callback(res)
        }, response, type)
    }).catch((err) => {
        callback(false)
        console.log('---------OpenGalleryPicker ERROR------', err)
    })
}

const OpenCameraGalleryPromptPicker = (callback, type) => {
    if (type) {
        if (type === 'camera') {
            Alert.alert("Choose Media type", "Upload photo/video from " + type,
                [{
                    text: "Cancel",
                    onPress: () => callback(false),
                    style: "cancel"
                }, { text: "PHOTO", onPress: () => OpenCameraPicker((dta) => callback(dta), 'photo') },
                { text: "VIDEO", onPress: () => OpenCameraPicker((dta) => callback(dta), 'video') }
                ], { cancelable: false });
        } else {
            Alert.alert("Choose Media type", "Upload photo/video from " + type,
                [{
                    text: "Cancel",
                    onPress: () => callback(false),
                    style: "cancel"
                }, { text: "PHOTO", onPress: () => OpenGalleryPicker((dta) => callback(dta), 'photo') },
                { text: "VIDEO", onPress: () => OpenGalleryPicker((dta) => callback(dta), 'video') }
                ], { cancelable: false });
        }
    } else {
        Alert.alert("Choose Photo", "Please select photo from camera/gallery",
            [{
                text: "Cancel",
                onPress: () => callback(false),
                style: "cancel"
            }, { text: "CAMERA", onPress: () => OpenCameraPicker((dta) => callback(dta), 'photo') },
            { text: "GALLERY", onPress: () => OpenGalleryPicker((dta) => callback(dta), 'photo') }
            ], { cancelable: false });
    }
}

const CleanCachedImages = (callback) => {
    ImagePicker.clean().then(() => {
        console.log('removed all tmp images from tmp directory');
        callback(true)
    }).catch(e => {
        alert(e);
        callback(false)
    });
}

export { OpenCameraPicker, OpenGalleryPicker, OpenCameraGalleryPromptPicker, CleanCachedImages, GenerateThumbnailFromVideo };
