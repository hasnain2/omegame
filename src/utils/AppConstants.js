const BUCKETS = {
    PROFILE: 'PROFILE',
    CORNER: 'CORNER',
    BACKGROUND: 'BACKGROUND',
    PROFILE_DOC: 'PROFILE_DOC',
    MEDIA_PUBLIC: 'MEDIA_PUBLIC',
    MEDIA_PRIVATE: 'MEDIA_PRIVATE'
}

const PRIVACY = [
    {
        "Only me": 'ONLY_ME',
        name: 'Only me',
        key: 'ONLY_ME'
    },
    {
        'Only Friends': 'FRIENDS',
        name: 'Only Friends',
        key: 'FRIENDS'
    },
    {
        'Public': 'PUBLIC',
        name: 'Public',
        key: 'PUBLIC'
    }
]

const CHAT_SOCKET_EVENTS = {
    NEW_MESSAGE: 'newMessage',
    ON_MESSAGE_SCREEN: 'onMessageScreen',
    SEEN: 'seen',
    ERROR: 'error',
    MIRROR: 'mirror',
}

const FRIEND_STATUSES_ACTIONS = { // action on friends weather to 
    BLOCKED: 'BLOCKED',
    UNBLOCKED: 'UN_BLOCKED',
    FRIEND: 'FRIEND',
    UNFRIEND: 'UN_FRIEND',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UN_FOLLOW',
    ACCEPT_FRIEND_REQUEST: 'ACCEPT_FRIEND_REQUEST'
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

export { BUCKETS, PRIVACY, CHAT_SOCKET_EVENTS, FRIEND_STATUSES_ACTIONS, SHARE_STATUS_TYPES, GET_FRIEND_LIST_TYPES }