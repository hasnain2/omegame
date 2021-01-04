import CameraRoll from "@react-native-community/cameraroll";
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PERMISSIONS, request } from 'react-native-permissions';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_ARROW_RIGHT } from "../../assets/icons";
import { AppText } from '../components';
import { AppConfig, AppTheme } from "../config";
import { AppLogger } from "../utils/AppHelperMethods";
import { EvilIcons } from "../utils/AppIcons";
import { AppVideoPlayer } from './AppVideoPlayer';

const NumberOfIMagesToGet = 150;
const AppGallery = ({ navigation, toggle, selectedOne }) => {
    const CARD_MARGIN = RFValue(2);
    let CARD_SIZE = (Dimensions.get('screen').width / 3) - ((CARD_MARGIN * 2));

    let [loaded, setLoaded] = useState(false);
    let [albumsFirstPics, setAlbumsFirstPics] = useState([]);
    let [loading, setLoading] = useState(true);
    let [params, setParams] = useState({ first: NumberOfIMagesToGet, assetType: 'All' });
    let [focused, setFocused] = useState(false);

    let [coverPhoto, setCoverPhoto] = useState('');
    let [recentCameraRollLibrary, setRecentCameraRollLibrary] = useState([]);
    let [albumbs, setAlbumbs] = useState([]);
    let stopPagination = false;

    const getAlbumbsFirstPicture = async (albumbs) => {
        albumbs = [{ first: 1, assetType: 'All' }, ...albumbs];
        let promisArr = []
        albumbs.forEach((item, index) => {
            let tempOb = index === 0 ? item : {
                first: 1,
                assetType: 'All',
                groupName: item.title,
                groupTypes: 'Album'
            };

            promisArr.push(
                new Promise(async (resolve, reject) => {
                    resolve(await CameraRoll.getPhotos({ ...tempOb }));
                })
            );
        })

        Promise.all(promisArr).then((results) => {
            let imagesArray = [];
            results.forEach((item, index) => {
                if (item.edges[0]) {
                    if (item.edges[0].node.type === 'video' && Platform.OS === 'ios') {
                        const appleId = item.edges[0].node.image.uri.substring(5, 41);
                        const fileNameLength = item.edges[0].node.image.filename.length;
                        const ext = item.edges[0].node.image.filename.substring(fileNameLength - 3);
                        const uri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
                        imagesArray.push({ uri: uri, type: item.edges[0].node.type });
                    } else {
                        imagesArray.push({ uri: item.edges[0].node.image.uri, type: item.edges[0].node.type });
                    }
                }
            })
            setAlbumsFirstPics([...imagesArray]);
        });
    }

    const getAlbumbs = async () => {
        if (Platform.OS === 'ios') {
            let tempalbumbs = await CameraRoll.getAlbums({ assetType: 'All' });
            if (tempalbumbs.length > 0) {
                setLoaded(false);
            }
            getAlbumbsFirstPicture(tempalbumbs);

            setAlbumbs([...tempalbumbs])
        } else {
            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(async (result) => {
                let tempalbumbs = await CameraRoll.getAlbums({ assetType: 'All' });
                setAlbumbs([...tempalbumbs]);
                if (tempalbumbs.length > 0) {
                    setLoaded(false);
                }
            });
        }
    }

    const getCameraRollPics = async (paginated, tempPrams) => {
        if (!paginated) {
            stopPagination = false
            setCoverPhoto('')
            setRecentCameraRollLibrary([]);
        }
        if (!stopPagination) {
            let pics = await CameraRoll.getPhotos(tempPrams ? tempPrams : paginated ? { ...params, after: paginated } : params);
            let images = pics.edges;


            if (pics.page_info.has_next_page) {
            } else {
                stopPagination = true;
            }

            let ImagesArray = [];
            if (paginated) {
                ImagesArray = recentCameraRollLibrary;
            }

            images.forEach((val) => {
                if (val.node.image && val.node.image.uri) {
                    const ORIGINAL_URI = val.node.image.uri;
                    let uri = ORIGINAL_URI;
                    const appleId = ORIGINAL_URI.substring(5, 41);
                    const fileNameLength = AppConfig.IS_IOS_DEVICE ? val.node.image.filename.length : 10;
                    const ext = AppConfig.IS_IOS_DEVICE ? val.node.image.filename.substring(fileNameLength - 3) : 'mp4';
                    if (AppConfig.IS_IOS_DEVICE) {
                        uri = `assets-library://asset/asset.${ext}?id=${appleId}&ext=${ext}`;
                    }

                    if (val.node.type.includes('video')) { // val.node.image.fileSize
                        //   { image: { uri: image.path }, ext, type: "video", upload: true }
                        if (AppConfig.IS_IOS_DEVICE) {
                            ImagesArray.push({ image: { uri: ORIGINAL_URI, uri2: uri }, type: 'video', oType: ('video/' + ext), upload: true, duration: val.node.image.playableDuration })
                        } else {
                            ImagesArray.push({ image: { uri: ORIGINAL_URI, }, type: 'video', oType: val.node.type, upload: true, duration: val.node.image.playableDuration })
                        }
                    } else {
                        ImagesArray.push({ image: { uri: val.node.image.uri }, type: val.node.type === 'image' ? 'photo' : 'photo', oType: val.node.type, upload: true, })
                    }
                }
            });

            if (images.length > 0) {
                setCoverPhoto(ImagesArray[0]);
                setRecentCameraRollLibrary([...ImagesArray]);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {

            getCameraRollPics(false, false);
            getAlbumbs();
        });


        const unsubscribe = navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content', true);
            setFocused(true)
        });

        const unsubscribeBlur = navigation.addListener('blur', () => {
            setFocused(false)
        });

        return () => {
            unsubscribe();
            unsubscribeBlur();
        }
    }, [])
    return (
        <View style={{ flex: 1, }}>

            <LinearGradient colors={['black', 'rgba(0,0,0,0.1)']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: RFValue(5) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <EvilIcons onPress={() => {
                            toggle()
                        }} name="close" style={{ fontSize: RFValue(30), padding: RFValue(10), color: 'white' }} />

                        <AppText size={3} >Gallery</AppText>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AppText onPress={() => {
                            toggle()
                        }} size={3} bold={true}>Next</AppText>
                        <Image source={ICON_ARROW_RIGHT} style={{ height: RFValue(40), width: RFValue(40), tintColor: 'white' }} />
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.covoerPhotoVideoStyle}>
                {coverPhoto?.type === "video" ?
                    <AppVideoPlayer source={{ uri: Platform.OS === 'ios' ? coverPhoto.image.uri2 : coverPhoto.image.uri }} startPlaying={true} />
                    :
                    <Image source={coverPhoto.image} resizeMode="cover" style={styles.covoerPhotoVideoStyle} />
                }
            </View>




            <View style={{ margin: 1, flex: 1, paddingBottom: RFValue(40) }}>

                <FlatList
                    data={recentCameraRollLibrary}
                    extraData={recentCameraRollLibrary}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(itemm) => JSON.stringify(itemm)}
                    numColumns={3}


                    maxToRenderPerBatch={1}
                    initialNumToRender={1}
                    windowSize={2}

                    onEndReachedThreshold={0.9}
                    onEndReached={() => {
                        getCameraRollPics(recentCameraRollLibrary[recentCameraRollLibrary.length - 1].image.uri, false)
                    }}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            style={{}}
                            onLongPress={() => { }}
                            onPress={() => {
                                AppLogger('------ITEM CLICKED-----', item)
                                setCoverPhoto({ ...item });
                                selectedOne({ ...item, uri: Platform.OS === 'ios' ? item.type === 'video' ? item.image.uri2 : item.image.uri : item.image.uri, type: item.type });
                            }} >
                            <View pointerEvents="box-none" style={[coverPhoto?.image?.uri === item.image?.uri ? { borderWidth: 3, borderColor: AppTheme.colors.primary, margin: 0 } : null, { margin: CARD_MARGIN, height: CARD_SIZE, width: CARD_SIZE, overflow: 'hidden' }]}>
                                {item.type === 'video' ?
                                    Platform.OS === 'ios' ?
                                        // <AppVideoPlayer source={{ uri: item?.image?.uri2 || item?.image?.uri }} startPlaying={false} controls={false} />
                                        <Image source={item.image} resizeMode="cover" style={{ height: CARD_SIZE, width: CARD_SIZE }} />
                                        :
                                        <Image source={item.image} resizeMode="cover" style={{ height: CARD_SIZE, width: CARD_SIZE }} />
                                    :
                                    <Image source={item.image} resizeMode="cover" style={{ height: CARD_SIZE, width: CARD_SIZE }} />
                                }
                            </View>
                        </TouchableOpacity>
                    } />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    covoerPhotoVideoStyle: {
        height: Dimensions.get('screen').width, width: '100%'
    }
})
export { AppGallery };
