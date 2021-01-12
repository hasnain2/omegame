import { createSlice } from '@reduxjs/toolkit';

const initState = ''

export const querySlice = createSlice({
    name: 'query',
    initialState: initState,
    reducers: {
        setQuery: (state, action) => action.payload,
        resetQuery: () => initState,
    },
});

export const {
    setQuery,
    resetQuery
} = querySlice.actions;

export default querySlice.reducer;