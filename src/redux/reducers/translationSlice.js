import {createSlice} from '@reduxjs/toolkit';

const initState = false;

export const translationSlice = createSlice({
  name: 'isItalian',
  initialState: initState,
  reducers: {
    setItalian: (state, action) => action.payload,
  },
});

export const {setItalian} = translationSlice.actions;

export default translationSlice.reducer;
