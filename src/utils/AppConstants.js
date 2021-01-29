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

const SOCIAL_LOGIN_TYPES = {
    FACEBOOK: 'FACEBOOK',
    INSTAGRAM: 'INSTAGRAM',
    TWITTER: 'TWITTER',
    GOOGLE: 'GOOGLE',
    APPLE: 'APPLE'
}

const QUEST_EVENTS = {
    QUEST_COMPLETED: 'questCompleted',
    QUEST_EXPIRED: 'questExpired'
}

const REPORT_TYPE = [{
    name: "Harassment",
    key: "HARASSMENT"
}, {
    name: "Someone is posting spam",
    key: "POSTING_SPAM"
}, {
    name: "Hate against a protected category (race, religion, national origin, disability)",
    key: "HATE"
}, {
    name: "Homophobia",
    key: "HOMOPHOBIA"
}, {
    name: "Exposed private information",
    key: "PRIVATE"
}]

const FRIEND_STATUSES_ACTIONS = { // action on friends weather to 
    BLOCKED: 'BLOCKED',
    UNBLOCKED: 'UN_BLOCKED',
    MUTE: 'MUTE',
    UNMUTE: 'UN_MUTE',
    FRIEND: 'FRIEND',
    UNFRIEND: 'UN_FRIEND',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UN_FOLLOW',
    ACCEPT: 'ACCEPT',
    DENY_FOLLOW_REQUEST: 'DENY_FOLLOW_REQUEST',
    ACCEPT_FOLLOW_REQUEST: 'ACCEPT_FOLLOW_REQUEST',
    REMOVE_FOLLOWER: 'REMOVE_FROM_FOLLOWER',
    CANCEL_FOLLOW_REQUEST: 'CANCEL_FOLLOW_REQUEST'
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

const POST_PRIVACY = [{
    name: "Public",
    key: "PUBLIC"
}, {
    name: "Only Friends",
    key: "FRIENDS"
}, {
    name: "Only me",
    key: "ONLY_ME"
},]

const SLIDER_COLORS = [
    { r: 255 - 0 * 1, g: 26 - 0 * 1, b: 76 - 0 * 1 },
    // { r: 255 - 12 * 1, g: 26 + 11.45 * 1, b: 76 - 1.85 * 1 },
    { r: 255 - 12 * 2, g: 26 + 11.45 * 2, b: 76 - 1.85 * 2 },
    // { r: 255 - 12 * 3, g: 26 + 11.45 * 3, b: 76 - 1.85 * 3 },
    { r: 255 - 12 * 4, g: 26 + 11.45 * 4, b: 76 - 1.85 * 4 },
    // { r: 255 - 12 * 5, g: 26 + 11.45 * 5, b: 76 - 1.85 * 5 },
    { r: 255 - 12 * 6, g: 26 + 11.45 * 6, b: 76 - 1.85 * 6 },
    // { r: 255 - 12 * 7, g: 26 + 11.45 * 7, b: 76 - 1.85 * 7 },
    { r: 255 - 12 * 8, g: 26 + 11.45 * 8, b: 76 - 1.85 * 8 },
    // { r: 255 - 12 * 9, g: 26 + 11.45 * 9, b: 76 - 1.85 * 9 },
    { r: 255 - 12 * 10, g: 26 + 11.45 * 10, b: 76 - 1.85 * 10 },
    // { r: 255 - 12 * 11, g: 26 + 11.45 * 11, b: 76 - 1.85 * 11 },
    { r: 255 - 12 * 12, g: 26 + 11.45 * 12, b: 76 - 1.85 * 12 },
    // { r: 255 - 12 * 13, g: 26 + 11.45 * 13, b: 76 - 1.85 * 13 },
    { r: 255 - 12 * 14, g: 26 + 11.45 * 14, b: 76 - 1.85 * 14 },
    // { r: 255 - 12 * 15, g: 26 + 11.45 * 15, b: 76 - 1.85 * 15 },
    { r: 255 - 12 * 16, g: 26 + 11.45 * 16, b: 76 - 1.85 * 16 },
    // { r: 255 - 12 * 17, g: 26 + 11.45 * 17, b: 76 - 1.85 * 17 },
    { r: 255 - 12 * 18, g: 26 + 11.45 * 18, b: 76 - 1.85 * 18 },
    // { r: 255 - 12 * 19, g: 26 + 11.45 * 19, b: 76 - 1.85 * 19 },
]
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

const SecurityCodeTypeEnum = {
    verification: 'verification',
    forgot: 'forgot',
    otp: 'otp'
}
export {
    SecurityCodeTypeEnum,
    BUCKETS,
    QUEST_EVENTS,
    REPORT_TYPE,
    SOCIAL_LOGIN_TYPES,
    POST_PRIVACY, COLORS,
    NOTIFICATION_TYPES,
    GENDERS_OF_USERS,
    COLOR_BUBBLE_SIZE,
    GET_ALL_USER_SORT_BY,
    DEEP_LINK_TYPES,
    ASSET_TYPES,
    PRIVACY,
    CHAT_SOCKET_EVENTS,
    FRIEND_STATUSES_ACTIONS,
    SHARE_STATUS_TYPES,
    GET_FRIEND_LIST_TYPES,
    SLIDER_COLORS
}
