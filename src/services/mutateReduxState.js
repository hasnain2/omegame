import { setHomeFeed } from "../redux/reducers/homeFeedSlice";
import { setMyAssets } from "../redux/reducers/myAssetsSlice";
import { setSavedPosts } from "../redux/reducers/savedPostsSlice";
import { store } from "../redux/store";
import { AppLogger } from "../utils/AppHelperMethods";

const UpdatePostIsSaveCheck = (postID) => {

}

const UpdatePostIsLikedCheck = (postID) => {

}


const UpdatePostFromReduxStore = (newPostObject) => {
    AppLogger('', newPostObject)
    var tempHomeFeeds = [...store.getState().root.homeFeed];
    var tempSavedPosts = [...store.getState().root.savedPosts];

    let foundIndexHomeFeed = tempHomeFeeds.findIndex(ii => ii?._id === newPostObject?._id)
    let foundIndexSavedPosts = tempSavedPosts.findIndex(ii => ii?._id === newPostObject?._id)


    if (foundIndexHomeFeed > -1)
        tempHomeFeeds[foundIndexHomeFeed] = { ...newPostObject }

    if (foundIndexSavedPosts > -1)
        tempSavedPosts[foundIndexSavedPosts] = { ...newPostObject }


    store.dispatch(setHomeFeed(tempHomeFeeds));
    store.dispatch(setSavedPosts(tempSavedPosts));
}



const AddPostToReduxStore = (newPost) => {
    let tempHomeFeeds = [...store.getState().root.homeFeed];
    tempHomeFeeds = [newPost, ...tempHomeFeeds]

    store.dispatch(setHomeFeed(tempHomeFeeds));
}


const RemovePostFromReduxStore = (postID) => {
    const tempHomeFeeds = [...store.getState().root.homeFeed];
    const tempSavedPosts = [...store.getState().root.savedPosts];

    store.dispatch(setHomeFeed(tempHomeFeeds.filter(ii => ii._id != postID)));
    store.dispatch(setSavedPosts(tempSavedPosts.filter(ii => ii._id != postID)));
}

const RemovePostsOfUserFromReduxStore = (userID) => {
    const tempHomeFeeds = [...store.getState().root.homeFeed];
    const tempSavedPosts = [...store.getState().root.savedPosts];

    store.dispatch(setHomeFeed(tempHomeFeeds.filter(ii => ii.createdBy._id != userID)));
    store.dispatch(setSavedPosts(tempSavedPosts.filter(ii => ii.createdBy._id != userID)));
}



const AddAssetBackground = (newBackground) => {
    let tempBackgrounds = { ...store.getState().root.myAssets };
    tempBackgrounds.backgrounds = [newBackground, ...tempBackgrounds.backgrounds]

    store.dispatch(setMyAssets(tempBackgrounds));
}

const AddAssetCorner = (newCorner) => {
    let tempCorners = { ...store.getState().root.myAssets };
    tempCorners.corners = [newCorner, ...tempCorners.corners];

    store.dispatch(setMyAssets(tempCorners));
}


export { AddAssetBackground, AddAssetCorner, UpdatePostIsLikedCheck, AddPostToReduxStore, UpdatePostIsSaveCheck, RemovePostFromReduxStore, UpdatePostFromReduxStore, RemovePostsOfUserFromReduxStore }