import { Tload } from "@typesPath/loadType";
import CategorySkeleton from "../skeletons/categorySkeleton/categorySkeleton";
import CartSkeleton from "../skeletons/cartSkeleton/cartSkeleton";
import ProductSkeleton from "../skeletons/productSkeleton/ProductSkeleton";
import TableSkeleton from "../skeletons/tableSkeleton/tableSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";

const skeletonsTypes = {
    category: CategorySkeleton,
    product: ProductSkeleton,
    cart: CartSkeleton,
    table: TableSkeleton,
}

type LoadingProps = { 
    status: Tload,
    error: null | string,
    type: keyof typeof skeletonsTypes,
    children: React.ReactNode,
    // children: React.JSX.Element,
    
    //Difference between reactnode and jsxelement 
    // react node can be data structure or object or html tag
    // jsx element is only html tag 
};


const Loading = ({status, error, type, children}:LoadingProps) => {
    const Component = skeletonsTypes[type];
    if(status === "pending") {
        return <Component />
    }
    if(status === "failed") {
        return <LottieHandler type="error" message={error as string} />
    }
    return <>{children}</>
};

export default Loading;