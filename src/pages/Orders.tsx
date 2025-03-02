import { Loading } from "@components/feedback";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetUserOrders, ordesResetLoading, resetOrdersList } from "@store/orders/ordersSlice";
import { TProduct } from "@typesPath/productType";
import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import styles from "@components/eCommerce/products/styles.module.css";

const { product, productImg, modal } = styles;

const Orders = () => {
    const dispatch = useAppDispatch();
    const { orders, loading, error } = useAppSelector(state => state.orders);
    
    const [ show, setShow ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState<TProduct[]>([]);

    const handleClose = () => {
        setShow(false)
        setSelectedItem([]);
    };
    const handleShow = (id: number) => {

        const products = orders.find(order => order.id === id);
        const orderDetails = products?.items ?? [];
        setSelectedItem((prev) => [...prev, ...orderDetails]);

        setShow(true)
    };

    const ordersList = orders.map((el) => {
        return <tr key={el.id}>
            <td style={{padding: "5px"}}>#{el.id}</td>
            <td style={{padding: "5px"}}>
                {`${el.items.length} item(s) / `}
                <span onClick={() => handleShow(el.id)} style={{textDecoration: "underline", cursor: "pointer"}}>Order Details</span>
            </td>
            <td style={{padding: "5px"}}>{el.total} EGP</td>
        </tr>
    })
    
    useEffect(() => {
        const promise = dispatch(actGetUserOrders());

        return () => {
            promise.abort();
            dispatch(resetOrdersList());
            dispatch(ordesResetLoading());
        }
    }, [dispatch]);

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Products Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className={modal}>
                {
                    selectedItem.map(el => {
                    return (
                        <div
                            className={`${product} flex-row w-100 mb-3 gap-3 justify-content-start`}
                            key={el.id}
                        >
                            <div className={productImg}>
                            <img
                                src={el.img}
                                alt={el.title} />
                            </div>
                            <div>
                                <h2>{el.title}</h2>
                                <h3>{el.price} EGP</h3>
                                <h3>Quantity: {el.quantity}</h3>
                            </div>
                        </div>
                    )
                    })
                }
            </Modal.Body>
        </Modal>

        <h2 className="mb-3">My Orders</h2>
        <Loading status={loading} error={error} type="table">
            <Table striped bordered hover>
                <thead>
                    <th>Order Number</th>
                    <th>Items</th>
                    <th>Total Price</th>
                </thead>
                <tbody>
                    {ordersList}
                </tbody>
            </Table>
        </Loading>
        </>
    )
}

export default Orders;