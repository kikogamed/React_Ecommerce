import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProduct } from "@typesPath/productType";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = TProduct[];

const actGetProducts = createAsyncThunk("products/actGetProducts", 
    async (prefix: string, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
            const response = await axios.get<TResponse>
            (`/products?cat_prefix=${prefix}`,
                { signal, }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
)



export default actGetProducts;