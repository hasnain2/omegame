import { createSlice } from '@reduxjs/toolkit';

const initState = {
    posts: [],
    media: [],
    reviews: [],
    users: []
}

export const userProfileDataSlice = createSlice({
    name: 'userProfileData',
    initialState: initState,
    reducers: {
        setUserProfileData: (state, action) => ({ ...state, ...action.payload }),
        resetUserProfileData: () => initState,
    },
});

export const {
    setUserProfileData,
    resetUserProfileData
} = userProfileDataSlice.actions;

export default userProfileDataSlice.reducer;