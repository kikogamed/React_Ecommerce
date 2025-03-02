import { createSlice } from "@reduxjs/toolkit";
import { Tload } from "@typesPath/loadType";
import { TProduct } from "@typesPath/productType";
import actGetProducts from "@store/products/act/actGetProducts";
import isString from "../../types/guardes";
import actGetHomeProducts from "./act/actGetHomeProducts";

interface IProduct {
    records: TProduct[],
    bestSellers: TProduct[],
    sale: TProduct[],
    loading: Tload,
    error: null | string,
};
const initialState:IProduct = {
    records: [],
    bestSellers: [],
    sale: [],
    loading: "idle",
    error: null
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productsCleanUp: (state) => {
            state.records = [];
        },
        HomeCleanUp: (state) => {
            state.bestSellers = [];
            state.sale = [];
        }
    },
    extraReducers: (build) => {
        // Get Products by Category
        build.addCase(actGetProducts.pending, (state) => {
            state.error = null;
            state.loading = "pending";
        });
        build.addCase(actGetProducts.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        });
        build.addCase(actGetProducts.rejected, (state, action) => {
            state.loading = "failed";
            if(isString(action.payload))
                state.error = action.payload;
        });
        // Get Home Products
        build.addCase(actGetHomeProducts.pending, (state) => {
            state.error = null;
            state.loading = "pending";
        })
        build.addCase(actGetHomeProducts.fulfilled, (state, action) => {

            state.bestSellers = [...action.payload].sort((a, b) => 
                Number(b.sellingTimes) - Number(a.sellingTimes)
            ).slice(0, 4);

            state.sale = [...action.payload].sort((a, b) => {   
                return b.sale as number - (a.sale as number);
            }).slice(0, 4);

            state.error = null;
            state.loading = "succeeded";

        })
        build.addCase(actGetHomeProducts.rejected, (state, action) => {
            if(action.payload && typeof action.payload === "string") 
                state.error = action.payload;
            state.loading = "failed";
        })
    }
})

export const {productsCleanUp, HomeCleanUp} = productSlice.actions;
export { actGetProducts, actGetHomeProducts };
export default productSlice.reducer;