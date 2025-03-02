import { TProduct } from "@typesPath/productType";
import styles from "./styles.module.css" ;
import { Button, Modal, Spinner } from "react-bootstrap";
import { actPlaceOrder } from "@store/orders/ordersSlice";
import { useAppDispatch } from "@store/hooks";
import { useState } from "react";

type TSubTotal = {products: TProduct[]};
const CartItemSubtotal = ({products}: TSubTotal) => {

    const dispatch = useAppDispatch();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const SubTotal = products.reduce((accumulator, el) => {
        const price = el.price;
        const quantity = el.quantity;
        if(quantity && typeof quantity == "number") {
            return accumulator + (price as number * quantity);
        }
        else return accumulator;
    }, 0); 

    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<null | string>(null);
    const handlePlaceOrder = () => {
        handleClose(); 
        setIsLoading(true);

        dispatch(actPlaceOrder(SubTotal))
        .unwrap()
        .then(() => { 
            setError(null);
        })
        .catch((error) => {
            setError(error);
            handleShow();
        })
        .finally(() => {
            setIsLoading(false);
        }); 

    }
    return (
        <>
        <div className={styles.container}>
            <span>Subtotal:</span>
            <span>{SubTotal.toFixed(2)} EGP</span>
        </div>
        <div className={styles.container}>
            <span> </span>
            <span>
                <Button 
                    variant="info"
                    style={{color: "white"}}
                    onClick={handleShow}
                >
                    {
                        isLoading?
                        <Spinner animation="border" size="sm" />
                        :
                        "Place Order"
                    }
                </Button>
            </span>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Place Order!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    error?
                    error
                    :
                    `Are You Sure to Place this Order with Subtotal: ${SubTotal} EGP`
                }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button
              variant="primary" 
              onClick= {() => {handlePlaceOrder()}}
            >
                {
                    error ?
                    "Try Again"
                    :
                    "Confirm"
                }
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default CartItemSubtotal;