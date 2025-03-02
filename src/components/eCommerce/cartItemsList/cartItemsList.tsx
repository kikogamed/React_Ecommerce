import { TProduct } from "@typesPath/productType";
import CartItem from "../cartItems/cartItem";

type TCartItemList = {
    products: TProduct[],
    changeQuantityHandler: (id: number, quantity: number) => void,
    removeItemHandler: (id: number) => void,
}
const CartItemsList = ({products, 
                        changeQuantityHandler, 
                        removeItemHandler}: TCartItemList) => {
    const renderList = products.map((el) => 
        <CartItem
            key={el.id}
            {...el}
            changeQuantityHandler={changeQuantityHandler}
            removeItemHandler={removeItemHandler}
        />

    );

    return <div>{renderList}</div>
}

export default CartItemsList;