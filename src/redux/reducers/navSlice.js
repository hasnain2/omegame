import {createSlice} from '@reduxjs/toolkit';

const initState = {
  drawerStatus: false,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState: initState,
  reducers: {
    setDrawerStatus: (state, action) => {
      state.drawerStatus = action.payload;
    },
  },
});

export const {setDrawerStatus} = navSlice.actions;

export default navSlice.reducer;
