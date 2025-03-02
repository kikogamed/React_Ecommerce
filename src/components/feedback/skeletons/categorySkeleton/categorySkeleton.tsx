import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";

const CategorySkeleton = () => {
    const skeletonList = Array(4).fill(0).map((_, idx) => {
        return <Col key={idx} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader 
            speed={2}
            width={180}
            height={180}
            viewBox="0 0 180 182"
            backgroundColor="#f2eded"
            foregroundColor="#e9dddd"
        >
            <rect x="33" y="170" rx="4" ry="4" width="91" height="10" />  
            <circle cx="77" cy="78" r="77" />
        </ContentLoader>
        </Col>
    })

    return <Row>{skeletonList}</Row>
}

export default CategorySkeleton;