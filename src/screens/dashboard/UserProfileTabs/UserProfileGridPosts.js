import * as React from 'react';
import { View } from "react-native";
import { useSelector } from 'react-redux';
import { AppPostsListingsGrid } from "../../../components";
const UserProfileGridPosts = ({ navigation }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a'
    })
    let homeFeed = useSelector(state => state.root.homeFeed)
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <AppPostsListingsGrid navigation={navigation}
                data={homeFeed}
                style={{ backgroundColor: 'black' }} />
        </View>
    )
}

export { UserProfileGridPosts };
