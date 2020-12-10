import * as React from 'react';
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppButtonPlane, AppGoldCoin, AppModal, AppText } from '../../../components';
import { AppTheme } from '../../../config/index';
import { MOCK_BACKGROUNDS } from '../../../mockups/Mockups';
import { AntDesign, Ionicons } from '../../../utils/AppIcons';
const NUMBER_OF_COLUMNS = 4;
const CustomizeBackgroundTab = ({ navigation }) => {
    let [state, setState] = React.useState({
        isModalVisible: null
    })
    const PADDING = RFValue(3);
    const CARD_WIDTH = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - (PADDING * RFValue(2));
    const CARD_HEIGHT = CARD_WIDTH + RFValue(50);
    return (
        <View style={{ backgroundColor: 'black', flex: 1, }}>
            <FlatList
                data={[...MOCK_BACKGROUNDS, { addMore: true }]}
                numColumns={NUMBER_OF_COLUMNS}

                initialNumToRender={2}
                windowSize={2}
                removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                bounces={false}
                keyExtractor={ii => ii.id + 'you'}
                renderItem={({ item, index }) => {
                    if (item.addMore)
                        return (
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {

                            }}>
                                <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT, margin: PADDING, borderColor: AppTheme.colors.lightGrey, borderWidth: 1, borderRadius: RFValue(10), overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="add-circle-outline" style={{ fontSize: RFValue(30), color: 'white' }} />
                                </View>
                            </TouchableOpacity>
                        )
                    else
                        return (
                            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                            }}>
                                <View style={{ width: CARD_WIDTH, margin: PADDING, borderColor: AppTheme.colors.lightGrey, borderWidth: 1, borderRadius: RFValue(10), overflow: 'hidden' }}>
                                    <FastImage source={item.image} style={{ width: CARD_WIDTH, height: CARD_HEIGHT }} />

                                </View>
                            </TouchableOpacity>
                        )
                }} />

            <AppModal show={state.isModalVisible} toggle={() => setState(prev => ({ isModalVisible: null }))} >
                {state.isModalVisible ?
                    <View style={{ flex: 1, padding: RFValue(30) }}>
                        <AntDesign name="close" onPress={() => setState(prev => ({ isModalVisible: null }))} style={{ fontSize: RFValue(30), color: 'white', padding: RFValue(10) }} />
                        <View style={{ width: Dimensions.get('screen').width - RFValue(20), flex: 1, margin: PADDING, borderRadius: RFValue(10), overflow: 'hidden' }}>
                            <FastImage source={state.isModalVisible.image} style={{ width: Dimensions.get('screen').width - RFValue(20), height: '80%' }} />
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'black', borderTopWidth: 1, borderTopColor: 'grey', padding: RFValue(15) }}>
                                <AppText size={2}>{state.isModalVisible.name}</AppText>

                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: RFValue(5) }}>
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

export { CustomizeBackgroundTab };
