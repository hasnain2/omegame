import * as React from 'react';
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { AppLoadingView, AppNoDataFound, AppPostsListings } from "../../../components";
import { setUserProfileData } from '../../../redux/reducers/userProfileDataSlice';
import { GetPostsOfSpecificUser } from '../../../services';
const UserProfilePosts = ({ navigation, autoPlay, scrollPosition, userID }) => {
    let { userProfileData } = useSelector(state => state.root)
    let dispatch = useDispatch();

    let [state, setState] = React.useState({
        loading: true,
    })

    React.useEffect(() => {
        GetPostsOfSpecificUser((userPosts) => {
            if (userPosts)
                dispatch(setUserProfileData({ posts: userPosts }))
            setState(prev => ({ ...prev, loading: false }))
        }, userID)
    }, [])

    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            {!state.loading && userProfileData?.posts.length < 1 ?
                <AppNoDataFound /> :
                <AppPostsListings navigation={navigation} style={{ backgroundColor: 'black' }}
                    autoPlay={autoPlay}
                    data={userProfileData.posts}
                />}
            {state.loading && userProfileData?.posts.length < 1 ?
                <AppLoadingView /> : null}
        </View>
    )
}

export { UserProfilePosts };
