import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";
import actGetProductsByItems from "@store/cart/act/actGetProductsByItems";
import { cartItemChangeQuantity, cartItemRemove, cartProductFullInfoCleanUp } from "@store/cart/cartSlice";
import { ordesResetLoading } from "@store/orders/ordersSlice";
import { useNavigate } from "react-router-dom";
 
const useCart = () => {
    const dispatch = useAppDispatch(); // always at the top
    const { items, productFullInfo, loading, error } = useAppSelector(state => state.cart);
    const ordersLoading = useAppSelector(state => state.orders.loading);
    const navigate = useNavigate();
    useEffect(() => {
        const promise = dispatch(actGetProductsByItems());

        return () => {
            dispatch(ordesResetLoading());  
            dispatch(cartProductFullInfoCleanUp());
            // used to cancel loading while running
            // u can search about in in redux toolkit
            promise.abort();
        }
    }, [dispatch]);

    const products = productFullInfo.map((el) => ({
        ...el,
        quantity: items[el.id as number]  
    }))

    const changeQuantityHandler = useCallback((id: number, quantity: number) => {
        dispatch(cartItemChangeQuantity({id, quantity}));
    }, [dispatch]);

    const removeItemHandler = useCallback((id: number) => {
        dispatch(cartItemRemove(id));
    }, [dispatch]);

    return { removeItemHandler, changeQuantityHandler, products, loading, error, ordersLoading, navigate }
}

export default useCart;