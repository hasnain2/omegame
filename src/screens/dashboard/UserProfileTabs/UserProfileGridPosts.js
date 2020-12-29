import * as React from 'react';
import { View } from "react-native";
import { useSelector } from 'react-redux';
import { AppPostsListingsGrid } from "../../../components";
import { GetMediaOnlyPosts } from '../../../services';
const UserProfileGridPosts = ({ navigation, userID }) => {
    let [state, setState] = React.useState({
        loading: true,
        data: []
    });

    React.useEffect(() => {
        GetMediaOnlyPosts((userPosts) => {
            if (userPosts)
                setState(prev => ({ ...prev, loading: false, data: userPosts }))
        }, userID)
    }, [])
    let { homeFeed } = useSelector(state => state.root)
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <AppPostsListingsGrid navigation={navigation}
                data={state.data}
                style={{ backgroundColor: 'black' }} />
        </View>
    )
}

export { UserProfileGridPosts };
