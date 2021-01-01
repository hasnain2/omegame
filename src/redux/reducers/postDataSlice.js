import { createSlice } from '@reduxjs/toolkit';

const initState = {}

export const postDataSlice = createSlice({
    name: 'postData',
    initialState: initState,
    reducers: {
        setPostData: (state, action) => {
            return { ...action.payload }
        },
        resetPostData: () => initState,
    },
});

export const {
    setPostData,
    resetPostData
} = postDataSlice.actions;

export default postDataSlice.reducer;