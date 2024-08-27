import { useSelector, useDispatch } from "react-redux";
import { setStockModalProduct, setRequiresRefetch } from "src/redux/productReducer";
import { useCallback } from "react";


export const useStockEdit = () => {
    const productInfo = useSelector(state => state.product.stockModalProduct);
    const requiresRefetch = useSelector(state => state.product.requiresRefetch);
    const dispatch = useDispatch();

    const clear = useCallback(() => {
        dispatch(setStockModalProduct(null));
    }, [])
    const setProduct = useCallback(prod_data => {
        dispatch(setStockModalProduct(prod_data));
    }, [])

    const setRefetchNow = useCallback(() => {
        dispatch(setRequiresRefetch(true));
    }, [])

    const setRefetchComplete = useCallback(() => {
        dispatch(setRequiresRefetch(false));
    }, [])

    return {productInfo, setProduct, clear, requiresRefetch, setRefetchNow, setRefetchComplete}
}