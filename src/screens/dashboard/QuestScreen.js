

import React, { useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Divider, ProgressBar } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_SHOP } from '../../../assets/icons';
import { BACKGROUND_IMG } from '../../../assets/images';
import { AppGoldCoin, AppText, IsUserVerifiedCheck } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCK_QUESTS } from '../../mockups/Mockups';
import { timeRemaining } from '../../utils/AppHelperMethods';
const QuestScreen = ({ route, navigation }) => {
    let [state, setState] = useState({
        LHeight: 0,
        LWidth: 0,
        visibleDescriptionOfIndex: 999999
    })
    const TRANS_BLACK = 'rgba(0,0,0,0.0)';
    const BLACK = 'black';
    const COLORS_ARR = [AppTheme.colors.darkGrey, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, TRANS_BLACK, BLACK, BLACK];
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}
            onLayout={(event) => {
                var { x, y, width, height } = event.nativeEvent.layout;
                setState(prev => ({ ...prev, LHeight: height, LWidth: width }))
            }}>
            <FlatList
                data={MOCK_QUESTS}

                initialNumToRender={2}
                windowSize={2}
                removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                bounces={false}
                keyExtractor={ii => ii.id + 'you'}
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
                                                <UserAvatar size={100} />
                                                <View style={{ flexDirection: 'row', paddingVertical: RFValue(15), alignItems: 'center' }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                                                        <AppGoldCoin />
                                                        <AppText style={{ paddingHorizontal: RFValue(10) }}>1123</AppText>
                                                    </View>
                                                    <View style={{ flex: 0.55 }}>
                                                        <ProgressBar style={{ height: RFValue(10), borderRadius: 3 }} progress={0.5} color={AppTheme.colors.primary} />
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                                                        <AppText size={1} bold={true} style={{}}>XP 50/100</AppText>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', paddingHorizontal: RFValue(10), paddingBottom: RFValue(10), justifyContent: 'space-between', }}>
                                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <AppText size={2} color={AppTheme.colors.lightGrey} bold={true} style={{}}>Username</AppText>
                                                            <IsUserVerifiedCheck check={true} />
                                                        </View>
                                                        <AppText size={1} color={AppTheme.colors.lightGrey} style={{}}>NickName</AppText>
                                                    </View>
                                                    <View style={{ borderRadius: RFValue(5), borderWidth: 1, justifyContent: 'center', padding: RFValue(10), alignItems: 'center', borderColor: AppTheme.colors.primary }}>
                                                        <AppText size={1} color={AppTheme.colors.primary} bold={true} style={{}}>LEVEL</AppText>
                                                        <AppText size={4} color={AppTheme.colors.primary} bold={true} style={{}}>1123</AppText>
                                                    </View>
                                                </View>
                                            </LinearGradient>
                                        </FastImage>
                                    </View>
                                    : null}
                                <View style={{ padding: RFValue(10) }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                        <AppText lines={2} color={"white"} size={2} bold={true} style={{ flex: 1 }}>{item.name}</AppText>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <AppGoldCoin />
                                            <AppText lines={2} color={"white"} size={1} bold={true} style={{ paddingHorizontal: RFValue(10) }} >10</AppText>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: RFValue(5), justifyContent: 'space-between', }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            <AppText lines={1} color={AppTheme.colors.primary} size={1} >8</AppText>
                                            <AppText lines={1} color={AppTheme.colors.lightGrey} size={1} > / 10 COMPLETED</AppText>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <AppText lines={2} color={AppTheme.colors.primary} size={1} bold={true} >XP+</AppText>
                                            <AppText lines={2} color={"white"} size={1} style={{ paddingHorizontal: RFValue(10) }} bold={true} >10</AppText>
                                        </View>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                        <AppText lines={2} color={AppTheme.colors.lightGrey} size={0} style={{ paddingVertical: RFValue(5) }} >TIME LEFT: {timeRemaining(item.deadLine).txt}</AppText>
                                    </View>

                                    {state.visibleDescriptionOfIndex === index ?
                                        <AppText color={'white'} size={2} style={{ paddingVertical: RFValue(5) }} >{item.description}</AppText>
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
