const TESTING_DOMAIN = "http://ec2-18-219-104-108.us-east-2.compute.amazonaws.com";
const PRODUCTION_DOMAIN = "http://ec2-18-219-104-108.us-east-2.compute.amazonaws.com";
const DOMAIN = __DEV__ ? TESTING_DOMAIN : PRODUCTION_DOMAIN;
const BASE_URL = DOMAIN + '/api/';

const EndPoints = {
    LOGIN: BASE_URL + 'authentication/login',
    SIGNUP: BASE_URL + 'authentication/signup/PLAYER',
    FORGOT_PASSWORD: BASE_URL + 'authentication/forgotPassword',
    RESET_PASSWORD: BASE_URL + 'authentication/resetPassword',
    CHANGE_PASSWORD: BASE_URL + 'authentication/password', //change/update password
    VERIFY_EMAIL: BASE_URL + 'authentication/verifyEmail',
    PROFILE_UPDATE_CREATE: BASE_URL + 'profile',
    UPLOAD_MEDIA: BASE_URL + 'media/bucket/',
    REQUEST_VERIFICATION: BASE_URL + 'profile/verification/docs',
    FOLLOWERS_AND_FOLLOWING: BASE_URL + 'profile/friendStatus', // ---- "accountIds": [  "string"  ] , "status": "string"
    GET_SINGLE_USER_PROFILE: BASE_URL + 'profile/id/',
    HOME_FEED: BASE_URL + 'posts/homeFeed', //-------
    CREATE_POST: BASE_URL + 'posts',

    ACTIONS_ON_FRIENDS: BASE_URL + 'profile/friendStatus', //FOLLOW / UNFOLLOW / BLOCK ETC
    GET_USER_LIST_BY_TYPE: BASE_URL + 'profile/friendStatus/', // TYPE FOLLOWER/FOLLOWING/BLOCKED
    GET_OR_DELETE_POST: BASE_URL + 'posts/id/', // METHODS -> DELETE/GET

    LIKE_POST: BASE_URL + 'posts/action/react/', // react on POST --> LIKE
    SHARE_POST: BASE_URL + 'posts/action/share/', // ACTIONS on POST --> SHARE
    FOLLOW_POST: BASE_URL + 'posts/action/follow/', // ACTIONS on POST --> FOLLOW
    BOOKMARK_POST: BASE_URL + 'posts/action/bookmark/', // ACTIONS on POST --> BOOKMARK OR SAVE POST
    GET_BOOKMARKED_OR_SAVED_POST: BASE_URL + 'posts/savedPosts', // get SAVED POST
    GET_POSTS_OF_SPECIFIC_USER: BASE_URL + 'posts/user?', // get all posts of specific user
    COMMENT_POST: BASE_URL + 'comments?', // POSTING COMMENT // OR GETTING COMMENTS

    COMMENT_REACTIONS: BASE_URL + 'comments/action/react/', // get comments of specific post
    GET_COMMENT_REPLIES: BASE_URL + 'comments/replies?', // gett comment replies

    //-----GAMES AND REVIEWS------
    GET_GAMES_LIST: BASE_URL + 'games',
    GET_GAME_REVIEWS: BASE_URL + 'games/reviews?gameId=', // get specific game reviews by gameID
    POST_GAME_REVIEW: BASE_URL + 'games/action/review', // post review for a game

    GET_ASSETS_FOR_CUSTOMIZATION: BASE_URL + 'assets',

    //-----CHAT ---------

    GET_INBOX_LIST: BASE_URL + 'chat/inbox',
    GET_CHAT_MESSAGES: BASE_URL + 'chat/messages',
    DELETE_CHAT_MESSAGES: BASE_URL + 'chat/chat/',
};

export { DOMAIN, EndPoints };
