import { createSlice } from '@reduxjs/toolkit';

const initState = []

export const inboxSlice = createSlice({
    name: 'inbox',
    initialState: initState,
    reducers: {
        setInbox: (state, action) => action.payload,
        resetInbox: () => initState,
    },
});

export const {
    setInbox,
    resetInbox
} = inboxSlice.actions;

export default inboxSlice.reducer;