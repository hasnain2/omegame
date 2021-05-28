import {createSlice} from '@reduxjs/toolkit';

const initState = [];

export const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState: initState,
  reducers: {
    setSuggestions: (state, action) => action.payload,
    resetSuggestions: () => initState,
  },
});

export const {setSuggestions, resetSuggestions} = suggestionsSlice.actions;

export default suggestionsSlice.reducer;
