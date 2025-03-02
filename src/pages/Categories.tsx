import Loading from "@components/feedback/loading/loading";
import { Container } from "react-bootstrap";
import Category from "@components/eCommerce/categories/categories";
import { GridList } from "@components/common";
import useCategories from "@hooks/useCategories";

const Categories = () => {
    const { error, loading, records } = useCategories();

    return (
    <Container>
        <Loading error={error} status={loading} type="category">
            <GridList
                records={records}
                renderItem={(record) => <Category {...record} />}
                emptyMessage="There is no categories"
            >
            </GridList>
        </Loading>
  </Container>
)
}

export default Categories;