import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import user from './reducers/userSlice';
import homeFeed from './reducers/homeFeedSlice';
import savedPosts from './reducers/savedPostsSlice';


const rootReducer = combineReducers({
    user: user,
    homeFeed: homeFeed,
    savedPosts: savedPosts,
});

export const store = configureStore({
    reducer: {
        root: rootReducer,
    },
});
