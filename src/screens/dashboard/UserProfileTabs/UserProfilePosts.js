import * as React from 'react';
import { View } from "react-native";
import { useSelector } from 'react-redux';
import { AppPostsListings } from "../../../components";
const UserProfilePosts = ({ navigation, autoPlay, scrollPosition }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a'
    })

    let homeFeed = useSelector(state=>state.root.homeFeed)
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <AppPostsListings navigation={navigation} style={{ backgroundColor: 'black' }}
                autoPlay={autoPlay}
                data={homeFeed}
                scrollPosition={(dta) => {
                    scrollPosition ? scrollPosition(dta) : null
                }} />
        </View>
    )
}

export { UserProfilePosts };
