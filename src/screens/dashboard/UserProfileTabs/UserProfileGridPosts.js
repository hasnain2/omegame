import * as React from 'react';
import { Dimensions, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { AppPostsListingsGrid } from "../../../components";
const UserProfileGridPosts = ({ navigation }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a'
    })
    const PADDING = RFValue(3);
    const CARD_WIDTH = Dimensions.get('screen').width / 2 - (PADDING * RFValue(2));
    const CARD_HEIGHT = CARD_WIDTH;
    const COLORS = ['#666666', '#ff1a4a', '#ffd949', '#00ff88', '#02eeff', '#0049ff', '#ff03f7']
    const BUBBLE_SIZE = RFValue(25);
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <AppPostsListingsGrid navigation={navigation} style={{ backgroundColor: 'black' }} />
        </View>
    )
}

export { UserProfileGridPosts };
