import { setHomeFeed } from "../redux/reducers/homeFeedSlice";
import { setSavedPosts } from "../redux/reducers/savedPostsSlice";
import { store } from "../redux/store";

const UpdatePostIsSaveCheck = (postID) => {

}

const UpdatePostIsLikedCheck = (postID) => {

}

const UpdatePostFromReduxStore = (newPostObject) => {
    const tempHomeFeeds = store.getState().root.homeFeed;
    const tempSavedPosts = store.getState().root.savedPosts;

    let UpdatedHomePostsArray = []
    tempHomeFeeds.forEach((item, index) => {
        if (item._id === newPostObject._id) {
            UpdatedHomePostsArray.push(newPostObject);
        } else {
            UpdatedHomePostsArray.push(item)
        }
    })

    let UpdatedSavedPostsArray = []
    tempSavedPosts.forEach((item, index) => {
        if (item._id === newPostObject._id) {
            if (newPostObject.isSaved)
                UpdatedSavedPostsArray.push(newPostObject);
        } else {
            if (item.isSaved)
                UpdatedSavedPostsArray.push(item)
        }

    })
    store.dispatch(setHomeFeed(UpdatedHomePostsArray));
    store.dispatch(setSavedPosts(UpdatedSavedPostsArray));
}

const RemovePostFromReduxStore = (postID) => {
    const tempHomeFeeds = store.getState().root.homeFeed;
    const tempSavedPosts = store.getState().root.savedPosts;

    store.dispatch(setHomeFeed(tempHomeFeeds.filter(ii => ii._id != postID)));
    store.dispatch(setSavedPosts(tempSavedPosts.filter(ii => ii._id != postID)));
}

const RemovePostsOfUserFromReduxStore = (userID) => {
    const tempHomeFeeds = store.getState().root.homeFeed;
    const tempSavedPosts = store.getState().root.savedPosts;

    store.dispatch(setHomeFeed(tempHomeFeeds.filter(ii => ii.createdBy._id != userID)));
    store.dispatch(setSavedPosts(tempSavedPosts.filter(ii => ii.createdBy._id != userID)));
}


export { UpdatePostIsLikedCheck, UpdatePostIsSaveCheck, RemovePostFromReduxStore, UpdatePostFromReduxStore, RemovePostsOfUserFromReduxStore }