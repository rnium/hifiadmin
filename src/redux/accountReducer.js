import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isAuthenticated: false,
        data: null,
        isLoaded: false,
        isLoading: false,
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setLoaded: (state, action) => {
            state.isLoaded = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    }
})

export const {setAuthenticated, setLoading, setLoaded, setData} = accountSlice.actions;
export default accountSlice.reducer;