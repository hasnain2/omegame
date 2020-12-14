import * as React from 'react';
import { View } from "react-native";
import { AppPostsListingsGrid } from "../../../components";
const UserProfileExtras = ({ navigation, route }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a'
    })
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <AppPostsListingsGrid navigation={navigation} route={route} />
        </View>
    )
}

export { UserProfileExtras };
