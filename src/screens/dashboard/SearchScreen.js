

import React, { useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppButton, AppModal, AppRadioButton, AppSearchBar, AppText } from '../../components';
import { AppTheme } from '../../config';
import { MOCK_RELEASEDATE_TYPES } from '../../mockups/Mockups';
import { AntDesign } from '../../utils/AppIcons';
import { SearchTabs } from './SearchScreenTabs/SearchTabs';
const POST_SORTING_TYPES = [{ id: 0, name: 'Best' }, { id: 1, name: 'Top' }, { id: 2, name: 'Hot' }, { id: 3, name: 'Controversial' }, { id: 4, name: 'Rising' },];
const NUMBER_OF_COLUMNS = 2;
const SearchScreen = ({ route, navigation }) => {
    let [state, setState] = useState({
        searchTerm: '',
        showFilter: false,
        sortPostBy: 'Best',
        sortPostByTime: 'Newest'
    })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppTheme.colors.background }}>
            <View style={{ padding: RFValue(10), paddingBottom:0 }}>
                <AppSearchBar onChangeText={(val) => setState(prev => ({ ...prev, searchTerm: val }))} onRightPess={() => { setState(prev => ({ ...prev, showFilter: true })) }} />
            </View>
            <View style={{ flex: 1, backgroundColor: AppTheme.colors.darkGrey }}>
                <SearchTabs navigation={navigation} />
            </View>

            <AppModal show={state.showFilter} toggle={() => { setState(prev => ({ ...prev, showFilter: !state.showFilter })) }}>
                <View style={{ backgroundColor: '#1b1b1b', padding: RFValue(15), width: '85%', maxHeight: '90%', borderRadius: 15 }}>
                    <AntDesign onPress={() => setState(prev => ({ ...prev, showFilter: false }))} name="close" style={{ fontSize: RFValue(25), padding: RFValue(5), textAlign: 'right', color: 'white' }} />
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, visibleFilter: state.visibleFilter != 'sortPostBy' ? 'sortPostBy' : '' }))
                    }}>
                        <View style={{ borderBottomWidth: 0.4, borderBottomColor: AppTheme.colors.lightGrey, paddingBottom: RFValue(15) }}>
                            <AppText size={2} >Sort Post by:</AppText>
                            <AppText size={2} color={AppTheme.colors.primary} style={{ paddingTop: RFValue(10) }}>{state.sortPostBy}</AppText>
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
                            keyExtractor={ii => ii.id + 'you'}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, paddingVertical: RFValue(6) }}>
                                    <AppRadioButton val={state.sortPostBy === item.name} onPress={() => {
                                        setState(prev => ({ ...prev, sortPostBy: item.name }))
                                    }} size={20} label={item.name} />
                                </View>
                            )} />
                        : null}

                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        setState(prev => ({ ...prev, visibleFilter: state.visibleFilter != 'sortPostByTime' ? 'sortPostByTime' : '' }))
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
                            keyExtractor={ii => ii.id + 'you'}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, paddingVertical: RFValue(6) }}>
                                    <AppRadioButton val={state.sortPostByTime === item.name} onPress={() => {
                                        setState(prev => ({ ...prev, sortPostByTime: item.name }))
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
        </SafeAreaView>
    );
};


export { SearchScreen };
