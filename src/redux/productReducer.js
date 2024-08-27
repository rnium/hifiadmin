import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        stockModalProduct: null,
        requiresRefetch: false,
    },
    reducers: {
        setStockModalProduct: (state, action) => {
            state.stockModalProduct = action.payload;
        },
        setRequiresRefetch: (state, action) => {
            state.requiresRefetch = action.payload;
        },
    }
})

export const { setStockModalProduct, setRequiresRefetch } = productSlice.actions;
export default productSlice.reducer;