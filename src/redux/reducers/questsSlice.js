import { createSlice } from '@reduxjs/toolkit';

const initState = []

export const questsSlice = createSlice({
    name: 'quests',
    initialState: initState,
    reducers: {
        setQuests: (state, action) => action.payload,
        resetQuests: () => initState,
    },
});

export const {
    setQuests,
    resetQuests
} = questsSlice.actions;

export default questsSlice.reducer;