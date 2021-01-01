import * as React from 'react';
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { AppPostsListingsGrid } from "../../../components";
import { setUserProfileData } from '../../../redux/reducers/userProfileDataSlice';
import { GetMediaOnlyPosts } from '../../../services';
const UserProfileGridPosts = ({ navigation, userID }) => {

    let { userProfileData } = useSelector(state => state.root)
    let dispatch = useDispatch();

    React.useEffect(() => {
        GetMediaOnlyPosts((userPosts) => {
            if (userPosts)
                dispatch(setUserProfileData({ media: userPosts }))
        }, userID)
    }, [])
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <AppPostsListingsGrid navigation={navigation}
                data={userProfileData.media}
                style={{ backgroundColor: 'black' }} />
        </View>
    )
}

export { UserProfileGridPosts };
