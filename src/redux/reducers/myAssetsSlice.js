import { createSlice } from '@reduxjs/toolkit';

const initState = {
    backgrounds: [],
    corners: [],
    nickname: []
}

export const myAssetsSlice = createSlice({
    name: 'myAssets',
    initialState: initState,
    reducers: {
        setMyAssets: (state, action) => action.payload,
        resetMyAssets: () => initState,
    },
});

export const {
    setMyAssets,
    resetMyAssets
} = myAssetsSlice.actions;

export default myAssetsSlice.reducer;