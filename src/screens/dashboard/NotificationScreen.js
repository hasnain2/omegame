

import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppButton, AppHeader, AppText } from '../../components';
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { MOCK_FOLLOW_REQUESTS, MOCK_NOTIFICATIONS } from '../../mockups/Mockups';
import { AntDesign } from '../../utils/AppIcons';
const NotificationScreen = ({ navigation, route, }) => {
    let tempArr = MOCK_FOLLOW_REQUESTS;
    let user = useSelector(state => state.root.user)
    console.log('-----------------user-------', user)
    let [state, setState] = useState({
        loading: false,
        data: tempArr.slice(0, 3),
        limitRequests: 2
    })
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <AppHeader navigation={navigation} />

            <View style={{ padding: RFValue(10) }}>
                <AppText size={1} bold={true} color={AppTheme.colors.lightGrey}>FOLLOW REQUESTS</AppText>

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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: RFValue(10), borderBottomWidth: 0.5, borderBottomColor: 'grey' }}>
                                <View >
                                    <UserAvatar corner={item?.user?.corner || ''}  size={50} />
                                    <View style={{ position: 'absolute', bottom: RFValue(14), right: RFValue(2), backgroundColor: 'white', borderRadius: 90, }}>
                                        <AntDesign name={"pluscircle"} style={{ fontSize: RFValue(15), color: AppTheme.colors.primary }} />

                                    </View>
                                </View>
                                <View style={{ flex: 1, paddingLeft: RFValue(10) }}>
                                    <AppText size={2} >{item.msg}</AppText>
                                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', paddingVertical: RFValue(5) }}>
                                        <View style={{ flex: 0.3 }} />
                                        <View style={{ flex: 0.5, }}>
                                            <AppButton fill={true} onPress={() => { }} label={"ACCEPT"} />
                                        </View>
                                        <View style={{ flex: 0.5, paddingLeft: RFValue(5) }}>
                                            <AppButton onPress={() => { }} label={"DENY"} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }} />

                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    let tempData = MOCK_FOLLOW_REQUESTS;
                    if (state.limitRequests > 2) {
                        setState(prev => ({ ...prev, data: tempData.slice(0, 3), limitRequests: state.limitRequests > 2 ? 2 : 10 }))
                    } else {
                        setState(prev => ({ ...prev, data: tempData.slice(0, 10), limitRequests: state.limitRequests > 2 ? 2 : 10 }))
                    }

                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <AppText size={3} color={AppTheme.colors.lightGrey} style={{ textAlign: 'center', paddingVertical: RFValue(10) }}>{state.limitRequests > 2 ? "Show Less" : "Show more"}</AppText>
                    </View>
                </TouchableOpacity>

                <AppText size={1} bold={true} color={AppTheme.colors.lightGrey}>NOTIFICATIONS</AppText>

                <FlatList
                    data={MOCK_NOTIFICATIONS}
                    initialNumToRender={2}
                    windowSize={2}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    bounces={false}
                    keyExtractor={ii => (ii._id || '') + 'you'}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: RFValue(10), borderBottomWidth: 0.5, borderBottomColor: 'grey' }}>
                            <UserAvatar corner={item?.user?.corner || ''}  size={40} />
                            <View style={{ flex: 1, paddingHorizontal: RFValue(10) }}>
                                <AppText color={item.read ? AppTheme.colors.lightGrey : 'white'} size={2}>{item.msg}  <AppText color={AppTheme.colors.lightGrey} size={2}>{moment(item.createdAt).fromNow(true)}</AppText></AppText>
                            </View>
                            {item.image ?
                                <FastImage source={{ uri: item.image }} style={{ height: RFValue(50), width: RFValue(60), borderRadius: 5 }} />
                                : null}
                        </View>
                    )} />

            </View>
        </View>
    );
};

export { NotificationScreen };
