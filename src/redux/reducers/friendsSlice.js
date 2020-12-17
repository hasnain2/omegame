import { createSlice } from '@reduxjs/toolkit';

const initState = []

export const friendsSlice = createSlice({
    name: 'friends',
    initialState: initState,
    reducers: {
        setFriends: (state, action) => action.payload,
        resetFriends: () => initState,
    },
});

export const {
    setFriends,
    resetFriends
} = friendsSlice.actions;

export default friendsSlice.reducer;