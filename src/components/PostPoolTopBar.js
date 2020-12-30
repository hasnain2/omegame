
import React, { useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { ICON_BLOCK, ICON_DELETE, ICON_MENU, ICON_MODIFY, ICON_MUTE, ICON_REPORT, ICON_UNFOLLOW } from '../../assets/icons';
import { AppText, AppUserBoxNameAvatar } from '../components';
import { AppTheme } from '../config';
import { ActionsOnUsers } from '../services';
import { RemovePostsOfUserFromReduxStore } from '../services/mutateReduxState';
import { DeletePost, FollowPost } from '../services/postService';
import { FRIEND_STATUSES_ACTIONS } from '../utils/AppConstants';
import { AppLogger } from '../utils/AppHelperMethods';
import { AppModal } from './AppModal';
const PostPoolTopBar = ({ item, navigation }) => {
    const user = useSelector(state => state.root.user)
    let [state, setState] = useState({
        showMenu: '',
        isFollowing: item.isFollowing || false
    })
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppUserBoxNameAvatar navigation={navigation} createdAt={item?.createdAt} item={item?.createdBy} />
                <TouchableOpacity onPress={() => {
                    setState(prev => ({ ...prev, showMenu: item._id }))
                }}>
                    <Image source={ICON_MENU} style={{ tintColor: 'white', height: RFValue(30), width: RFValue(30), padding: RFValue(15) }} />
                </TouchableOpacity>
            </View>

            <AppModal show={state.showMenu === item._id}
                type={"bottom"}
                toggle={() => { setState(prev => ({ ...prev, showMenu: '' })) }}
            >
                <View style={{ backgroundColor: 'black', width: Dimensions.get('screen').width, paddingBottom: RFValue(40) }}>
                    <View style={{ height: RFValue(3), margin: RFValue(10), width: RFValue(40), backgroundColor: AppTheme.colors.lightGrey, alignSelf: 'center', borderRadius: 20 }} />

                    {item?.createdBy?._id === user?._id || item?.createdBy?.profile?._id === user?._id ?
                        <>
                            <TouchableOpacity onPress={() => {
                                // modify post
                                setState(prev => ({ ...prev, showMenu: '' }))
                            }} style={styles.modalListItemStyle}>
                                <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                                    <Image source={ICON_MODIFY} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                                </View>
                                <AppText size={2} color="white" style={{ flex: 1 }}>Modify</AppText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setState(prev => ({ ...prev, showMenu: '' }))
                                DeletePost((res) => { }, item?._id)
                            }} style={styles.modalListItemStyle}>
                                <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                                    <Image source={ICON_DELETE} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                                </View>
                                <AppText size={2} color="white" style={{ flex: 1 }}>Delete</AppText>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                            <TouchableOpacity onPress={() => {
                                // modify post
                                setState(prev => ({ ...prev, showMenu: '' }))
                            }} style={styles.modalListItemStyle}>
                                <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                                    <Image source={ICON_REPORT} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                                </View>
                                <AppText size={2} color="white" style={{ flex: 1 }}>Report</AppText>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                // modify post
                                setState(prev => ({ ...prev, showMenu: '' }))
                            }} style={styles.modalListItemStyle}>
                                <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                                    <Image source={ICON_MUTE} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                                </View>
                                <AppText size={2} color="white" style={{ flex: 1 }}>Mute</AppText>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                FollowPost(() => {

                                }, item._id, { follow: !state.isFollowing })
                                setState(prev => ({ ...prev, showMenu: '', isFollowing: !state.isFollowing }))
                            }} style={styles.modalListItemStyle}>
                                <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                                    <Image source={ICON_UNFOLLOW} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                                </View>
                                <AppText size={2} color="white" style={{ flex: 1 }}>{state.isFollowing ? "Unfollow" : "Follow"}</AppText>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                Alert.alert(
                                    "Block " + (item?.createdBy?.firstName || item?.createdBy?.userName),
                                    "Are you sure you want to block " + (item?.createdBy?.firstName || item?.createdBy?.userName) + '?',
                                    [{
                                        text: "Cancel",
                                        onPress: () => AppLogger('', "Cancel Pressed"),
                                        style: "cancel"
                                    }, {
                                        text: "Block", onPress: () => {
                                            setState(prev => ({ ...prev, showMenu: '' }))
                                            RemovePostsOfUserFromReduxStore(item?.createdBy?._id);
                                            ActionsOnUsers(() => {

                                            }, item?.createdBy?._id, FRIEND_STATUSES_ACTIONS.BLOCKED)
                                        }
                                    }], { cancelable: false });


                            }} style={styles.modalListItemStyle}>
                                <View style={{ justifyContent: "center", alignItems: 'center', flex: 0.15 }}>
                                    <Image source={ICON_BLOCK} style={{ height: RFValue(30), width: RFValue(30), tintColor: 'white' }} />
                                </View>
                                <AppText size={2} color="white" style={{ flex: 1 }}>Block</AppText>
                            </TouchableOpacity>
                        </>
                    }
                </View>
            </AppModal>

        </>
    )
};

const styles = StyleSheet.create({
    modalListItemStyle: { flexDirection: 'row', alignItems: 'center', padding: RFValue(10), paddingHorizontal: RFValue(20) },
    modalIconStyle: { fontSize: RFValue(25), flex: 0.15, color: 'white' },
})

export { PostPoolTopBar };
