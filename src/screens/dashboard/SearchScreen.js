

import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppButton, AppModal, AppRadioButton, AppSearchBar, AppText } from '../../components';
import { AppTheme } from '../../config';
import { MOCK_RELEASEDATE_TYPES } from '../../mockups/Mockups';
import { setQuery } from '../../redux/reducers/querySlice';
import { setSettings } from '../../redux/reducers/settingsSlice';
import { store } from '../../redux/store';
import { GetCurrentDate, GetLastMonthEndOf, GetLastMonthStartOf, GetLastWeekEndOf, GetLastWeekStartOf, GetLastYearEndOf, GetLastYearStartOf } from '../../utils/AppHelperMethods';
import { AntDesign } from '../../utils/AppIcons';
import { SearchTabs } from './SearchScreenTabs/SearchTabs';
const POST_SORTING_TYPES = [{ id: 0, name: 'Best' }, { id: 1, name: 'Top' }, { id: 2, name: 'Hot' }, { id: 3, name: 'Controversial' }, { id: 4, name: 'Rising' },];
const NUMBER_OF_COLUMNS = 2;
const SearchScreen = ({ route, navigation }) => {
    const type = route?.params?.type
    let [state, setState] = useState({
        searchTerm: '',
        showFilter: false,
        sortPostBy: '',
        sortPostByTime: 'Newest'
    });
    useEffect(() => {

    }, [type])

    const setQueryHelper = (searchTerm) => {
        store.dispatch(setQuery(`${state.sortPostBy ? ('&sort=' + state.sortPostBy.toUpperCase()) : ''}${searchTerm ? ("&search=" + searchTerm) : ''}&from=${state.sortPostByTime === 'Newest' ? GetLastMonthStartOf()
            : state.sortPostByTime === 'Past week' ? GetLastWeekStartOf()
                : state.sortPostByTime === 'Past month' ? GetLastMonthStartOf()
                    : state.sortPostByTime === 'Past year' ? GetLastYearStartOf()
                        : GetLastYearStartOf()
            }&to=${state.sortPostByTime === 'Newest' ? GetCurrentDate()
                : state.sortPostByTime === 'Past week' ? GetLastWeekEndOf()
                    : state.sortPostByTime === 'Past month' ? GetLastMonthEndOf()
                        : state.sortPostByTime === 'Past year' ? GetLastYearEndOf()
                            : GetCurrentDate()
            }`))
    }

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', e => {
            store.dispatch(setSettings({ bgColor: AppTheme.colors.background }));
        });
        const unsubscribeBlur = navigation.addListener('blur', e => {
            store.dispatch(setSettings({ bgColor: AppTheme.colors.darkGrey }));
        });

        setQueryHelper('');

        console.log('-^^^^^^^^^^^-SEARCH SCREEN MOUNTED-^^^^^^6')
        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
            console.log('-vvvvvvvv-SEARCH SCREEN destroyed-vvvvvvvvv6')
        }
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppTheme.colors.background }}>
            <View style={{ padding: RFValue(10), paddingBottom: 0 }}>
                <AppSearchBar onChangeText={(val) => {
                    setState(prev => ({ ...prev, searchTerm: val }))
                    setQueryHelper(val)
                }} onRightPess={() => { setState(prev => ({ ...prev, showFilter: true })) }} />
            </View>
            <View style={{ flex: 1, backgroundColor: AppTheme.colors.darkGrey }}>
                <SearchTabs navigation={navigation}
                    // &sort=${state.sortPostBy.toUpperCase()}
                    type={type}
                />
            </View>

            <AppModal show={state.showFilter} toggle={() => { setState(prev => ({ ...prev, showFilter: !state.showFilter })) }}>
                <View style={{ backgroundColor: '#1b1b1b', padding: RFValue(15), width: '85%', maxHeight: '90%', borderRadius: 15 }}>
                    <AntDesign onPress={() => setState(prev => ({ ...prev, showFilter: false }))} name="close" style={{ fontSize: RFValue(25), padding: RFValue(5), textAlign: 'right', color: 'white' }} />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, visibleFilter: state.visibleFilter !== 'sortPostBy' ? 'sortPostBy' : '' }))
                    }}>
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: AppTheme.colors.lightGrey, paddingBottom: RFValue(15) }}>
                            <AppText size={2} >Sort Post by:</AppText>
                            <AppText size={2} color={AppTheme.colors.primary} style={{ paddingTop: RFValue(10) }}>{state.sortPostBy || "Select"}</AppText>
                        </View>
                    </TouchableOpacity>
                    {state.visibleFilter === 'sortPostBy' ?
                        <FlatList
                            data={POST_SORTING_TYPES}
                            numColumns={NUMBER_OF_COLUMNS}

                            initialNumToRender={2}
                            windowSize={2}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={2}
                            bounces={false}
                            keyExtractor={ii => (ii._id || '') + 'you'}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, paddingVertical: RFValue(6) }}>
                                    <AppRadioButton val={state.sortPostBy === item.name} onPress={() => {
                                        setState(prev => ({ ...prev, sortPostBy: item.name }))
                                    }} size={20} label={item.name} />
                                </View>
                            )} />
                        : null}

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, visibleFilter: state.visibleFilter !== 'sortPostByTime' ? 'sortPostByTime' : '' }))
                    }}>
                        <View style={{ paddingVertical: RFValue(15) }}>
                            <AppText size={2} >Release date:</AppText>
                            <AppText size={2} color={AppTheme.colors.primary} style={{ paddingTop: RFValue(10) }}>{state.sortPostByTime}</AppText>
                        </View>
                    </TouchableOpacity>

                    {state.visibleFilter === 'sortPostByTime' ?
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
                                    <AppRadioButton val={state.sortPostByTime === item.name} onPress={() => {
                                        setState(prev => ({ ...prev, sortPostByTime: item.name }))
                                    }} size={20} label={item.name} />
                                </View>
                            )} />
                        : null}

                    <View style={{ paddingTop: RFValue(20) }}>
                        <AppButton bgColor={'#1b1b1b'} label={"START"} onPress={() => {
                            setState(prev => ({ ...prev, showFilter: false }))
                            setQueryHelper(state.searchTerm);
                        }} />
                    </View>

                    <AppText onPress={() => {
                        setState(prev => ({
                            ...prev,
                            sortPostBy: 'Best',
                            sortPostByTime: 'Newest'
                        }))
                        setQueryHelper(state.searchTerm);
                    }}
                        color={AppTheme.colors.red} size={2}
                        style={{ paddingTop: RFValue(20), paddingBottom: RFValue(10), textAlign: 'center' }}>Reset</AppText>
                </View>
            </AppModal>
        </SafeAreaView>
    );
};


export { SearchScreen };
