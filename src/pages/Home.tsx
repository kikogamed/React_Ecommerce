import { Button, Col, Container, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Loading } from "@components/feedback";
import { GridList } from "@components/common";
import Product from "@components/eCommerce/products/products";
import useProducts from "@hooks/useProducts";
import test1 from "@assets/imgs/test1.png";
import test2 from "@assets/imgs/test2.jpeg";
import test3 from "@assets/imgs/test3.png";

// styles
import styles from "./hero.module.css";
const { hero, scale, cards, card, head } = styles;

const Home = () => {
    const navigate = useNavigate();

   const {
        loading ,
        error,
        saleInfo,
        bestSellersInfo,
   } = useProducts("home");

    return (
        <>
        {/* Hero Section */}
        <div className={hero}>
            <h1>Welcome to Our Store</h1>
            <p>Shop the latest products at the best prices</p>
            <Button onClick={() => navigate("/categories")}>Shop Now</Button>
            <div className={scale}></div>
        </div>

        <Loading status={loading} error={error} type="product">
            {/* Best Sellers */}
            <h2 className={head}>Best Sellers</h2>
            <GridList 
                records={bestSellersInfo}
                renderItem={(record) => <Product {...record} />}
                emptyMessage="There is no products"
            >    
            </GridList>

            {/* For Sale */}
            <h2 className={head}>For Sale</h2>
            <GridList 
                records={saleInfo}
                renderItem={(record) => <Product {...record} />}
                emptyMessage="There is no products"
            >    
            </GridList>
        </Loading>
        

        {/* Testimonials */}
        <Container>
        <Row className={cards}>
        <h2 className={head}>Testimonials</h2>
        <Col>
            <div className={card}>
                <img src={test1} />
                <h3>Stan Idgar</h3>
                <p>
                I was skeptical about shopping online, but this store changed my mind! The products arrived quickly, and the quality was beyond my expectations. The customer service team was also super helpful when I had a question about my order. Highly recommend!
                </p>
            </div>
        </Col>
        <Col>
            <div className={card}>
                <img src={test2} />
                <h3>Homelander</h3>
                <p>
                I've been shopping here for months, and I keep coming back because of the amazing deals and variety. The website is easy to navigate, and I love the fast checkout process. Plus, their return policy is hassle-free!
                </p>
            </div>
        </Col>
        <Col>
            <div className={card}>
                <img src={test3} />
                <h3>A-Train</h3>
                <p>
                This e-commerce site is my go-to for gifts and everyday shopping. The product descriptions are accurate, the images are clear, and I always receive what I expect. Shipping is always on time, and the support team is great!
                </p>
            </div>
        </Col>
        </Row>
        </Container>

        </>
    )
}

export default Home;