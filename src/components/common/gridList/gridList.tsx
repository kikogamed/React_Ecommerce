import { LottieHandler } from "@components/feedback";
import { Row, Col } from "react-bootstrap";
type TGridList<T> = {
    records: T[],
    renderItem: (record: T) => React.ReactNode,
    emptyMessage: string
}

const GridList = <T extends {id?: number}>({records, renderItem, emptyMessage}: TGridList<T>) => {
    const List =
    records.length > 0 ?
       records.map((record) => 
           <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
               {renderItem(record)}
           </Col>
       )
    :
       <LottieHandler type="empty" message={emptyMessage} />
   ;

   return <Row>{List}</Row>
}

export default GridList;