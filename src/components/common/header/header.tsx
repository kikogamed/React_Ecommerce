import { HeaderBasket, HeaderWishlist } from "@components/eCommerce";
import { Badge, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {NavLink} from "react-router-dom";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logOut } from "@store/auth/authSlice";
import { useEffect } from "react";
import { actGetWishListItems } from "@store/wishlist/wishlistSlice";

const {headerContainer, headerLogo, headerLeftBar, line} = styles;

const Header = () => {
    const dispatch = useAppDispatch();
    const { user, accessToken } = useAppSelector(state => state.authSlice);

    useEffect(() => {
        dispatch(actGetWishListItems());
    }, [dispatch, accessToken])
    return <header>
        <div className={headerContainer}>
            <h1 className={headerLogo}>our<span><Badge bg="info">Ecom</Badge></span></h1>
        
            <div className={headerLeftBar}>
                <HeaderWishlist/>
                <div className={line}></div>
                <HeaderBasket />
            </div>
        </div>
        <Navbar 
            expand="lg"
            className="bg-body-tertiary"
            bg="dark"
            data-bs-theme="dark"
        >
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="categories">Categories</Nav.Link>
                <Nav.Link as={NavLink} to="about">About</Nav.Link>
            </Nav>
            {
                accessToken ?
                    <Nav>
                    <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={`Welcome ${user?.firstName}`}
                    menuVariant="dark"
                    >
                    <NavDropdown.Item as={NavLink} to={"profile/"} end>
                        Account
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to={"profile/orders"} end>
                        Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item 
                        as={NavLink}
                        to={"/"}
                        onClick={() => dispatch(logOut())}
                        end
                    >
                        Log out
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            :
                <Nav>
                    <Nav.Link as={NavLink} to="login">Login</Nav.Link>
                    <Nav.Link as={NavLink} to="register">Register</Nav.Link>
                </Nav>
            }
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
}

export default Header;