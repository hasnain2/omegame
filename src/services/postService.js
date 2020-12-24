import { Alert } from 'react-native';
import { BUCKETS } from '../utils/AppConstants';
import { EndPoints } from '../utils/AppEndpoints';
import { AppShowToast } from '../utils/AppHelperMethods';
import Interceptor from '../utils/Interceptor';
import { UploadMedia } from './mediaUploader';
import { RemovePostFromReduxStore, UpdatePostFromReduxStore } from './mutateReduxState';
const LIMIT = 5;
function creatPostHelper(callback, formData) {
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
                        callback(creatResults)
                    else
                        callback(false)
                }, {
                    ...formData,
                    attachments: [{
                        name: results?.name,
                        type: results?.oType,
                        url: results?.url,
                        bucket: formData.privacy != 'Public' ? BUCKETS.MEDIA_PRIVATE : BUCKETS.MEDIA_PUBLIC,
                        meta: results?.thumbnail?.thumbnail ? [{
                            type: results?.thumbnail?.oType || results?.thumbnail?.type,
                            url: results?.thumbnail?.url,
                            isThumbnail: results?.thumbnail?.thumbnail ? true : false
                        }] : null
                    }]
                })
                console.log('---------CREATE POST UPLOAD MEDIA RESPONSE---------->', results)
            } else {
                callback(false)
                AppShowToast("Failed to upload media")
            }
        }, formData.privacy != 'Public' ? BUCKETS.MEDIA_PRIVATE : BUCKETS.MEDIA_PUBLIC, formData.file)
    } else {
        creatPostHelper((creatResults) => {
            if (creatResults)
                callback(creatResults)
            else
                callback(false)
        }, { ...formData })
    }
}

const GetHomeFeed = (callback, cursor) => {
    // ${EndPoints.HOME_FEED}?cursor=${cursor}&limit=${LIMIT}
    fetch(`${EndPoints.HOME_FEED}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        // console.log('-----------HOME FEED RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------HOME FEED ERROR-----------', error)
        callback(false)
    });
}

const GetExplorePosts = (callback, cursor) => {
    fetch(`${EndPoints.HOME_FEED}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------EXPLORE POSTS RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------EXPLORE POSTS ERROR-----------', error)
        callback(false)
    });
}

const GetExploreMediaOnlyPosts = (callback, cursor) => {
    fetch(`${EndPoints.HOME_FEED}?mediaOnly=true`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------EXPLORE MEDIA ONLY POSTS RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------EXPLORE MEDIA ONLY POSTS ERROR-----------', error)
        callback(false)
    });
}

const GetPostsOfSpecificUser = (callback, userID) => {
    console.log(EndPoints.GET_POSTS_OF_SPECIFIC_USER + userID)
    fetch(EndPoints.GET_POSTS_OF_SPECIFIC_USER + 'userId=' + userID, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------SPECIFIC USER POSTS RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------SPECIFIC USER POSTS ERROR-----------', error)
        callback(false)
    });
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
                RemovePostFromReduxStore(postID)
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
        }], { cancelable: true });
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
        if ((status === 201 || status === 200) && data?.data) {
            UpdatePostFromReduxStore(data?.data)
            callback(data?.data || false)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GETTING SINGLE POST BY ID ERROR-----------', error)
        callback(false)
    });
}

const GetMediaOnlyPosts = (callback, userID) => {
    fetch(`${EndPoints.GET_ONLY_MEDIA_POSTS}${userID ? ("&userId=" + userID) : ''}`, {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------GET MEDIA ONLY POSTS RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data?.data?.data || [])
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GET MEDIA ONLY POSTS ERROR-----------', error)
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
            callback(data?.data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------COMMENTING ON POST BY ID ERROR-----------', error)
        callback(false)
    });
}

const CommentReaction = (callback, commentID, PAYLOAD) => {
    fetch(EndPoints.COMMENT_REACTIONS + commentID, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(PAYLOAD)
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        console.log('-----------REACTION ON COMMENT LIKE ETC RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------REACTION ON COMMENT LIKE ETC ERROR-----------', error)
        callback(false)
    });
}

const GetCommentsOfPost = (callback, CURSOR, LIMIT, postID) => {
    fetch(EndPoints.COMMENT_POST + (CURSOR ? ('cursor=' + CURSOR + '&') : '') + (LIMIT ? ('&limit=' + LIMIT + '&') : '') + ('postId=' + postID), {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        // console.log('-----------GETTING POST COMMENTS RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data.data.data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GETTING POST COMMENTS ERROR-----------', error)
        callback(false)
    });
}

const GetCommentsReplies = (callback, CURSOR, LIMIT, parentCommentID) => {
    fetch(EndPoints.GET_COMMENT_REPLIES + (CURSOR ? ('cursor=' + CURSOR + '&') : '') + (LIMIT ? ('&limit=' + LIMIT + '&') : '') + ('parentComment=' + parentCommentID), {
        method: 'GET',
        headers: Interceptor.getHeaders()
    }).then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    }).then(([status, data]) => {
        // console.log('-----------GETTING COMMENTS REPLIES RESPONSE-----------', JSON.stringify(data))
        if (status === 201 || status === 200) {
            callback(data.data.data)
        } else
            callback(false);
    }).catch((error) => {
        console.log('---------GETTING COMMENTS REPLIES ERROR-----------', error)
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
        body: JSON.stringify(payload)
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


const SaveOrBookMarkPost = (callback, postID, PAYLOAD) => { // bookmark: true 
    fetch(EndPoints.BOOKMARK_POST + postID, {
        method: 'POST',
        headers: Interceptor.getHeaders(),
        body: JSON.stringify(PAYLOAD)
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

export {
    GetCommentsOfPost,
    CommentReaction,
    GetCommentsReplies,
    GetPostsOfSpecificUser,
    CreatePostService,
    GetHomeFeed,
    CommentPost,
    DeletePost,
    GetSinglePost,
    LikePost,
    SharePost,
    FollowPost,
    SaveOrBookMarkPost,
    GetBookmarkPosts,
    GetMediaOnlyPosts,
    GetExploreMediaOnlyPosts,
    GetExplorePosts,
};