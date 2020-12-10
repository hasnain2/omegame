import { EndPoints } from '../utils/AppEndpoints';
import Interceptor from '../utils/Interceptor';
import { UploadMedia } from './mediaUploader';
import { BUCKETS, PRIVACY } from '../utils/AppConstants'
import { AppShowToast } from '../utils/AppHelperMethods';
import { Alert } from 'react-native';
import { store } from '../redux/store';
import { setHomeFeed } from '../redux/reducers/homeFeedSlice';
import { setSavedPosts } from '../redux/reducers/savedPostsSlice';
function creatPostHelper(callback, formData) {
    console.log('---------PAYLOAD RES---------->', formData)
    fetch(EndPoints.CREATE_POST, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(formData)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------CREATE POST RES----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------CREATE POST ERROR-----------', error)
        callback(false)
    });
}
const CreatePostService = (callback, formData) => {
    if (formData.file) {
        UploadMedia((results) => {
            if (results) {
                creatPostHelper((creatResults) => {
                    if (creatResults)
                        callback(true)
                    else
                        callback(false)
                }, { ...formData, attachments: [{ name: results?.name, type: results?.oType, url: results?.url, bucket: formData.privacy != 'Public' ? BUCKETS.MEDIA_PRIVATE : BUCKETS.MEDIA_PUBLIC }] })
                console.log('---------CREATE POST UPLOAD MEDIA RESPONSE---------->', results)
            } else {
                callback(false)
                AppShowToast("Failed to upload media")
            }
        }, formData.privacy != 'Public' ? BUCKETS.MEDIA_PRIVATE : BUCKETS.MEDIA_PUBLIC, formData.file)
    } else {
        creatPostHelper((creatResults) => {
            if (creatResults)
                callback(true)
            else
                callback(false)
        }, { ...formData })
    }
}

const GetHomeFeed = (callback) => {
    fetch(EndPoints.HOME_FEED, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------HOME FEED RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data.data.data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------HOME FEED ERROR-----------', error)
        callback(false)
    });
}
function deletefromreduxHelper(postID) {
    const tempHomeFeeds = store.getState().root.homeFeed;
    const tempSavedPosts = store.getState().root.savedPosts;


    store.dispatch(setHomeFeed(tempHomeFeeds.filter(ii => ii._id != postID)));
    store.dispatch(setSavedPosts(tempSavedPosts.filter(ii => ii._id != postID)));
}
const DeletePost = (callback, postID) => {
    Alert.alert(
        "Delete Post",
        "Are you sure to delete this post, this operation cannot be undone",
        [{
            text: "Cancel",
            onPress: () => {
                callback(false)
            }, style: "cancel"
        }, {
            text: "DELETE", onPress: () => {
                deletefromreduxHelper(postID)
                callback(true)
                fetch(EndPoints.GET_OR_DELETE_POST + postID, {
                    method: 'DELETE',
                    headers: Interceptor.getHeaders()
                }).then((response) => {
                    const statusCode = response.status;
                    const data = response.json();
                    return Promise.all([statusCode, data]);
                }).then(([status, data]) => {
                    console.log('-----------POST DELETE RESPONSE-----------', JSON.stringify(data))
                    if (status === 201 || status === 200) {
                        callback(true)
                    } else
                        callback(false);
                }).catch((error) => {
                    console.log('---------POST DELETE ERROR-----------', error)
                    callback(false)
                });
            }
        }
        ], { cancelable: true });
}


const GetSinglePost = (callback, postID) => {
    fetch(EndPoints.GET_OR_DELETE_POST + postID, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GETTING SINGLE POST BY ID RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GETTING SINGLE POST BY ID ERROR-----------', error)
        callback(false)
    });
}

const CommentPost = (callback, PAYLOAD) => {
    fetch(EndPoints.COMMENT_POST, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(PAYLOAD)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------COMMENTING ON POST BY ID RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------COMMENTING ON POST BY ID ERROR-----------', error)
        callback(false)
    });
}

const LikePost = (callback, postID, PAYLOAD) => {
    fetch(EndPoints.LIKE_POST + postID, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(PAYLOAD)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------LIKE POST RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------LIKE POST ERROR-----------', error)
        callback(false)
    });
}

const SharePost = (callback, postID, payload) => {
    fetch(EndPoints.SHARE_POST + postID, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(payload)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------SHARE POST RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------SHARE POST ERROR-----------', error)
        callback(false)
    });
}

const FollowPost = (callback, postID, payload) => {
    fetch(EndPoints.FOLLOW_POST + postID, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify({

        })
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------FOLLOW POST RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------FOLLOW POST ERROR-----------', error)
        callback(false)
    });
}


const SaveOrBookMarkPost = (callback, postID) => {
    fetch(EndPoints.BOOKMARK_POST + postID, {
        method: 'POST',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------SAVE OR BOOKMARK POST RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------SAVE OR BOOKMARK POST ERROR-----------', error)
        callback(false)
    });
}

const GetBookmarkPosts = (callback) => {
    fetch(EndPoints.GET_BOOKMARKED_OR_SAVED_POST, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('----------- GET SAVE OR BOOKMARK POSTS RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data.data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('--------- GET SAVE OR BOOKMARK POSTS ERROR-----------', error)
        callback(false)
    });
}

export { CreatePostService, GetHomeFeed, CommentPost, DeletePost, GetSinglePost, LikePost, SharePost, FollowPost, SaveOrBookMarkPost, GetBookmarkPosts };
