import { EndPoints } from '../utils/AppEndpoints'
import { AppShowToast } from '../utils/AppHelperMethods'
import Interceptor from '../utils/Interceptor'

import RNVideoHelper from 'react-native-video-helper';
import ImageResizer from 'react-native-image-resizer';
import { Platform } from 'react-native';
import { GenerateThumbnailFromVideo } from '../utils/AppMediaPicker';

// current vid size = 2498125
const VideoAndImageCompressor = (image) => {
    console.log('------------media going to be compressed----------', image)
    let imagetemp = { ...image, uri: image?.image?.uri || image?.uri, type: image?.image?.type || image?.type };
    return new Promise((resolve, reject) => {
        if (imagetemp.type === 'photo' || imagetemp.type === 'image') {
            ImageResizer.createResizedImage(image?.image?.uri || image.uri, 1000, 1000, 'JPEG', 100, 0, null)
                .then(response => {
                    var temp = {
                        ...imagetemp,
                        compressed: {
                            uri: Platform.OS === 'android' ? ('file://' + response.path) : response.path
                        }
                    }
                    resolve(temp)
                }).catch(err => {
                    reject(err)
                });
        } else {
            // resolve(imagetemp)
            RNVideoHelper.compress(image?.uri2 || image?.image?.uri2 || image?.image?.uri || image.uri, {
                startTime: 1, // optional, in seconds, defaults to 0
                endTime: 60, //  optional, in seconds, defaults to video duration
                quality: 'low', // default low, can be medium or high
                defaultOrientation: 0 // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
            }).progress(value => {
                // console.warn('-----compressing video-----progress', value); // Int with progress value from 0 to 1
            }).then(compressedUri => {

                let ValidPath = Platform.OS === 'android' ? ('file://' + compressedUri) : ('' + compressedUri)
                let temp = {
                    ...imagetemp,
                    compressed: {
                        uri: ValidPath
                    }
                }
                resolve(temp);
            }).catch((err) => {
                console.log('-------video compression error------>', err)
                reject(err)
            });
        }
    })


};

function postFiles(callback, fileName, bucket, data) {
    fetch(EndPoints.UPLOAD_MEDIA + bucket, {
        method: 'POST',
        headers: Interceptor.getHeadersMultiPart(),
        body: data
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        if (status === 201 || status === 200) {
            let uploaderResponse = data?.data?.media[0]
            callback({
                ...uploaderResponse,
                name: fileName,
                oType: uploaderResponse?.type,
                type: uploaderResponse?.type ? uploaderResponse?.type.includes('video') ? 'video' : 'photo' : 'photo'
            })
        } else {
            AppShowToast(data?.message || "Failed to upload")
            callback(false);
        }
    }).catch((error) => {
        console.log('---------IMAGE UPLOADER ERROR-----------', error)
        callback(false)
    });
}

const UploadMedia = (callback, bucket, mediaObj) => {

    VideoAndImageCompressor(mediaObj).then((compressionResponse) => {
        let fileName = 'assetmedia.' + (compressionResponse.oType.split('/')[1] ? ('' + compressionResponse.oType.split('/')[1]) : '');
        let multiFormData = new FormData()
        multiFormData.append('files', { uri: compressionResponse.compressed.uri, name: fileName, type: compressionResponse.oType })

        postFiles((fileUploadRes) => {
            if (fileUploadRes) {
                if (mediaObj.type === 'video') {
                    GenerateThumbnailFromVideo((thumbnail) => {
                        if (thumbnail) {
                            let multiFormDataForThumbnail = new FormData()
                            multiFormDataForThumbnail.append('files', { uri: thumbnail, name: "thumbnail.png", type: 'image/png' })
                            postFiles((thumbnailUploadRes) => {
                                if (thumbnailUploadRes) {
                                    callback({ ...thumbnailUploadRes, thumbnail: true })
                                } else {
                                    callback(fileUploadRes)
                                }
                            }, "thumbnail.png", bucket, multiFormDataForThumbnail)
                        } else {
                            callback(fileUploadRes)
                        }
                    }, mediaObj?.uri2 || mediaObj?.image?.uri2 || mediaObj?.image?.uri || mediaObj.uri)
                } else {
                    callback(fileUploadRes)
                }
            }
        }, fileName, bucket, multiFormData)
    }).catch(err => {
        console.log('--------ERROR COMMPRESSING MEDIA -------->\n', err)
        callback(false)
    });





}

export { UploadMedia }
