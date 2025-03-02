import Loading from "@components/feedback/loading/loading"; 
import { GridList } from "@components/common";
import { Container } from "react-bootstrap";
import Product from "@components/eCommerce/products/products";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
    const { records, loading, error  } = useWishlist(); 

    return (
        <div>
            <Container>
                <h2>Your Wishlist</h2>
                <Loading error={error} status={loading} type="product">
                    <GridList 
                        records={records}
                        renderItem={(record) => <Product {...record} />}
                        emptyMessage="Your wishlist is empty"
                    >    
                    </GridList>
                </Loading>
            </Container>
        </div>
    )
}

export default Wishlist;