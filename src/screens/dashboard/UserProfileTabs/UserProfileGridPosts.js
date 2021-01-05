import * as React from 'react';
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { AppLoadingView, AppNoDataFound, AppPostsListingsGrid } from "../../../components";
import { setUserProfileData } from '../../../redux/reducers/userProfileDataSlice';
import { GetMediaOnlyPosts } from '../../../services';
const UserProfileGridPosts = ({ navigation, userID }) => {

    let { userProfileData } = useSelector(state => state.root)
    let dispatch = useDispatch();

    let [state, setState] = React.useState({
        loading: true,
    })
    React.useEffect(() => {
        GetMediaOnlyPosts((userPosts) => {
            if (userPosts)
                dispatch(setUserProfileData({ media: userPosts }))
            setState(prev => ({ ...prev, loading: false }))
        }, userID)
    }, [])
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            {!state.loading && userProfileData?.media.length < 1 ?
                <AppNoDataFound /> :
                <AppPostsListingsGrid navigation={navigation}
                    data={userProfileData.media}
                    style={{ backgroundColor: 'black' }} />}
            {state.loading && userProfileData?.media.length < 1 ?
                <AppLoadingView /> : null}

        </View>
    )
}

export { UserProfileGridPosts };
