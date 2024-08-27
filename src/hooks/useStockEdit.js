import { useSelector, useDispatch } from "react-redux";
import { setStockModalProduct } from "src/redux/productReducer";
import { useCallback } from "react";


export const useStockEdit = () => {
    const productInfo = useSelector(state => state.product.stockModalProduct);
    const dispatch = useDispatch();
    const clear = useCallback(() => {
        dispatch(setStockModalProduct(null));
    }, [])
    const setProduct = useCallback(prod_data => {
        dispatch(setStockModalProduct(prod_data));
    }, [])

    return {productInfo, setProduct, clear}
}