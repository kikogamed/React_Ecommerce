import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { Header, Footer } from "@components/common";
import { Container } from "react-bootstrap";
import { ToastList } from "@components/feedback";

const {container, wrapper} = styles;
const MainLayout = () => {
    return <Container className={container}>
        <Header></Header>
        <div className={wrapper}>
            <Outlet></Outlet>
        </div>
        <ToastList />
        <Footer></Footer>
    </Container>
}

export default MainLayout;