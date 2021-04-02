import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import user from './reducers/userSlice';
import homeFeed from './reducers/homeFeedSlice';
import savedPosts from './reducers/savedPostsSlice';
import gameReviews from './reducers/gameReviewsSlice';
import friends from './reducers/friendsSlice';
import inbox from './reducers/inboxSlice';
import myAssets from './reducers/myAssetsSlice';
import settings from './reducers/settingsSlice';
import notifications from './reducers/notificationsSlice';
import postData from './reducers/postDataSlice';
import userProfileData from './reducers/userProfileDataSlice';
import query from './reducers/querySlice';
import nav from './reducers/navSlice';
import quests from './reducers/questsSlice';

const rootReducer = combineReducers({
  user: user,
  homeFeed: homeFeed,
  savedPosts: savedPosts,
  gameReviews: gameReviews,
  friends: friends,
  inbox: inbox,
  myAssets: myAssets,
  settings: settings,
  notifications: notifications,
  postData: postData,
  userProfileData: userProfileData,
  query: query,
  quests: quests,
  nav: nav,
});

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});
