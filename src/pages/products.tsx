import { Container } from "react-bootstrap";
import Product from "@components/eCommerce/products/products";
import Loading from "@components/feedback/loading/loading"; 
import { GridList } from "@components/common";
import useProducts from "@hooks/useProducts";

const Products = () => {
    const { error, loading, productFullInfo } =  useProducts("products");

    
    return (
        <Container>
        <Loading error={error} status={loading} type="product">
            <GridList 
                records={productFullInfo}
                renderItem={(record) => <Product {...record} />}
                emptyMessage="There is no products"
            >    
            </GridList>
        </Loading>
        </Container>
    );
};

export default Products;