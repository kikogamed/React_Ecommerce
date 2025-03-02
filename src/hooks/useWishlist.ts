import { useAppSelector, useAppDispatch } from "@store/hooks"; 
import { useEffect } from "react";

import { actGetWishListItems } from "@store/wishlist/wishlistSlice";
import { productsFullInfoCleanUp } from "@store/wishlist/wishlistSlice";

const useWishlist = () => {
    const dispatch = useAppDispatch(); // always at the top
    const { loading, error, productsFullInfo } = useAppSelector((state) => state.wishlist);

    useEffect(() => {
      const promise = dispatch(actGetWishListItems());
      return () => {
        dispatch(productsFullInfoCleanUp());
          // used to cancel loading while running
          // u can search about in in redux toolkit
          promise.abort();
      }
    },[dispatch]);

    const cartItems = useAppSelector(state => state.cart.items);
    const records = productsFullInfo.map((el) => 
      ({
        ...el,
        quantity: cartItems[el.id as number] || 0,
        isLiked: true,
        isAuthorized: true
      })
    )

    return { records, loading, error  }
}

export default useWishlist;