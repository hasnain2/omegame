import { createSlice } from '@reduxjs/toolkit';



const initState = {
    __v: 0,
    _id: "",
    deActivated: false,
    email: "",
    emailVerified: false,
    idp: [],
    isEnabled: false,
    name: "",
    photo: "",
    role: ["PLAYER"],
    token: "",
    userName: "",
    profile: {
        pic: '',
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetUser: () => initState
    },
});

export const {
    setUser,
    resetUser
} = userSlice.actions;

export default userSlice.reducer;