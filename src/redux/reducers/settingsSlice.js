import { createSlice } from '@reduxjs/toolkit';
import { AppTheme } from '../../config';

const initState = {
    bgColor: 'black',
    uploadStatus: false,
    notiCount:0,
    chatCount:0,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initState,
    reducers: {
        setSettings: (state, action) => {
            return { ...state, ...action.payload }
        },
        resetSettings: () => initState,
    },
});

export const {
    setSettings,
    resetSettings
} = settingsSlice.actions;

export default settingsSlice.reducer;