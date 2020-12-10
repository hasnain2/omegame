

import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_SHOP } from '../../../assets/icons';
import { BACKGROUND_IMG } from '../../../assets/images';
import { AppBackButton, AppButton, AppModal, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCKUP_POSTS } from '../../mockups/Mockups';
import { largeNumberShortify, timeRemaining } from '../../utils/AppHelperMethods';
import { MaterialIcons } from '../../utils/AppIcons';
const GameDetailsScreen = ({ navigation, route, }) => {
    let [state, setState] = useState({
        loading: false,
        selectedSortType: 'recent',
        showBuyModal: false
    })
    const TRANS_BLACK = 'rgba(0,0,0,0.0)';
    const BLACK = 'black';
    const COLORS_ARR = [AppTheme.colors.darkGrey, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, BLACK, BLACK];

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }} onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
                <AppBackButton navigation={navigation} />
                <TouchableOpacity activeOpacity={0.7} style={{ flex: 1 }} onPress={() => {
                    setState(prev => ({ ...prev, showBuyModal: true }));
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={ICON_SHOP} style={{ height: RFValue(30), width: RFValue(30), tintColor: AppTheme.colors.yellow }} />
                        <AppText size={2} style={{ paddingLeft: RFValue(15), color: AppTheme.colors.yellow }} >Buy it now!</AppText>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 0.3 }} />
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ height: state.LHeight, width: state.LWidth }}>
                    <FastImage source={BACKGROUND_IMG} style={{ height: state.LHeight, width: state.LWidth, }} >
                        <LinearGradient colors={COLORS_ARR} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                            <UserAvatar source={BACKGROUND_IMG} size={140} />

                            <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(10), paddingVertical: RFValue(10), justifyContent: 'space-between', }}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <AppText size={3} color={'white'} bold={true} style={{}}>Game Name</AppText>
                                    <AppText size={1} color={AppTheme.colors.lightGrey} style={{}}>Console game</AppText>
                                    <AppText size={1} color={AppTheme.colors.lightGrey} style={{}}>Release date: DD month YYYY</AppText>
                                </View>
                                <View style={{ borderRadius: RFValue(5), borderWidth: 1, justifyContent: 'center', padding: RFValue(10), alignItems: 'center', borderColor: AppTheme.colors.green }}>
                                    <AppText size={1} color={'white'} bold={true} style={{}}>LEVEL</AppText>
                                    <AppText size={4} color={'white'} bold={true} style={{}}>1123</AppText>
                                </View>
                            </View>
                        </LinearGradient>
                    </FastImage>
                </View>


                <View style={{ padding: RFValue(10) }}>
                    <AppText onPress={() => {
                        setState(prev => ({ ...prev, bioShowMoreLines: state.bioShowMoreLines === 3 ? 10 : 3 }))
                    }} lines={state.bioShowMoreLines} style={{}}>Lorem ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, </AppText>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, bioShowMoreLines: state.bioShowMoreLines === 3 ? 10 : 3 }))
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AppText color={AppTheme.colors.lightGrey} style={{ paddingVertical: RFValue(10) }}>{state.bioShowMoreLines === 3 ? "More" : "Less"} </AppText>
                            <MaterialIcons name={state.bioShowMoreLines === 3 ? "keyboard-arrow-down" : "keyboard-arrow-up"} style={{ fontSize: RFValue(20), color: AppTheme.colors.lightGrey }} />
                        </View>
                    </TouchableOpacity>
                </View>

                <AppText size={2} style={{ paddingLeft: RFValue(10), paddingBottom: RFValue(20) }} color={AppTheme.colors.lightGrey}>Suggested price: 00.01 $</AppText>


                <View style={{ padding: RFValue(10) }}>
                    <AppButton label={"RATE THIS GAME"} onPress={() => { navigation.navigate('RateGameScreen') }} bgColor={"black"} />
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(10) }}>
                    <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, margin: RFValue(3) }} onPress={() => {
                        setState(prev => ({ ...prev, selectedSortType: 'recent' }))
                    }}>
                        <View style={{ borderRadius: 90, borderWidth: state.selectedSortType === 'recent' ? 1 : 0, borderColor: AppTheme.colors.lightGrey, flex: 1, paddingVertical: RFValue(10), justifyContent: 'center', alignItems: 'center' }}>
                            <AppText size={2} color={AppTheme.colors.lightGrey} >Recent</AppText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, margin: RFValue(3) }} onPress={() => {
                        setState(prev => ({ ...prev, selectedSortType: 'lowest' }))
                    }}>
                        <View style={{ borderRadius: 90, borderWidth: state.selectedSortType === 'lowest' ? 1 : 0, borderColor: AppTheme.colors.lightGrey, flex: 1, paddingVertical: RFValue(10), justifyContent: 'center', alignItems: 'center' }}>
                            <AppText size={2} color={AppTheme.colors.lightGrey} >Lowest</AppText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, margin: RFValue(3) }} onPress={() => {
                        setState(prev => ({ ...prev, selectedSortType: 'highest' }))
                    }}>
                        <View style={{ borderRadius: 90, borderWidth: state.selectedSortType === 'highest' ? 1 : 0, borderColor: AppTheme.colors.lightGrey, flex: 1, paddingVertical: RFValue(10), justifyContent: 'center', alignItems: 'center' }}>
                            <AppText size={2} color={AppTheme.colors.lightGrey} >Highest</AppText>
                        </View>
                    </TouchableOpacity>
                </View>


                <FlatList
                    data={MOCKUP_POSTS}
                    initialNumToRender={2}
                    windowSize={2}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    bounces={false}
                    keyExtractor={ii => ii.id + 'you'}
                    renderItem={({ item, index }) => (
                        <View style={{ padding: RFValue(15), borderBottomWidth: 0.3, borderBottomColor: AppTheme.colors.lightGrey }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: RFValue(15) }}>
                                <UserAvatar source={item.user.photo ? { uri: item.user.photo } : false} />
                                <View style={{ flex: 1, paddingLeft: RFValue(14) }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>{item.user.first_name} {item.user.last_name}</AppText>
                                        <IsUserVerifiedCheck check={item.user.isVerified} />
                                        <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{ paddingLeft: RFValue(5) }}>{largeNumberShortify(item.user.XP)}</AppText>
                                    </View>
                                    <AppText size={1} color={AppTheme.colors.lightGrey} >{item.user.nickname}</AppText>
                                </View>

                                <View style={{ borderColor: AppTheme.colors.green, borderWidth: 1, paddingHorizontal: RFValue(25), paddingVertical: RFValue(10), borderRadius: RFValue(15) }} >
                                    <AppText size={1} >PS4</AppText>
                                    <AppText size={3} >9,8</AppText>
                                </View>
                            </View>
                            <AppText size={2}  >Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </AppText>
                            <AppText size={1} color={AppTheme.colors.lightGrey} style={{ paddingTop: RFValue(10) }}>DD month YYYY</AppText>
                        </View>
                    )} />

            </ScrollView>



          


        </View>
    );
};

export { GameDetailsScreen };
