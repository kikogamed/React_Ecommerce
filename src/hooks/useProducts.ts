import { useAppSelector, useAppDispatch } from "@store/hooks"; 
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actGetHomeProducts, actGetProducts, HomeCleanUp, productsCleanUp } from "@store/products/productsSlice";
import { TProduct } from "@typesPath/productType";

const useProducts = (page: "home" | "products") => {
    const { loading, error, records, bestSellers, sale } = useAppSelector((state) => state.products);
    const accessToken = useAppSelector(state => state.authSlice.accessToken);

    const params = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
      let prefix = params.prefix;
      let promise : any ;
      if(page === "products") {
        promise = dispatch(actGetProducts(prefix as string));
      }
      else {
        promise = dispatch(actGetHomeProducts());
      }

      return () => {
        if(page === "products")
          dispatch(productsCleanUp());
        else 
          dispatch(HomeCleanUp());
        
        // used to cancel loading while running
        // u can search about in in redux toolkit
        promise.abort();
      }
    },[dispatch, params]);

    const cartItems = useAppSelector(state => state.cart.items);
    const itemsId = useAppSelector(state => state.wishlist.itemsId);

    let productFullInfo: TProduct[] = [];
    let bestSellersInfo: TProduct[] = [];
    let saleInfo: TProduct[] = [];

    if(page === "products") {
      productFullInfo = records.map((el) => 
        ({
          ...el,
          quantity: cartItems[el.id as number] || 0,
          isLiked: itemsId.includes(el.id as number),
          isAuthorized: accessToken? true : false
        })
      )
    }
    else {
      bestSellersInfo = bestSellers.map(el => 
        ({
          ...el,
          quantity: cartItems[el.id as number] || 0,
          isLiked: itemsId.includes(el.id as number),
          isAuthorized: accessToken? true : false
        })
      )
      saleInfo = sale.map(el => 
        ({
          ...el,
          quantity: cartItems[el.id as number] || 0,
          isLiked: itemsId.includes(el.id as number),
          isAuthorized: accessToken? true : false
        })
      );
    }
    

    return { productFullInfo, loading, error, bestSellersInfo, saleInfo }
}

export default useProducts;