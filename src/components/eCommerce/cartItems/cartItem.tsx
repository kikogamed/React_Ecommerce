import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@typesPath/productType";
import { memo } from "react";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItem = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};
const CartItem = memo(({id, img, title, price, max, quantity,
                       changeQuantityHandler,
                       removeItemHandler}: TCartItem) => {

  const renderOptions = Array(max).fill(0).map((_, idx) => {
    return <option value={idx + 1} key={idx+1}>{idx + 1}</option>
  })

  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +event.target.value;
    changeQuantityHandler(id as number, quantity);
  }

  return (
    <div className={cartItem}>
      <div className={product}>
        <div className={productImg}>
          <img
            src={img}
            alt="title"
          />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price} EGP</h3>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => removeItemHandler(id as number)}
          >
            Remove
          </Button>
        </div>
      </div>

      <div className={cartItemSelection}>
        <span className="d-block mb-1">Quantity</span>
        <Form.Select aria-label="Default select example"
        value={quantity}
        onChange={changeQuantity}
        >
          {renderOptions}
        </Form.Select>
      </div>
    </div>
  );
});

export default CartItem;