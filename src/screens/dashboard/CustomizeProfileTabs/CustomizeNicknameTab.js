import * as React from 'react';
import { Dimensions, FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppButtonPlane, AppGoldCoin, AppModal, AppText } from "../../../components";
import { AppTheme } from '../../../config';
import { MOCK_CORNERS } from '../../../mockups/Mockups';
import { setMyAssets } from '../../../redux/reducers/myAssetsSlice';
import { setUser } from '../../../redux/reducers/userSlice';
import { store } from '../../../redux/store';
import { GetMyAssets, PromtToSetAsDefault } from '../../../services/customizationService';
import { ASSET_TYPES, COLORS, COLOR_BUBBLE_SIZE } from '../../../utils/AppConstants';
import { RemoveDuplicateObjectsFromArray } from '../../../utils/AppHelperMethods';
import { AntDesign } from '../../../utils/AppIcons';
import { storeData } from '../../../utils/AppStorage';
const NUMBER_OF_COLUMNS = 2;

const PADDING = RFValue(3);
const CARD_WIDTH = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - (PADDING * RFValue(NUMBER_OF_COLUMNS));



const CustomizeNicknameTab = ({ navigation }) => {
    let { user, myAssets } = useSelector(state => state.root)
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a'
    })

    function getmyassetshelper() {
        GetMyAssets((nicknamesResponse) => {
            if (nicknamesResponse) {
                store.dispatch(setMyAssets({ nicknames: RemoveDuplicateObjectsFromArray(nicknamesResponse) }));
            }
            setState(prev => ({ ...prev, loading: false }))
        }, ASSET_TYPES.NICKNAME)
    }

    React.useEffect(() => {
        getmyassetshelper()
    }, [])

    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <View style={{ flexDirection: 'row', padding: RFValue(10) }}>
                {/* <FontAwesome name="paint-brush" style={{ fontSize: RFValue(20), margin: RFValue(10), color: '#02eeff' }} /> */}
                <ScrollView horizontal={true}>
                    {COLORS.map((itm, indx) => (
                        <TouchableOpacity key={`${indx}key`} activeOpacity={0.7} onPress={() => setState(prev => ({ ...prev, selectedColor: itm }))}>
                            <View style={{ height: COLOR_BUBBLE_SIZE, width: COLOR_BUBBLE_SIZE, margin: RFValue(10), backgroundColor: itm, borderRadius: 90, }} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <FlatList
                data={myAssets.nicknames}
                numColumns={NUMBER_OF_COLUMNS}

                initialNumToRender={2}
                windowSize={2}
                // removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                // bounces={false}
                keyExtractor={ii => (ii?._id || '') + 'you'}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            setState(prev => ({ ...prev, loading: true }))
                            PromtToSetAsDefault((setNicknameresponse) => {
                                if (setNicknameresponse) {
                                    let tempUser = { ...store.getState().root.user };
                                    tempUser.nickName = item?.nickName
                                    tempUser.nickNameColor = state.selectedColor
                                    store.dispatch(setUser(tempUser));
                                    storeData('user', tempUser)
                                }
                                setState(prev => ({ ...prev, loading: false }))
                            }, ASSET_TYPES.NICKNAME, item?._id, state.selectedColor)
                        }}>
                            <View style={{ width: CARD_WIDTH, margin: PADDING, borderColor: AppTheme.colors.lightGrey, borderWidth: 0.5, borderRadius: RFValue(10), overflow: 'hidden' }}>
                                <View style={{ flex: 1, justifyContent: 'center', paddingVertical: RFValue(20), alignItems: 'center' }}>
                                    <AppText size={3} color={state.selectedColor}>{item?.nickName || ''}</AppText>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }} />

            <AppModal show={state.isModalVisible} toggle={() => setState(prev => ({ ...prev, isModalVisible: null }))} >
                {state.isModalVisible ?
                    <View style={{ padding: RFValue(30) }}>
                        <AntDesign name="close" onPress={() => setState(prev => ({ ...prev, isModalVisible: null }))} style={{ fontSize: RFValue(30), color: 'white', padding: RFValue(10) }} />
                        <View style={{ backgroundColor: 'black', borderRadius: RFValue(10), overflow: 'hidden', padding: RFValue(30) }}>
                            {/* <FastImage source={state.isModalVisible.image} style={{ width: Dimensions.get('screen').width - RFValue(20), height: '80%' }} /> */}

                            <View style={{ justifyContent: 'center', paddingVertical: RFValue(30), alignItems: 'center' }}>
                                <AppText size={2} color={AppTheme.colors.lightGrey}>Username</AppText>
                                <AppText color={state.selectedColor}>Nickname</AppText>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderTopWidth: 1, borderTopColor: 'grey', padding: RFValue(15) }}>
                                <AppText size={2}>Nickname</AppText>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: RFValue(10) }}>
                                    <AppGoldCoin />
                                    <AppText size={2}>  x  {state.isModalVisible.coins}</AppText>
                                </View>
                                <AppButtonPlane onPress={() => {
                                    if (!state.isModalVisible.isPurchased)
                                        setState(prev => ({ ...prev, isModalVisible: null }));
                                    else {
                                        AppShowToast("You already own this item")
                                    }
                                }} label={"BUY"} />
                            </View>
                        </View>
                    </View>
                    : null}
            </AppModal>
        </View>
    )
}

export { CustomizeNicknameTab };
