import { createSlice } from '@reduxjs/toolkit';

const initState = []

export const homeFeedSlice = createSlice({
    name: 'homeFeed',
    initialState: initState,
    reducers: {
        setHomeFeed: (state, action) => action.payload,
        resetHomeFeed: () => initState,
    },
});

export const {
    setHomeFeed,
    resetHomeFeed
} = homeFeedSlice.actions;

export default homeFeedSlice.reducer;