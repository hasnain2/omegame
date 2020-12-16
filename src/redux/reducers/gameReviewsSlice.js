import { createSlice } from '@reduxjs/toolkit';

const initState = []

export const gameReviewsSlice = createSlice({
    name: 'gameReviews',
    initialState: initState,
    reducers: {
        setGameReviews: (state, action) => action.payload,
        resetGameReviews: () => initState,
    },
});

export const {
    setGameReviews,
    resetGameReviews
} = gameReviewsSlice.actions;

export default gameReviewsSlice.reducer;