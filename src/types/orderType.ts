import { TProduct } from "./productType"

type TOrder = {
    id?: number,
    total: number,
    items: TProduct[]
}

export default TOrder;