import * as React from 'react';
import { View } from "react-native";
import { useSelector } from 'react-redux';
import { AppPostsListings } from "../../../components";
import { GetPostsOfSpecificUser } from '../../../services';
const UserProfilePosts = ({ navigation, autoPlay, scrollPosition, userID }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a',
        data: []
    })

    React.useEffect(() => {
        GetPostsOfSpecificUser((userPosts) => {
            if (userPosts)
                setState(prev => ({ ...prev, data: userPosts }))
        }, userID)
    }, [])

    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <AppPostsListings navigation={navigation} style={{ backgroundColor: 'black' }}
                autoPlay={autoPlay}
                data={state.data}
                scrollPosition={(dta) => {
                    scrollPosition ? scrollPosition(dta) : null
                }} />
        </View>
    )
}

export { UserProfilePosts };
