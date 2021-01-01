import * as React from 'react';
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { AppPostsListings } from "../../../components";
import { setUserProfileData } from '../../../redux/reducers/userProfileDataSlice';
import { GetPostsOfSpecificUser } from '../../../services';
const UserProfilePosts = ({ navigation, autoPlay, scrollPosition, userID }) => {
    let { userProfileData } = useSelector(state => state.root)
    let dispatch = useDispatch();

    React.useEffect(() => {
        GetPostsOfSpecificUser((userPosts) => {
            if (userPosts)
                dispatch(setUserProfileData({ posts: userPosts }))
        }, userID)
    }, [])

    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <AppPostsListings navigation={navigation} style={{ backgroundColor: 'black' }}
                autoPlay={autoPlay}
                data={userProfileData.posts}
                 />
        </View>
    )
}

export { UserProfilePosts };
