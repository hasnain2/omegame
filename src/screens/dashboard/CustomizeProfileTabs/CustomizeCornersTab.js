import * as React from 'react';
import { Dimensions, FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { AppButtonPlane, AppGoldCoin, AppModal, AppText } from "../../../components";
import { UserAvatar } from '../../../components/UserAvatar';
import { MOCK_CORNERS } from '../../../mockups/Mockups';
import { AntDesign, FontAwesome } from '../../../utils/AppIcons';
const NUMBER_OF_COLUMNS = 4;
const CustomizeCornersTab = ({ navigation }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a'
    })
    const PADDING = RFValue(3);
    const CARD_WIDTH = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - (PADDING * RFValue(2));
    const COLORS = ['#666666', '#ff1a4a', '#ffd949', '#00ff88', '#02eeff', '#0049ff', '#ff03f7']
    const BUBBLE_SIZE = RFValue(25);
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <View style={{ flexDirection: 'row', padding: RFValue(10) }}>
                <FontAwesome name="paint-brush" style={{ fontSize: RFValue(20), margin: RFValue(10), color: '#02eeff' }} />
                <ScrollView horizontal={true}>
                    {COLORS.map((itm) => (
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setState(prev => ({ ...prev, selectedColor: itm }))}>
                            <View style={{ height: BUBBLE_SIZE, width: BUBBLE_SIZE, margin: RFValue(10), backgroundColor: itm, borderRadius: 90, }} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={{ padding: RFValue(10) }}>
                <FlatList
                    data={MOCK_CORNERS}
                    numColumns={NUMBER_OF_COLUMNS}

                    initialNumToRender={2}
                    windowSize={2}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={2}
                    bounces={false}
                    keyExtractor={ii => ii.id + 'you'}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} style={{ padding: RFValue(5) }} onPress={() => {

                            }}>
                                <UserAvatar size={CARD_WIDTH / 1.35} />
                            </TouchableOpacity>
                        )
                    }} />
            </View>
            <AppModal show={state.isModalVisible} toggle={() => setState(prev => ({ isModalVisible: null }))} >
                {state.isModalVisible ?
                    <View style={{ padding: RFValue(30) }}>
                        <AntDesign name="close" onPress={() => setState(prev => ({ isModalVisible: null }))} style={{ fontSize: RFValue(30), color: 'white', padding: RFValue(10) }} />
                        <View style={{ backgroundColor: 'black', borderRadius: RFValue(10), overflow: 'hidden', padding: RFValue(30) }}>
                            {/* <FastImage source={state.isModalVisible.image} style={{ width: Dimensions.get('screen').width - RFValue(20), height: '80%' }} /> */}
                            <View style={{ justifyContent: 'center', paddingVertical: RFValue(30), alignItems: 'center' }}>
                                <UserAvatar size={110} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderTopWidth: 1, borderTopColor: 'grey', padding: RFValue(15) }}>
                                <AppText size={2}>{state.isModalVisible.name}</AppText>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: RFValue(10) }}>
                                    <AppGoldCoin />
                                    <AppText size={2}>  x  {state.isModalVisible.coins}</AppText>
                                </View>
                                <AppButtonPlane onPress={() => { setState(prev => ({ isModalVisible: null })) }} label={"BUY"} />
                            </View>
                        </View>
                    </View>
                    : null}
            </AppModal>
        </View>
    )
}

export { CustomizeCornersTab };
