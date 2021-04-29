import * as React from 'react';
import { Alert, Dimensions, FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { DEFAULT_USER_PIC } from '../../../assets/images';
import { AppButtonPlane, AppGoldCoin, AppModal, AppText } from "../../components";
import { UserAvatar } from '../../components/UserAvatar';
import { AppTheme } from '../../config';
import { AddAssetCorner } from '../../services';
import { BuyAsset, GetAllAssets } from '../../services/customizationService';
import { ASSET_TYPES } from '../../utils/AppConstants';
import { AppLogger, AppShowToast } from '../../utils/AppHelperMethods';
import { AntDesign } from '../../utils/AppIcons';
const NUMBER_OF_COLUMNS = 2;
const OmegaStoreCornersTab = ({ navigation }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a',
        data: []
    })
    const PADDING = RFValue(3);
    const CARD_WIDTH = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - (PADDING * RFValue(NUMBER_OF_COLUMNS));
    const COLORS = ['#666666', '#ff1a4a', '#ffd949', '#00ff88', '#02eeff', '#0049ff', '#ff03f7']
    const BUBBLE_SIZE = RFValue(25);
    let { user } = useSelector(state => state.root);
    AppLogger('-------', user._id)
    function getallassetshelper() {
        GetAllAssets((allAssetsRes) => {
            if (allAssetsRes) {
                setState(prev => ({ ...prev, data: allAssetsRes }))
            }
        }, ASSET_TYPES.CORNER)
    }
    React.useEffect(() => {
        getallassetshelper();
    }, [])

    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <View style={{ flexDirection: 'row', padding: RFValue(10) }}>
                {/* <FontAwesome name="paint-brush" style={{ fontSize: RFValue(20), margin: RFValue(10), color: '#02eeff' }} /> */}
                <ScrollView horizontal={true}>
                    {COLORS.map((itm, indx) => (
                        <TouchableOpacity key={`${indx}key`} activeOpacity={0.7} onPress={() => setState(prev => ({ ...prev, selectedColor: itm }))}>
                            <View style={{ height: BUBBLE_SIZE, width: BUBBLE_SIZE, margin: RFValue(10), backgroundColor: itm, borderRadius: 90, }} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <FlatList
                data={state.data}
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
                            setState(prev => ({ ...prev, isModalVisible: item }))
                            AppLogger('', item)
                        }}>
                            <View style={{ width: CARD_WIDTH, margin: PADDING, borderColor: AppTheme.colors.lightGrey, borderWidth: 0.5, borderRadius: RFValue(10), overflow: 'hidden' }}>
                                {/* <FastImage source={item.image} style={{ width: CARD_WIDTH, height: CARD_HEIGHT }} /> */}

                                <View style={{ flex: 1, justifyContent: 'center', paddingVertical: RFValue(30), alignItems: 'center' }}>
                                    <UserAvatar flag={true} color={state.selectedColor} corner={item?.attachment?.url || false} source={user?.pic ? { uri: user?.pic } : DEFAULT_USER_PIC} size={110} />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: AppTheme.colors.lightGrey, padding: RFValue(15) }}>
                                    <AppText size={2}>{item.name}</AppText>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: RFValue(5) }}>
                                        <AppGoldCoin />
                                        <AppText size={2}>  x  {item.priceInCoins}</AppText>
                                    </View>

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
                                <UserAvatar source={{ uri: state.isModalVisible?.attachment?.url }} color={state.selectedColor} size={110} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderTopWidth: 1, borderTopColor: 'grey', padding: RFValue(15) }}>
                                <AppText size={2}>{state.isModalVisible.name}</AppText>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: RFValue(10) }}>
                                    <AppGoldCoin />
                                    <AppText size={2}>  x  {state.isModalVisible.priceInCoins}</AppText>
                                </View>
                                <AppButtonPlane onPress={() => {
                                    if (!state.isModalVisible.isPurchased) {
                                        Alert.alert("Buy", `Purchase ${state.isModalVisible?.name} for ${state.isModalVisible?.priceInCoins}?`, [{
                                            text: "Cancel",
                                            onPress: () => {
                                                setState(prev => ({ ...prev, isModalVisible: null }));
                                                AppLogger('', "Cancel Pressed")
                                            },
                                            style: "cancel"
                                        }, {
                                            text: "OK", onPress: () => {
                                                setState(prev => ({ ...prev, isModalVisible: null, loading: true }))
                                                BuyAsset((buyAssetRes) => {
                                                    if (buyAssetRes) {
                                                        AddAssetCorner(state.isModalVisible)
                                                        setState(prev => ({ ...prev, loading: false }))
                                                    } else {
                                                        AppShowToast("You dont have enough coins")
                                                    }
                                                }, state.isModalVisible?._id)
                                            }
                                        }], { cancelable: false });
                                    } else {
                                        AppShowToast("You already own this corner");
                                    }
                                }} label={state.isModalVisible.isPurchased ? "PURCHASED" : "BUY"} />
                            </View>
                        </View>
                    </View>
                    : null}
            </AppModal>
        </View>
    )
}

export { OmegaStoreCornersTab };
