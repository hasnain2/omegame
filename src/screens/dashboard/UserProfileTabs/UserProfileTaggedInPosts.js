import * as React from 'react';
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { AppLoadingView, AppNoDataFound, AppPostsListings } from "../../../components";
import { setUserProfileData } from '../../../redux/reducers/userProfileDataSlice';
import { GetPostsOfSpecificUserWhereTaggedIn } from '../../../services';
const UserProfileTaggedInPosts = ({ navigation, autoPlay, userID }) => {
    let { userProfileData } = useSelector(state => state.root)
    let dispatch = useDispatch();

    let [state, setState] = React.useState({
        loading: true,
    })

    React.useEffect(() => {
        GetPostsOfSpecificUserWhereTaggedIn((userPosts) => {
            if (userPosts)
                dispatch(setUserProfileData({ taggedInPosts: userPosts }))
            setState(prev => ({ ...prev, loading: false }))
        }, `${userID}&taggedOnly=true&mediaOnly=true`)
    }, [])

    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            {!state.loading && userProfileData?.taggedInPosts.length < 1 ?
                <AppNoDataFound /> :
                <AppPostsListings navigation={navigation} style={{ backgroundColor: 'black' }}
                    autoPlay={autoPlay}
                    data={userProfileData.taggedInPosts}
                />}
            {state.loading && userProfileData?.taggedInPosts.length < 1 ?
                <AppLoadingView /> : null}
        </View>
    )
}

export { UserProfileTaggedInPosts };
