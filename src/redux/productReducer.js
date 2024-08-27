import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        stockModalProduct: null,
    },
    reducers: {
        setStockModalProduct: (state, action) => {
            state.stockModalProduct = action.payload;
        },
    }
})

export const { setStockModalProduct } = productSlice.actions;
export default productSlice.reducer;