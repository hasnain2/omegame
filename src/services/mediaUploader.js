import {Platform} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import RNVideoHelper from 'react-native-video-helper';
import {JSONBodyHelper} from '.';
import {EndPoints} from '../utils/AppEndpoints';
import {AppLogger, AppShowToast} from '../utils/AppHelperMethods';
import {GenerateThumbnailFromVideo} from '../utils/AppMediaPicker';
import Interceptor from '../utils/Interceptor';

// current vid size = 2498125
const VideoAndImageCompressor = (image) => {
  let imagetemp = {
    ...image,
    uri: image?.image?.uri || image?.uri,
    type: image?.image?.type || image?.type,
  };
  return new Promise((resolve, reject) => {
    if (imagetemp.type === 'photo' || imagetemp.type === 'image') {
      ImageResizer.createResizedImage(image?.image?.uri || image.uri, 700, 700, 'JPEG', 100, 0, null)
        .then((response) => {
          var temp = {
            ...imagetemp,
            compressed: {
              uri: Platform.OS === 'android' ? 'file://' + response.path : response.path,
            },
          };
          resolve(temp);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      // resolve(imagetemp)
      RNVideoHelper.compress(image?.uri2 || image?.image?.uri2 || image?.image?.uri || image.uri, {
        startTime: 1, // optional, in seconds, defaults to 0
        endTime: 60 * 2, //  optional, in seconds, defaults to video duration
        quality: 'medium', // default low, can be medium or high
        defaultOrientation: 0, // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
      })
        .progress((value) => {
          // console.warn('-----compressing video-----progress', value); // Int with progress value from 0 to 1
        })
        .then((compressedUri) => {
          let ValidPath = Platform.OS === 'android' ? 'file://' + compressedUri : '' + compressedUri;
          let temp = {
            ...imagetemp,
            compressed: {
              uri: ValidPath,
            },
          };
          resolve(temp);
        })
        .catch((err) => {
          AppLogger('-------video compression error------>', err);
          reject(err);
        });
    }
  });
};

function postFiles(callback, fileName, bucket, data) {
  fetch(EndPoints.UPLOAD_MEDIA + bucket, {
    method: 'POST',
    headers: Interceptor.getHeadersMultiPart(),
    body: data,
  })
    .then(JSONBodyHelper)
    .then(([status, data]) => {
      AppLogger('---------IMAGE UPLOADER RESPONSE-----------', JSON.stringify(data));
      if (status === 201 || status === 200) {
        let uploaderResponse = data?.data?.media[0];
        callback({
          ...uploaderResponse,
          name: fileName,
          oType: uploaderResponse?.type,
          type: uploaderResponse?.type ? (uploaderResponse?.type.includes('video') ? 'video' : 'photo') : 'photo',
        });
      } else {
        AppShowToast(data?.message || 'Failed to upload');
        callback(false);
      }
    })
    .catch((error) => {
      AppLogger('---------IMAGE UPLOADER ERROR-----------', error);
      callback(false);
    });
}

const UploadMedia = (callback, bucket, mediaObj) => {
  VideoAndImageCompressor(mediaObj)
    .then((compressionResponse) => {
      let fileName =
        'assetmedia.' + (compressionResponse.oType.split('/')[1] ? '' + compressionResponse.oType.split('/')[1] : '');
      let multiFormData = new FormData();
      multiFormData.append('files', {
        uri: compressionResponse?.compressed?.uri,
        name: fileName,
        type: compressionResponse?.oType,
      });
      postFiles(
        (fileUploadRes) => {
          if (fileUploadRes) {
            if (mediaObj?.type === 'video' || mediaObj?.type?.includes('video')) {
              GenerateThumbnailFromVideo((thumbnail) => {
                if (thumbnail) {
                  let multiFormDataForThumbnail = new FormData();
                  multiFormDataForThumbnail.append('files', {
                    uri: thumbnail,
                    name: 'thumbnail.png',
                    type: 'image/png',
                  });
                  postFiles(
                    (thumbnailUploadRes) => {
                      if (thumbnailUploadRes) {
                        callback({
                          ...fileUploadRes,
                          thumbnail: {
                            thumbnail: true,
                            url: thumbnailUploadRes.url,
                            oType: 'image/png',
                          },
                        });
                      } else {
                        callback(fileUploadRes);
                      }
                    },
                    'thumbnail.png',
                    bucket,
                    multiFormDataForThumbnail,
                  );
                } else {
                  callback(fileUploadRes);
                }
              }, compressionResponse?.compressed?.uri);
            } else {
              callback(fileUploadRes);
            }
          } else {
            callback(false);
          }
        },
        fileName,
        bucket,
        multiFormData,
      );
    })
    .catch((err) => {
      AppLogger('--------ERROR COMMPRESSING MEDIA -------->\n', err);
      callback(false);
    });
};

export {UploadMedia};
