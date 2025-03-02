import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { TProduct } from "@typesPath/productType";
import {actLikeToggle} from "@store/wishlist/wishlistSlice";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { addToast } from "@store/toast/toastSlice";
const { product, productImg, maximumNotice, wishlistBtn } = styles;

// Product Built with Encapsulation Technique
// https://www.youtube.com/watch?v=B6MXIhfpX9g&list=PLejc1JbD4ZFS4sEpIpLfD18FEnEpafVbz&index=8


const Product = memo(({id, title, price, img, max, quantity, isLiked, isAuthorized, sale, real_price}:TProduct) => {

  const dispatch = useAppDispatch(); // always keep it at the top

  const remainingQuantity = max as number - (quantity || 0);

  const priceAfterSale = real_price as number - ((sale as number / 100) * Number(real_price)); 

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  useEffect(() => {
    if(!isBtnDisabled) return;

    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled])
  const getId = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
    dispatch(addToast({
      type: "success",
      title: "Add To Cart",
      message: `Item "${title}" Added To Cart`,
    })); 
    remainingQuantity - 1 === 0 && 
    dispatch(addToast({
        type: "warning",
        title: "Warning",
        message: `You have reached max of "${title}"`,
    })); 
  }

  const [ isLoading, setIsLoading ] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const likeHandler = () => {
    if (isAuthorized) {
      if(!isLoading) {
        setIsLoading(true);
        dispatch(actLikeToggle(id as number)).unwrap()
        .then(() => {
          setIsLoading(false);
          !isLiked&& 
            dispatch(addToast({
              type: "success",
              title: "Add To Wishlist",
              message: `Item "${title}" Added To Wishlist`
            })); 
        })
        .catch(() => {
          setIsLoading(false);
          dispatch(addToast({
            type: "danger",
            title: "Error Add To Wishlist",
            message: `There's Error with Adding Item "${title}"`
          }));  
        });
      }
    }
    else {
      handleShow();
    }
  }

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login First!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You Need to Login to Use Wishlist</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="primary" onClick={() => {handleClose(); navigate("/login");} }>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={product}>
        <div className={wishlistBtn} onClick={likeHandler}>
          {isLoading ? <Spinner size="sm" variant="primary" animation="border" />
            : isLiked ? <LikeFill /> : <Like />}
        </div>
        <div className={productImg}>
          <img
            src={img}
            alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{
          sale ? 
          <><span style={{textDecoration: "line-through"}}>{real_price}</span> {priceAfterSale.toFixed(2)}</>
          :
          price
        }EGP</h3>
        <p className={maximumNotice}>{remainingQuantity ? `You Can Add ${remainingQuantity} item(s)` :
          "You Reached The Max Number"}
        </p>
        <Button
          onClick={getId}
          variant="info"
          style={{ color: "white" }}
          disabled={isBtnDisabled || remainingQuantity === 0}
        >
          {isBtnDisabled ?
            <><Spinner size="sm" animation="border"></Spinner> Loading...</> :
            "Add To Cart!"}
        </Button>
      </div></>
  );
});

export default Product;