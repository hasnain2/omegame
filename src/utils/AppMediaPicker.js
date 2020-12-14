import { Alert, Platform } from 'react-native';
import { createThumbnail } from "react-native-create-thumbnail";
import ImagePicker from 'react-native-image-crop-picker';

const MEDIA_OPTIONS = {
    width: 800,
    height: 800,
    cropping: true,
    multiple: false
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
        if (type === 'video') {
            GenerateThumbnailFromVideo((thumbnailRes) => {
                if (thumbnailRes)
                    callback({ type, selectedFrom: 'gallery', uri: response.path, thumbnail: thumbnailRes })
                else
                    callback({ type, selectedFrom: 'gallery', uri: response.path })
            }, response.path)
        } else {
            callback({ type, selectedFrom: 'gallery', uri: response.path })
        }
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
        if (type === 'video') {
            console.log('---------CAMERA RESPONSE--------', response)
            let path = response.path;
            console.log('-----------------path before parsing------------', path)
            if (Platform.OS === 'ios') {
                path = path.replace('file://', '')
            }
            GenerateThumbnailFromVideo((thumbnailRes) => {
                if (thumbnailRes)
                    callback({ type, selectedFrom: 'camera', uri: path, thumbnail: thumbnailRes })
                else
                    callback({ type, selectedFrom: 'camera', uri: path })
            }, path)
        } else {
            callback({ type, selectedFrom: 'camera', uri: response.path })
        }
    }).catch((err) => {
        callback(false)
        console.log('---------OpenGalleryPicker ERROR------', err)
    })
}

const OpenCameraGalleryPromptPicker = (callback, type) => {
    if (type) {
        if (type === 'camera') {
            Alert.alert(
                "Choose Media type",
                "Upload photo/video from " + type,
                [
                    {
                        text: "Cancel",
                        onPress: () => callback(false),
                        style: "cancel"
                    },
                    { text: "PHOTO", onPress: () => OpenCameraPicker((dta) => callback(dta), 'photo') },
                    { text: "VIDEO", onPress: () => OpenCameraPicker((dta) => callback(dta), 'video') }
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert(
                "Choose Media type",
                "Upload photo/video from " + type,
                [
                    {
                        text: "Cancel",
                        onPress: () => callback(false),
                        style: "cancel"
                    },
                    { text: "PHOTO", onPress: () => OpenGalleryPicker((dta) => callback(dta), 'photo') },
                    { text: "VIDEO", onPress: () => OpenGalleryPicker((dta) => callback(dta), 'video') }
                ],
                { cancelable: false }
            );
        }
    } else {
        Alert.alert(
            "Choose Photo",
            "Please select photo from camera/gallery",
            [{
                text: "Cancel",
                onPress: () => callback(false),
                style: "cancel"
            },
            { text: "CAMERA", onPress: () => OpenCameraPicker((dta) => callback(dta), 'photo') },
            { text: "GALLERY", onPress: () => OpenGalleryPicker((dta) => callback(dta), 'photo') }
            ],
            { cancelable: false }
        );
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
