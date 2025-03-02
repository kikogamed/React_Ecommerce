import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { categoriesRecordsCleanUp } from "@store/categories/categoriesSlice";

const useCategories = () => {
    const { loading, error, records } = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const promise = dispatch(actGetCategories());

        return () => {
            dispatch(categoriesRecordsCleanUp());
            // used to cancel loading while running
            // u can search about in in redux toolkit
            promise.abort();
        }
    }, [dispatch]);

    return { loading, error, records }
}

export default useCategories;