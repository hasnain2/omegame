

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { ICON_SHOP } from '../../../assets/icons';
import { BACKGROUND_IMG } from '../../../assets/images';
import { AppBackButton, AppButton, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { setGameReviews } from '../../redux/reducers/gameReviewsSlice';
import { GetGameReviews } from '../../services/gamesService';
import { largeNumberShortify } from '../../utils/AppHelperMethods';
import { MaterialIcons } from '../../utils/AppIcons';

const GameDetailsScreen = ({ navigation, route, }) => {
    const dispatch = useDispatch();
    let gameData = route?.params?.gameData;

    let gameReviews = useSelector(state => state.root.gameReviews)
    let [state, setState] = useState({
        loading: true,
        selectedSortType: 'RECENT',
        showBuyModal: false
    })
    const TRANS_BLACK = 'rgba(0,0,0,0.0)';
    const BLACK = 'black';
    const COLORS_ARR = [AppTheme.colors.darkGrey, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, BLACK, BLACK];

    function getgamereviewshelper(cursor, filter) {
        GetGameReviews((reviewsRes) => {
            if (reviewsRes) {
                dispatch(setGameReviews(reviewsRes))
                setState(prev => ({ ...prev, loading: false }))
            } else {
                setState(prev => ({ ...prev, loading: false }))
            }
        }, 0, filter, gameData._id)
    }

    useEffect(() => {
        getgamereviewshelper(0, 'RECENT');
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }} onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', top: 0, left: 0, right: 0, zIndex: 10 }}>
                <AppBackButton navigation={navigation} />
                <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={() => {
                    Linking.openURL(gameData?.referralLink || '')
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={ICON_SHOP} style={{ height: RFValue(30), width: RFValue(30), tintColor: AppTheme.colors.yellow }} />
                        <AppText size={2} style={{ paddingLeft: RFValue(15), color: AppTheme.colors.yellow }} >Buy it now!</AppText>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 0.3 }} />
            </View>
            <ScrollView style={{ flex: 1 }} decelerationRate={0} nestedScrollEnabled={true}>
                <View style={{ height: state.LHeight, width: state.LWidth }}>
                    <FastImage source={gameData?.background?.url ? { uri: gameData?.background?.url } : BACKGROUND_IMG} style={{ height: state.LHeight, width: state.LWidth, }} >
                        <LinearGradient colors={COLORS_ARR} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <UserAvatar corner={gameData?.corner || ''} color={false} source={gameData?.background?.url ? { uri: gameData?.background?.url } : BACKGROUND_IMG} size={140} />

                            <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(10), paddingVertical: RFValue(10), justifyContent: 'space-between', }}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <AppText size={3} color={'white'} bold={true} style={{}}>{gameData?.name}</AppText>
                                    <AppText size={1} color={AppTheme.colors.lightGrey} style={{}}>{gameData?.supportedDevices.map(ii => (ii + ', ').toUpperCase())}</AppText>
                                    <AppText size={1} color={AppTheme.colors.lightGrey} style={{}}>Release date: {moment(gameData?.releaseDate).format('DD MMMM YYYY')}</AppText>
                                </View>
                                <View style={{ borderRadius: RFValue(5), borderWidth: 1, justifyContent: 'center', padding: RFValue(10), alignItems: 'center', borderColor: AppTheme.colors.green }}>
                                    <AppText size={1} color={'white'} bold={true} style={{}}>RATE</AppText>
                                    <AppText size={4} color={'white'} bold={true} style={{}}>{((gameData?.computed[0]?.value || 0) / (gameData?.computed[1]?.value || 0)).toFixed(2)}</AppText>
                                </View>
                            </View>
                        </LinearGradient>
                    </FastImage>
                </View>


                <View style={{ padding: RFValue(10) }}>
                    <AppText onPress={() => {
                        setState(prev => ({ ...prev, bioShowMoreLines: state.bioShowMoreLines === 3 ? 10 : 3 }))
                    }} lines={state.bioShowMoreLines} style={{}}>{gameData?.description}</AppText>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, bioShowMoreLines: state.bioShowMoreLines === 3 ? 10 : 3 }))
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AppText color={AppTheme.colors.lightGrey} style={{ paddingVertical: RFValue(10) }}>{state.bioShowMoreLines === 3 ? "More" : "Less"} </AppText>
                            <MaterialIcons name={state.bioShowMoreLines === 3 ? "keyboard-arrow-down" : "keyboard-arrow-up"} style={{ fontSize: RFValue(20), color: AppTheme.colors.lightGrey }} />
                        </View>
                    </TouchableOpacity>
                </View>

                <AppText size={2} style={{ paddingLeft: RFValue(10), paddingBottom: RFValue(20) }} color={AppTheme.colors.lightGrey}>Suggested price: {gameData?.price || '0'} $</AppText>


                <View style={{ padding: RFValue(10) }}>
                    <AppButton label={"RATE THIS GAME"} onPress={() => { navigation.navigate('RateGameScreen', { gameData }) }} bgColor={"black"} />
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(10) }}>
                    <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, margin: RFValue(3) }} onPress={() => {
                        getgamereviewshelper(0, 'RECENT')
                        setState(prev => ({ ...prev, loading: true, selectedSortType: 'RECENT' }))
                    }}>
                        <View style={{ borderRadius: 90, borderWidth: state.selectedSortType === 'RECENT' ? 1 : 0, borderColor: AppTheme.colors.lightGrey, flex: 1, paddingVertical: RFValue(10), justifyContent: 'center', alignItems: 'center' }}>
                            <AppText size={2} color={AppTheme.colors.lightGrey} >Recent</AppText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, margin: RFValue(3) }} onPress={() => {
                        getgamereviewshelper(0, 'LOWEST')
                        setState(prev => ({ ...prev, loading: true, selectedSortType: 'LOWEST' }))
                    }}>
                        <View style={{ borderRadius: 90, borderWidth: state.selectedSortType === 'LOWEST' ? 1 : 0, borderColor: AppTheme.colors.lightGrey, flex: 1, paddingVertical: RFValue(10), justifyContent: 'center', alignItems: 'center' }}>
                            <AppText size={2} color={AppTheme.colors.lightGrey} >Lowest</AppText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, margin: RFValue(3) }} onPress={() => {
                        getgamereviewshelper(0, 'HIGHEST')
                        setState(prev => ({ ...prev, loading: true, selectedSortType: 'HIGHEST' }))
                    }}>
                        <View style={{ borderRadius: 90, borderWidth: state.selectedSortType === 'HIGHEST' ? 1 : 0, borderColor: AppTheme.colors.lightGrey, flex: 1, paddingVertical: RFValue(10), justifyContent: 'center', alignItems: 'center' }}>
                            <AppText size={2} color={AppTheme.colors.lightGrey} >Highest</AppText>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{ height: Dimensions.get('screen').height - RFValue(200) }}>
                    <FlatList
                        data={gameReviews}
                        initialNumToRender={2}
                        windowSize={2}
                        decelerationRate={0}
                        nestedScrollEnabled={true}
                        keyExtractor={ii => ii?._id}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={2}
                        bounces={false}
                        keyExtractor={ii => (ii._id || '') + 'you'}
                        renderItem={({ item, index }) => (
                            <View style={{ padding: RFValue(15), borderBottomWidth: 0.3, borderBottomColor: AppTheme.colors.lightGrey }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: RFValue(15) }}>
                                    <UserAvatar corner={item?.createdBy?.corner || ''} color={item?.createdBy?.cornerColor} onPress={() => {
                                        if (item?.createdBy?._id)
                                            navigation.navigate("UserProfileScreen", { userID: item?.createdBy?._id })
                                    }} source={item?.createdBy?.pic ? { uri: item?.createdBy?.pic } : false} />

                                    <TouchableOpacity activeOpacity={0.9} style={{ flex: 1, justifyContent: 'center' }} onPress={() => {
                                        if (item?.createdBy?._id)
                                            navigation.navigate("UserProfileScreen", { userID: item?.createdBy?._id })
                                    }}>
                                        <View style={{ paddingLeft: RFValue(14) }} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>{item?.createdBy?.firstName || item?.createdBy?.userName}</AppText>
                                                <IsUserVerifiedCheck check={item?.createdBy?.isVerified} />
                                                <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item?.createdBy?.level)}</AppText>
                                            </View>
                                            <AppText size={1} color={AppTheme.colors.lightGrey} >{item?.createdBy?.userName}</AppText>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ borderColor: AppTheme.colors.green, borderWidth: 1, paddingHorizontal: RFValue(25), paddingVertical: RFValue(10), borderRadius: RFValue(15) }} >
                                        <AppText size={1} style={{ textAlign: 'center' }} >{item?.devices[0]}</AppText>
                                        <AppText size={3} style={{ textAlign: 'center' }} >{parseFloat(item?.ratings || 0)?.toFixed(2)}</AppText>
                                    </View>
                                </View>
                                <AppText size={2}  >{item?.feedback}</AppText>
                                <AppText size={1} color={AppTheme.colors.lightGrey} style={{ paddingTop: RFValue(10) }}>{moment(item?.createdAt).format('DD MMM YYYY')}</AppText>
                            </View>
                        )} />
                </View>



            </ScrollView>






        </View>
    );
};

export { GameDetailsScreen };
