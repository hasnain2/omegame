import * as AWS from 'aws-sdk';
import { Buffer } from "buffer";
import { RNS3 } from 'react-native-aws3';
import * as RNFS from 'react-native-fs';
// import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import { AppConfig } from '../config';

AWS.config.update(AppConfig.S3_DIRECT_UPLOAD_CONFIGURATION);

const uploadFile = (file) => {

    return new Promise(async (resolve, reject) => {
        var s3 = new AWS.S3();

        const res = await RNFS.copyAssetsVideoIOS(
            file.uri,
            `${RNFS.TemporaryDirectoryPath}${file.name}`
        )

        let RNFSUri = res;
        // File
        var filePath = file.uri;
        var fileKey = file.name;
        // let buffer = Buffer.from(RNFSUri)

        // let blob = await RNFetchBlob.fs.readFile(RNFSUri)
        // console.log(blob instanceof Blob) // true

        const data = await RNFetchBlob.fs.readFile(RNFSUri, 'base64');

        // var buffer = await blob.arrayBuffer();
        var buffer = new Buffer(data, 'base64');

        // Upload
        var startTime = new Date();
        var partNum = 0;
        var partSize = 1024 * 1024 * 5; // Minimum 5MB per chunk (except the last part) http://docs.aws.amazon.com/AmazonS3/latest/API/mpUploadComplete.html
        var numPartsLeft = Math.ceil(buffer.length / partSize);
        var maxUploadTries = 3;
        var multiPartParams = {
            Bucket: appConfig.S3_DIRECT_UPLOAD_CONFIGURATION.bucket,
            Key: "post/" + fileKey,
            ACL: 'public-read',
            ContentType: 'video/mp4'
        };
        var multipartMap = {
            Parts: []
        };

        const completeMultipartUpload = (s3, doneParams) => {

            s3.completeMultipartUpload(doneParams, function (err, data) {
                if (err) {
                    console.log("An error occurred while completing the multipart upload");
                    console.log(err);
                } else {
                    var delta = (new Date() - startTime) / 1000;
                    // console.log('Completed upload in', delta, 'seconds');
                    console.log('Final upload data:', data);
                    resolve({ bucket: data.Bucket, etag: data.ETag, key: data.Key, location: data.Location, cover: file.cover, unlock: file.unlock, type: "video", preview: file.preview });

                }
            });
        }

        const uploadPart = (s3, multipart, partParams, tryNum) => {
            var tryNum = tryNum || 1;
            s3.uploadPart(partParams, function (multiErr, mData) {
                if (multiErr) {
                    console.log('multiErr, upload part error:', multiErr);
                    if (tryNum < maxUploadTries) {
                        // console.log('Retrying upload of part: #', partParams.PartNumber)
                        uploadPart(s3, multipart, partParams, tryNum + 1);
                    } else {
                        // console.log('Failed uploading part: #', partParams.PartNumber)
                        reject("Upload Failed")
                    }
                    return;
                }
                multipartMap.Parts[this.request.params.PartNumber - 1] = {
                    ETag: mData.ETag,
                    PartNumber: Number(this.request.params.PartNumber)
                };
                // console.log("Completed part", this.request.params.PartNumber);
                // console.log('mData', mData);
                if (--numPartsLeft > 0) return; // complete only when all parts uploaded

                var doneParams = {
                    Bucket: appConfig.S3_DIRECT_UPLOAD_CONFIGURATION.bucket,
                    Key: "post/" + fileKey,
                    MultipartUpload: multipartMap,
                    UploadId: multipart.UploadId
                };

                completeMultipartUpload(s3, doneParams);
            });
        }

        s3.createMultipartUpload(multiPartParams, function (mpErr, multipart) {
            if (mpErr) { console.log('Error!', mpErr); return; }
            console.log("Got upload ID", multipart.UploadId);

            // Grab each partSize chunk and upload it as a part
            for (var rangeStart = 0; rangeStart < buffer.length; rangeStart += partSize) {
                partNum++;
                var end = Math.min(rangeStart + partSize, buffer.length),
                    partParams = {
                        Body: buffer.slice(rangeStart, end),
                        Bucket: appConfig.S3_DIRECT_UPLOAD_CONFIGURATION.bucket,
                        Key: "post/" + fileKey,
                        PartNumber: String(partNum),
                        UploadId: multipart.UploadId
                    };

                // Send a single part
                console.log('Uploading part: #', partParams.PartNumber, ', Range start:', rangeStart);
                uploadPart(s3, multipart, partParams);
            }
        });
    });
}


const s3fileupload = async (file) => {

    console.log('------uploading to s3------>', JSON.stringify(file))
    var filename = new Date().getTime();
    file["name"] = filename + "video_clout." + file.ext;

    if (file.ext === "mp4") {
        // return uploadFile(file)

        const options = appConfig.S3_CONFIGURATION;
        return new Promise((resolve, reject) => {
            RNS3.put(file, options).then(response => {
                if (response.status != 201)
                    throw new Error("Failed to upload image to S3");

                resolve({ ...response.body.postResponse, cover: file.cover, unlock: file.unlock, type: file.typ, preview: file.preview });
            }).catch((err) => {
                reject(err)
            });
        });


    } else {    // All files other than mp4
        const options = appConfig.S3_CONFIGURATION;
        return new Promise((resolve, reject) => {
            RNS3.put(file, options).then(response => {
                if (response.status != 201)
                    throw new Error("Failed to upload image to S3");

                resolve({ ...response.body.postResponse, cover: file.cover, unlock: file.unlock, type: file.typ, preview: file.preview });
            }).catch((err) => {
                reject(err)
            });
        });
    }
}

export { s3fileupload };
