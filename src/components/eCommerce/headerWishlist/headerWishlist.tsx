import Logo from "../../../assets/svg/wishlist.svg?react";
import { useAppSelector } from "@store/hooks";
import HeaderCounter from "../headerCounter/headerCounter";

const HeaderWishlist = () => {

    const quantity = useAppSelector(state => state.wishlist.itemsId);
    return (
        <HeaderCounter 
            quantity={quantity.length}
            title="Wishlist"
            navigator="/Wishlist"
            Logo={<Logo title="wishlistIcon" />}
        />
    )
}

export default HeaderWishlist;