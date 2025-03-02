import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TProduct } from "@typesPath/productType";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
    "cart/actGetProductsByItems",
    async(_, thunkAPI) => {
        const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
        
        const { cart } = getState() as RootState;
        const items = cart.items;
        const concatenatedIds = Object.keys(items).map((el) => `id=${el}`).join("&");
        // if client haven't add products
        if(!Object.keys(items).length) {
            // return productFullInfo = []
            return fulfillWithValue([]);
            // if we didn't add this condition axios will get all products
            // cause we didn't send ids to "/products?${concatenatedIds}"
        }
        try {
            const products = await axios.get<TResponse>(
                `/products?${concatenatedIds}`,
                { signal, }
            );
            return products.data;
        }
        catch(error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetProductsByItems;