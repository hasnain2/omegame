import { RFValue } from "react-native-responsive-fontsize"

const BUCKETS = {
    PROFILE: 'PROFILE',
    CORNER: 'CORNER',
    BACKGROUND: 'BACKGROUND',
    PROFILE_DOC: 'PROFILE_DOC',
    MEDIA_PUBLIC: 'MEDIA_PUBLIC',
    MEDIA_PRIVATE: 'MEDIA_PRIVATE'
}

const PRIVACY = [{
    "Only me": 'ONLY_ME',
    name: 'Only me',
    key: 'ONLY_ME'
}, {
    'Only Friends': 'FRIENDS',
    name: 'Only Friends',
    key: 'FRIENDS'
}, {
    'Public': 'PUBLIC',
    name: 'Public',
    key: 'PUBLIC'
}]

const CHAT_SOCKET_EVENTS = {
    NEW_MESSAGE: 'newMessage',
    ON_MESSAGE_SCREEN: 'onMessageScreen',
    SEEN: 'seen',
    ERROR: 'error',
    MIRROR: 'mirror',
    CONNECTED_WITH: 'connectedWith'
}

const FRIEND_STATUSES_ACTIONS = { // action on friends weather to 
    BLOCKED: 'BLOCKED',
    UNBLOCKED: 'UN_BLOCKED',
    FRIEND: 'FRIEND',
    UNFRIEND: 'UN_FRIEND',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UN_FOLLOW',
    ACCEPT: 'ACCEPT',
    DENY_FOLLOW_REQUEST: 'DENY_FOLLOW_REQUEST',
    ACCEPT_FOLLOW_REQUEST: 'ACCEPT_FOLLOW_REQUEST',
    REMOVE_FOLLOWER: 'REMOVE_FROM_FOLLOWING',
}

const GET_ALL_USER_SORT_BY = {
    XP: 'earnedXps',
    coin: 'earnedCoins'
}

const GENDERS_OF_USERS = ['MALE', 'FEMALE', 'Rather not say']

const ASSET_TYPES = {
    BACKGROUND: "BACKGROUND",
    CORNER: "CORNER",
    COLOR: "COLOR",
    NICKNAME: "NICKNAME",
}

const SHARE_STATUS_TYPES = { // ----- providing share statuses types 
    FACEBOOK: 'FACEBOOK',
    TWITTER: 'TWITTER'
}

const GET_FRIEND_LIST_TYPES = { // -----  get frieds/following/followers/blocked user list
    FRIEND: 'FRIEND',
    FOLLOWING: 'FOLLOWING',
    FOLLOWERS: 'FOLLOWERS',
    BLOCKED: 'BLOCKED'
}

const NOTIFICATION_TYPES = {
    FOLLOW_REQUESTS: "FriendRequest",
    COMMENT: "Comment",
    POST: "Post",
    CHAT: "Chat",
}

const DEEP_LINK_TYPES = {
    POST_ID: 'postID',
    USER_ID: 'userID',
    GAME_ID: 'gameID',
    QUEST_ID: 'questID',
    CODE: 'code',
}


const COLORS = ['#666666', '#ff1a4a', '#ffd949', '#00ff88', '#02eeff', '#0049ff', '#ff03f7'];
const COLOR_BUBBLE_SIZE = RFValue(25);

export { BUCKETS, COLORS, NOTIFICATION_TYPES, GENDERS_OF_USERS, COLOR_BUBBLE_SIZE, GET_ALL_USER_SORT_BY, DEEP_LINK_TYPES, ASSET_TYPES, PRIVACY, CHAT_SOCKET_EVENTS, FRIEND_STATUSES_ACTIONS, SHARE_STATUS_TYPES, GET_FRIEND_LIST_TYPES }
