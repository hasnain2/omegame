const TESTING_DOMAIN = "http://ec2-3-17-16-35.us-east-2.compute.amazonaws.com/api/";
const PRODUCTION_DOMAIN = "http://ec2-3-17-16-35.us-east-2.compute.amazonaws.com/api/";
const DOMAIN = __DEV__ ? TESTING_DOMAIN : PRODUCTION_DOMAIN;

const EndPoints = {
    LOGIN: DOMAIN + 'authentication/login',
    SIGNUP: DOMAIN + 'authentication/signup/PLAYER',
    FORGOT_PASSWORD: DOMAIN + 'authentication/forgotPassword',
    RESET_PASSWORD: DOMAIN + 'authentication/resetPassword',
    CHANGE_PASSWORD: DOMAIN + 'authentication/password', //change/update password
    VERIFY_EMAIL: DOMAIN + 'authentication/verifyEmail',
    PROFILE_UPDATE_CREATE: DOMAIN + 'profile',
    UPLOAD_MEDIA: DOMAIN + 'media/bucket/',
    REQUEST_VERIFICATION: DOMAIN + 'profile/verification/docs',
    FOLLOWERS_AND_FOLLOWING: DOMAIN + 'profile/friendStatus', // ---- "accountIds": [  "string"  ] , "status": "string"
    GET_SINGLE_USER_PROFILE: DOMAIN + 'profile/id/',
    HOME_FEED: DOMAIN + 'posts/homeFeed', //-------
    CREATE_POST: DOMAIN + 'posts',

    ACTIONS_ON_FRIENDS: DOMAIN + 'profile/friendStatus', //FOLLOW / UNFOLLOW / BLOCK ETC
    GET_USER_LIST_BY_TYPE: DOMAIN + 'profile/friendStatus/', // TYPE FOLLOWER/FOLLOWING/BLOCKED
    GET_OR_DELETE_POST: DOMAIN + 'posts/id/', // METHODS -> DELETE/GET

    LIKE_POST: DOMAIN + 'posts/action/react/', // react on POST --> LIKE
    SHARE_POST: DOMAIN + 'posts/action/share/', // ACTIONS on POST --> SHARE
    FOLLOW_POST: DOMAIN + 'posts/action/follow/', // ACTIONS on POST --> FOLLOW
    BOOKMARK_POST: DOMAIN + 'posts/action/bookmark/', // ACTIONS on POST --> BOOKMARK OR SAVE POST
    GET_BOOKMARKED_OR_SAVED_POST: DOMAIN + 'posts/savedPosts', // get SAVED POST
    GET_POSTS_OF_SPECIFIC_USER: DOMAIN + 'posts/user?', // get all posts of specific user
    COMMENT_POST: DOMAIN + 'comments?', // POSTING COMMENT // OR GETTING COMMENTS

    COMMENT_REACTIONS: DOMAIN + 'comments/action/react/', // get comments of specific post
    GET_COMMENT_REPLIES: DOMAIN + 'comments/replies?', // gett comment replies
};

export { DOMAIN, EndPoints };
