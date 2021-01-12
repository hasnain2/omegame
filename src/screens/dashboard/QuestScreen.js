

import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Divider, ProgressBar } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_SHOP } from '../../../assets/icons';
import { BACKGROUND_IMG, DEFAULT_USER_PIC } from '../../../assets/images';
import { AppGoldCoin, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { GetQuests } from '../../services';
import { largeNumberShortify, timeRemaining } from '../../utils/AppHelperMethods';

const TRANS_BLACK = 'rgba(0,0,0,0.0)';
const BLACK = 'black';
const COLORS_ARR = [AppTheme.colors.darkGrey, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, BLACK, BLACK];

const QuestScreen = ({ route, navigation }) => {
    let { user } = useSelector(state => state.root)
    let [state, setState] = useState({
        loading: true,
        refreshing: false,
        LHeight: 0,
        LWidth: 0,
        visibleDescriptionOfIndex: 999999,
        data: []
    });

    function getquesthelper(offset) {
        GetQuests((questListResponse) => {
            if (questListResponse) {
                setState(prev => ({ ...prev, loading: false, refreshing: false, data: questListResponse }))
            } else {
                setState(prev => ({ ...prev, loading: false, refreshing: false, }))
            }
        }, offset)
    }

    useEffect(() => {
        getquesthelper(0);
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}
            onLayout={(event) => {
                var { x, y, width, height } = event.nativeEvent.layout;
                setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
            }}>
            <FlatList
                data={state.data}

                initialNumToRender={2}
                windowSize={2}
                maxToRenderPerBatch={2}

                refreshControl={
                    <RefreshControl
                        refreshing={state.refreshing}
                        tintColor={'white'}
                        onRefresh={() => {
                            setState(prev => ({ ...prev, refreshing: true }))
                            getquesthelper(0);
                        }}
                    />
                }
                keyExtractor={ii => (ii?._id || '') + 'you'}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.7} activeOpacity={1} onPress={() => {
                            if (state.visibleDescriptionOfIndex === index)
                                setState(prev => ({ ...prev, visibleDescriptionOfIndex: 999999 }))
                            else
                                setState(prev => ({ ...prev, visibleDescriptionOfIndex: index }))
                        }}>
                            <>
                                {index === 0 ?
                                    <View style={{ height: state.LHeight, width: state.LWidth }}>
                                        <FastImage source={BACKGROUND_IMG} style={{ height: state.LHeight, width: state.LWidth, }} >
                                            <LinearGradient colors={COLORS_ARR} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <UserAvatar corner={user?.corner || ''} source={user?.pic ? { uri: user.pic } : DEFAULT_USER_PIC} color={user?.cornerColor} size={100} />
                                                <View style={{ flexDirection: 'row', paddingVertical: RFValue(15), alignItems: 'center' }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                                                        <AppGoldCoin />
                                                        <AppText style={{ paddingHorizontal: RFValue(5) }}>{largeNumberShortify(user?.earnedCoins || 0)}</AppText>
                                                    </View>
                                                    <View style={{ flex: 0.35 }}>
                                                        <ProgressBar style={{ height: RFValue(10), borderRadius: 3 }} progress={(user?.earnedXps || 0) / 100} color={AppTheme.colors.primary} />
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                                                        <AppText size={1} bold={true} >XP {largeNumberShortify(user?.earnedXps || 0)}/100</AppText>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(10), paddingBottom: RFValue(10), justifyContent: 'space-between', }}>
                                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <AppText size={2} color={AppTheme.colors.lightGrey} bold={true} >{user?.firstName || user?.userName}</AppText>
                                                            <IsUserVerifiedCheck check={user?.isVerified} />
                                                        </View>
                                                        <AppText size={1} color={user?.nickNameColor ? user?.nickNameColor : AppTheme.colors.lightGrey} >{user?.nickName || user?.userName}</AppText>
                                                    </View>
                                                    <View style={{ borderRadius: RFValue(5), borderWidth: 1, justifyContent: 'center', padding: RFValue(10), alignItems: 'center', borderColor: AppTheme.colors.primary }}>
                                                        <AppText size={1} color={AppTheme.colors.primary} bold={true} >LEVEL</AppText>
                                                        <AppText size={4} color={AppTheme.colors.primary} bold={true} >{user?.level}</AppText>
                                                    </View>
                                                </View>
                                            </LinearGradient>
                                        </FastImage>
                                    </View>
                                    : null}
                                <View style={{ padding: RFValue(10) }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                        <AppText lines={2} color={"white"} size={2} bold={true} style={{ flex: 1 }}>{item?.questTitle}</AppText>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <AppGoldCoin />
                                            <AppText lines={2} color={"white"} size={1} bold={true} style={{ paddingHorizontal: RFValue(10) }} >{item?.questRewardInCoins}</AppText>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: RFValue(5), justifyContent: 'space-between', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <AppText lines={1} color={AppTheme.colors.primary} size={1} >{item?.userProgress?.startCount || 0}</AppText>
                                            <AppText lines={1} color={AppTheme.colors.lightGrey} size={1} > / {item?.tasks[0]?.taskGoal} COMPLETED</AppText>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <AppText lines={2} color={AppTheme.colors.primary} size={1} bold={true} >XP +</AppText>
                                            <AppText lines={2} color={"white"} size={1} style={{ paddingHorizontal: RFValue(10) }} bold={true} >{item?.questRewardInXp}</AppText>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                        <AppText lines={2} color={AppTheme.colors.lightGrey} size={0} style={{ paddingVertical: RFValue(5) }} >TIME LEFT: {timeRemaining(item.questExpiryDate).txt}</AppText>
                                    </View>

                                    {state.visibleDescriptionOfIndex === index ?
                                        <AppText color={'white'} size={2} style={{ paddingVertical: RFValue(5) }} >{item?.questDescription}</AppText>
                                        : null}
                                </View>
                                <Divider style={{ backgroundColor: 'grey', height: 0.5 }} />
                            </>
                        </TouchableOpacity>
                    )
                }}
            />

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, justifyContent: 'center', padding: RFValue(10), alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    navigation.navigate("OmegaStore")
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={ICON_SHOP} style={{ height: RFValue(30), width: RFValue(30), tintColor: AppTheme.colors.yellow }} />

                        <AppText color={AppTheme.colors.yellow} size={2} style={{ paddingLeft: RFValue(10) }} >OmegaStore</AppText>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export { QuestScreen };
