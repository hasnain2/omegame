import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from './reducers/userSlice';
import homeFeed from './reducers/homeFeedSlice';
import savedPosts from './reducers/savedPostsSlice';
import gameReviews from './reducers/gameReviewsSlice';
import friends from './reducers/friendsSlice';
import inbox from './reducers/inboxSlice';


const rootReducer = combineReducers({
    user: user,
    homeFeed: homeFeed,
    savedPosts: savedPosts,
    gameReviews: gameReviews,
    friends: friends,
    inbox: inbox,
});

export const store = configureStore({
    reducer: {
        root: rootReducer,
    },
});
