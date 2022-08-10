import { configureStore, createSlice } from "@reduxjs/toolkit";
const tokenId = localStorage.getItem('token');

// const 

const auth = { token: tokenId };

const authSlice = createSlice({
    name: "auth",
    initialState: auth,
    reducers: {
        login(state, action){
            state.token = action.payload;
        },
        logout(state, action){
            state.token = null;
            localStorage.removeItem('token');
        },
    }
})

const store = configureStore({
    reducer : {
        authSlice: authSlice.reducer,
    },
})

export const authActions = authSlice.actions;
export default store;
 