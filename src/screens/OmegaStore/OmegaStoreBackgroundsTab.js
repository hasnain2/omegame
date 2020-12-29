import * as React from 'react';
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppButtonPlane, AppGoldCoin, AppModal, AppText } from '../../components';
import { AppTheme } from '../../config/index';
import { AddAssetBackground } from '../../services';
import { BuyAsset, GetAllAssets } from '../../services/customizationService';
import { ASSET_TYPES } from '../../utils/AppConstants';
import { AppShowToast } from '../../utils/AppHelperMethods';
import { AntDesign } from '../../utils/AppIcons';
const NUMBER_OF_COLUMNS = 2;
const OmegaStoreBackgroundsTab = ({ navigation }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        data: []
    });
    let { myAssets } = useSelector(state => state.root)
    const PADDING = RFValue(3);
    const CARD_WIDTH = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - (PADDING * RFValue(NUMBER_OF_COLUMNS));
    const CARD_HEIGHT = CARD_WIDTH + RFValue(50);

    function getallassetshelper() {
        GetAllAssets((allAssetsRes) => {
            if (allAssetsRes) {
                setState(prev => ({ ...prev, data: allAssetsRes }))
            }
        }, ASSET_TYPES.BACKGROUND)
    }

    React.useEffect(() => {
        getallassetshelper();
    }, [])

    const isPurchased = state?.isModalVisible?.isPurchased || !!myAssets?.backgrounds?.find(ii => ii?._id === state?.isModalVisible?._id)
    return (
        <View style={{ backgroundColor: 'black', flex: 1, }}>
            <FlatList
                data={state.data}
                numColumns={NUMBER_OF_COLUMNS}

                initialNumToRender={2}
                windowSize={2}
                // removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                // bounces={false}
                keyExtractor={ii => (ii._id || '') + 'you'}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            setState(prev => ({ ...prev, isModalVisible: item }))
                        }}>
                            <View style={{ width: CARD_WIDTH, margin: PADDING, borderColor: AppTheme.colors.lightGrey, borderWidth: 1, borderRadius: RFValue(10), overflow: 'hidden' }}>
                                <FastImage source={{ uri: item?.attachment?.url }} style={{ width: CARD_WIDTH, height: CARD_HEIGHT }} />
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
                    <View style={{ flex: 1, padding: RFValue(30) }}>
                        <AntDesign name="close" onPress={() => setState(prev => ({ ...prev, isModalVisible: null }))} style={{ fontSize: RFValue(30), color: 'white', padding: RFValue(10) }} />
                        <View style={{ width: Dimensions.get('screen').width - RFValue(20), flex: 1, margin: PADDING, borderRadius: RFValue(10), overflow: 'hidden' }}>
                            <FastImage source={{ uri: state.isModalVisible?.attachment?.url }} style={{ width: Dimensions.get('screen').width - RFValue(20), height: '80%' }} />
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'black', borderTopWidth: 1, borderTopColor: 'grey', padding: RFValue(15) }}>
                                <AppText size={2}>{state.isModalVisible.name}</AppText>

                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: RFValue(5) }}>
                                    <AppGoldCoin />
                                    <AppText size={2}>  x  {state.isModalVisible.priceInCoins}</AppText>
                                </View>
                                <AppButtonPlane onPress={() => {

                                    if (!isPurchased) {
                                        setState(prev => ({ ...prev, isModalVisible: null, loading: true }));
                                        BuyAsset((buyAssetRes) => {
                                            setState(prev => ({ ...prev, loading: false }));
                                            if (buyAssetRes) {
                                                AddAssetBackground(state.isModalVisible)
                                            } else {
                                                AppShowToast("You dont have enough coins")
                                            }
                                        }, state.isModalVisible?._id)
                                    } else {
                                        AppShowToast("You already own this background");
                                    }
                                }} label={isPurchased ? "PURCHASED" : "BUY"} />
                            </View>
                        </View>
                    </View>
                    : null}
            </AppModal>
        </View>
    )
}

export { OmegaStoreBackgroundsTab };
