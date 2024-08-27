"use client"

import accountReducer from "./accountReducer";
import productReducer from "./productReducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";


const store = configureStore({
    reducer: {
        account: accountReducer,
        product: productReducer,
    }
})

export const ReduxProvider = ({children}) => (
    <Provider store={store}>
        {children}
    </Provider>
)

store.subscribe(() => console.log(store.getState()));