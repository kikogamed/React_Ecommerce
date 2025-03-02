import { Loading, LottieHandler } from "@components/feedback";
import {  CartItemSubtotal, CartItemsList } from "@components/eCommerce";
import useCart from "@hooks/useCart";
import { Button } from "react-bootstrap";


// Cart Built with Container and Presentation/View Technique
// https://www.youtube.com/watch?v=B6MXIhfpX9g&list=PLejc1JbD4ZFS4sEpIpLfD18FEnEpafVbz&index=8
const Cart = () => {
    const { removeItemHandler, changeQuantityHandler, products, loading, error, ordersLoading, navigate } = useCart();
    
    return (
        <>
            <h2>Cart Items</h2>
            <Loading status={loading} error={error} type="cart">
            {products.length ?
            <>
                <CartItemsList products={products} 
                    changeQuantityHandler={changeQuantityHandler}
                    removeItemHandler={removeItemHandler}
                />
                <CartItemSubtotal products={products}></CartItemSubtotal>
            </>
            : 
                ordersLoading === "succeeded" ?
                    <div className="d-flex flex-column justify-content-center align-items-center">
                    <LottieHandler type={"success"} message="Order Placed Successfully" />
                    <Button 
                        className="mt-3"
                        variant="danger"
                        onClick={() => navigate("/profile/orders")}
                    >
                        Check Orders
                    </Button>
                    </div>
                :
                    <LottieHandler type={"empty"} message="Your cart is empty" />
            }
            
            </Loading>
        </>
    )
}

export default Cart;