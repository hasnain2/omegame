
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppButton, AppLoadingView, AppModal, AppRadioButton, AppSearchBar, AppText } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCK_CONSOLE_TYPES, MOCK_GAMES, MOCK_GENRE_TYPES, MOCK_RELEASEDATE_TYPES } from '../../mockups/Mockups';
import { GetGamesList } from '../../services/gamesService';
import { AntDesign, MaterialIcons } from '../../utils/AppIcons';
const NUMBER_OF_COLUMNS = 2;
const ReviewsScreen = ({ navigation }) => {
    let [state, setState] = useState({
        loading: true,
        searchTerm: '',
        offset: 0,
        showFilter: false,
        visibleFilter: '',
        selectedConsoleTypes: [],
        selectedGenreTypes: [],
        releaseDate: 'All time',
        data: []

    })
    function getgameshelper(offset) {
        GetGamesList((gamesRes) => {
            if (gamesRes) {
                setState(prev => ({ ...prev, loading: false, data: gamesRes }))
            } else {
                setState(prev => ({ ...prev, loading: false }))
            }
        }, offset)
    }

    useEffect(() => {
        getgameshelper(0);
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: AppTheme.colors.background }}>
            <View style={{ padding: RFValue(10) }}>
                <AppSearchBar onChangeText={(val) => { setState(prev => ({ ...prev, searchTerm: val })) }} onRightPess={() => { setState(prev => ({ ...prev, showFilter: true })) }} />
            </View>
            {state.loading ?
                <AppLoadingView />
                : null}
            <View style={{ flex: 1 }}>
                <FlatList
                    data={state.data}

                    initialNumToRender={2}
                    windowSize={2}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    bounces={false}
                    keyExtractor={ii => (ii._id || '') + 'you'}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                                navigation.navigate("GameDetailsScreen", { gameData: item })
                            }}>
                                <>
                                    <View style={{ flexDirection: 'row', flex: 1, padding: RFValue(10), alignItems: 'center' }}>
                                        <UserAvatar corner={item?.corner || ''}  source={item?.background?.url ? { uri: item?.background?.url } : DEFAULT_USER_PIC} size={55} />
                                        <View style={{ paddingLeft: RFValue(10), flex: 1 }}>
                                            <AppText size={3} bold={true} >{item.name}</AppText>
                                            <AppText size={2} color={AppTheme.colors.lightGrey} >{item.supportedDevices.map(ii => (ii + ', ').toUpperCase())}</AppText>
                                            <AppText size={0} color={AppTheme.colors.lightGrey} >Release Date: {moment(item.releaseDate).format('DD MMMM YYYY')}</AppText>
                                        </View>
                                        <AppText size={2} color={item.negetive ? AppTheme.colors.red : AppTheme.colors.green} >{item?.computed[0]?.value?.toFixed(2)}</AppText>
                                        <MaterialIcons name="arrow-forward-ios" style={{ fontSize: RFValue(18), paddingLeft: RFValue(10), color: AppTheme.colors.lightGrey }} />
                                    </View>
                                    <Divider style={{ backgroundColor: AppTheme.colors.lightGrey, height: 0.5 }} />
                                </>
                            </TouchableOpacity>
                        )
                    }} />
            </View>


            <AppModal show={state.showFilter} toggle={() => { setState(prev => ({ ...prev, showFilter: !state.showFilter })) }}>
                <View style={{ backgroundColor: '#1b1b1b', padding: RFValue(15), width: '85%', maxHeight: '90%', borderRadius: 15 }}>
                    <AntDesign onPress={() => setState(prev => ({ ...prev, showFilter: false }))} name="close" style={{ fontSize: RFValue(25), padding: RFValue(5), textAlign: 'right', color: 'white' }} />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, visibleFilter: state.visibleFilter != 'console' ? 'console' : '' }))
                    }}>
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: AppTheme.colors.lightGrey, paddingBottom: RFValue(15) }}>
                            <AppText size={2} >Console:</AppText>
                            <AppText size={2} color={AppTheme.colors.primary} style={{ paddingTop: RFValue(10) }}>{state.selectedConsoleTypes.length > 0 ? state.selectedConsoleTypes.map(ii => ii + '; ') : "All"}</AppText>
                        </View>
                    </TouchableOpacity>
                    {state.visibleFilter === 'console' ?
                        <FlatList
                            data={MOCK_CONSOLE_TYPES}

                            initialNumToRender={2}
                            windowSize={2}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={2}
                            bounces={false}
                            keyExtractor={ii => (ii._id || '') + 'you'}
                            numColumns={NUMBER_OF_COLUMNS}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, paddingVertical: RFValue(6) }}>
                                    <AppRadioButton val={state.selectedConsoleTypes.find((i) => i === item.name)} onPress={() => {
                                        let tempArr = state.selectedConsoleTypes
                                        if (tempArr.find((i) => i === item.name)) {
                                            let tempInd = tempArr.findIndex(r => r === item.name);
                                            if (tempInd >= 0)
                                                tempArr.splice(tempInd, 1)
                                        } else {
                                            tempArr.push(item.name)
                                        }
                                        setState(prev => ({ ...prev, selectedConsoleTypes: tempArr }))
                                        console.log(state.selectedConsoleTypes)
                                    }} size={20} label={item.name} />
                                </View>
                            )} />
                        : null}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, visibleFilter: state.visibleFilter != 'genre' ? 'genre' : '' }))
                    }}>
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: AppTheme.colors.lightGrey, paddingVertical: RFValue(15) }}>
                            <AppText size={2} >Genre:</AppText>
                            <AppText size={2} color={AppTheme.colors.primary} style={{ paddingTop: RFValue(10) }}>{state.selectedGenreTypes.length > 0 ? state.selectedGenreTypes.map(ii => ii + '; ') : "All"}</AppText>
                        </View>
                    </TouchableOpacity>
                    {state.visibleFilter === 'genre' ?
                        <FlatList
                            data={MOCK_GENRE_TYPES}

                            initialNumToRender={2}
                            windowSize={2}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={2}
                            bounces={false}
                            keyExtractor={ii => (ii._id || '') + 'you'}
                            numColumns={NUMBER_OF_COLUMNS}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, paddingVertical: RFValue(6) }}>
                                    <AppRadioButton val={state.selectedGenreTypes.find((i) => i === item.name)} onPress={() => {
                                        let tempArr = state.selectedGenreTypes
                                        if (tempArr.find((i) => i === item.name)) {
                                            let tempInd = tempArr.findIndex(r => r === item.name);
                                            if (tempInd >= 0)
                                                tempArr.splice(tempInd, 1)
                                        } else {
                                            tempArr.push(item.name)
                                        }
                                        setState(prev => ({ ...prev, selectedGenreTypes: tempArr }))
                                        console.log(state.selectedGenreTypes)
                                    }} size={20} label={item.name} />
                                </View>
                            )} />
                        : null}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, visibleFilter: state.visibleFilter != 'releasedate' ? 'releasedate' : '' }))
                    }}>
                        <View style={{ paddingVertical: RFValue(15) }}>
                            <AppText size={2} >Release date:</AppText>
                            <AppText size={2} color={AppTheme.colors.primary} style={{ paddingTop: RFValue(10) }}>{state.releaseDate}</AppText>
                        </View>
                    </TouchableOpacity>

                    {state.visibleFilter === 'releasedate' ?
                        <FlatList
                            data={MOCK_RELEASEDATE_TYPES}
                            numColumns={NUMBER_OF_COLUMNS}

                            initialNumToRender={2}
                            windowSize={2}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={2}
                            bounces={false}
                            keyExtractor={ii => (ii._id || '') + 'you'}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, paddingVertical: RFValue(6) }}>
                                    <AppRadioButton val={state.releaseDate === item.name} onPress={() => {
                                        setState(prev => ({ ...prev, releaseDate: item.name }))
                                    }} size={20} label={item.name} />
                                </View>
                            )} />
                        : null}

                    <View style={{ paddingTop: RFValue(20) }}>
                        <AppButton bgColor={'#1b1b1b'} label={"START"} onPress={() => { setState(prev => ({ ...prev, showFilter: false })) }} />
                    </View>

                    <AppText onPress={() => setState(prev => ({ ...prev, showFilter: false }))} color={AppTheme.colors.red} size={2} style={{ paddingTop: RFValue(20), paddingBottom: RFValue(10), textAlign: 'center' }}>Reset</AppText>
                </View>
            </AppModal>
        </View>
    );
};

export { ReviewsScreen };
