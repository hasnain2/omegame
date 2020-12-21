import * as React from 'react';
import { Dimensions, FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { AppButtonPlane, AppGoldCoin, AppModal, AppText } from "../../../components";
import { UserAvatar } from '../../../components/UserAvatar';
import { AppTheme } from '../../../config';
import { MOCK_CORNERS } from '../../../mockups/Mockups';
import { GetMyAssets } from '../../../services/customizationService';
import { ASSET_TYPES } from '../../../utils/AppConstants';
import { AntDesign, FontAwesome, Ionicons } from '../../../utils/AppIcons';
const NUMBER_OF_COLUMNS = 4;
const CustomizeCornersTab = ({ navigation }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a',
        data: []
    })
    const PADDING = RFValue(3);
    const CARD_WIDTH = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - (PADDING * RFValue(2));
    const COLORS = ['#666666', '#ff1a4a', '#ffd949', '#00ff88', '#02eeff', '#0049ff', '#ff03f7']
    const BUBBLE_SIZE = RFValue(25);


    function getmyassetshelper() {
        GetMyAssets((cornersRes) => {
            if (cornersRes)
                setState(prev => ({ ...prev, data: cornersRes }))
        }, ASSET_TYPES.CORNER)
    }
    React.useEffect(() => {
        getmyassetshelper()
    }, [])

    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <View style={{ flexDirection: 'row', padding: RFValue(10) }}>
                {/* <FontAwesome name="paint-brush" style={{ fontSize: RFValue(20), margin: RFValue(10), color: '#02eeff' }} /> */}
                {/* <ScrollView horizontal={true}>
                    {COLORS.map((itm) => (
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setState(prev => ({ ...prev, selectedColor: itm }))}>
                            <View style={{ height: BUBBLE_SIZE, width: BUBBLE_SIZE, margin: RFValue(10), backgroundColor: itm, borderRadius: 90, }} />
                        </TouchableOpacity>
                    ))}
                </ScrollView> */}
            </View>
            <View style={{ padding: RFValue(10) }}>
                <FlatList
                    data={[...state.data, { addMore: true }]}
                    numColumns={NUMBER_OF_COLUMNS}
                    style={{ flex: 1, width: '100%', height: '100%' }}
                    initialNumToRender={2}
                    windowSize={2}
                    // removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    // bounces={false}
                    keyExtractor={ii => (ii._id || '') + 'you'}
                    renderItem={({ item, index }) => {
                        if (item.addMore)
                            return (
                                <TouchableOpacity activeOpacity={0.7} style={{ padding: RFValue(5) }} onPress={() => {
                                    navigation.navigate("OmegaStore")
                                }}>
                                    <View style={{ width: RFValue(CARD_WIDTH / 1.35), height: RFValue(CARD_WIDTH / 1.35), borderRadius: 100, borderWidth: 1, paddingLeft: RFValue(2.4), borderColor: AppTheme.colors.primary, justifyContent: 'center', alignItems: 'center' }}>
                                        <Ionicons name="add-circle-outline" style={{ fontSize: RFValue(30), color: 'white' }} />
                                    </View>
                                </TouchableOpacity>
                            )
                        else
                            return (
                                <TouchableOpacity activeOpacity={0.7} style={{ padding: RFValue(5) }} onPress={() => {

                                }}>
                                    <UserAvatar source={{ uri: item?.attachment?.url }} size={CARD_WIDTH / 1.35} />
                                </TouchableOpacity>
                            )
                    }} />
            </View>
            <AppModal show={state.isModalVisible} toggle={() => setState(prev => ({ ...prev, isModalVisible: null }))} >
                {state.isModalVisible ?
                    <View style={{ padding: RFValue(30) }}>
                        <AntDesign name="close" onPress={() => setState(prev => ({ ...prev, isModalVisible: null }))} style={{ fontSize: RFValue(30), color: 'white', padding: RFValue(10) }} />
                        <View style={{ backgroundColor: 'black', borderRadius: RFValue(10), overflow: 'hidden', padding: RFValue(30) }}>
                            {/* <FastImage source={state.isModalVisible.image} style={{ width: Dimensions.get('screen').width - RFValue(20), height: '80%' }} /> */}
                            <View style={{ justifyContent: 'center', paddingVertical: RFValue(30), alignItems: 'center' }}>
                                <UserAvatar source={{ uri: state.isModalVisible?.attachment?.url }} size={110} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderTopWidth: 1, borderTopColor: 'grey', padding: RFValue(15) }}>
                                <AppText size={2}>{state.isModalVisible.name}</AppText>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: RFValue(10) }}>
                                    <AppGoldCoin />
                                    <AppText size={2}>  x  {state.isModalVisible.coins}</AppText>
                                </View>
                                <AppButtonPlane onPress={() => { setState(prev => ({ ...prev, isModalVisible: null })) }} label={"BUY"} />
                            </View>
                        </View>
                    </View>
                    : null}
            </AppModal>
        </View>
    )
}

export { CustomizeCornersTab };
