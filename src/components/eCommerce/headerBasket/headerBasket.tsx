import { useAppSelector } from "@store/hooks";
import getCartTotalQuantitySelector from "@store/cart/selectors";
import Logo from "@assets/svg/cart.svg?react";
import HeaderCounter from "../headerCounter/headerCounter";

const HeaderBasket = () => {
  const quantity = useAppSelector(getCartTotalQuantitySelector);

  return (
    <HeaderCounter 
      quantity={quantity} 
      navigator="/Cart"
      Logo={<Logo title="cartIcon" />}
      title="Cart"
    />
  );
};

export default HeaderBasket;