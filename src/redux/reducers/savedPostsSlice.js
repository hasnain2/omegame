import { createSlice } from '@reduxjs/toolkit';

const initState = []

export const savedPostsSlice = createSlice({
    name: 'savedPosts',
    initialState: initState,
    reducers: {
        setSavedPosts: (state, action) => action.payload,
        resetSavedPosts: () => initState
    },
});

export const {
    setSavedPosts,
    resetSavedPosts
} = savedPostsSlice.actions;

export default savedPostsSlice.reducer;