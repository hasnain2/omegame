import { createSlice } from '@reduxjs/toolkit';

const initState = {
    requests: [],
    otherNotifications: []
}

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: initState,
    reducers: {
        setNotifications: (state, action) => ({ ...state, ...action.payload }),
        resetNotifications: () => initState,
    },
});

export const {
    setNotifications,
    resetNotifications
} = notificationsSlice.actions;

export default notificationsSlice.reducer;