import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProduct } from "@typesPath/productType";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actGetHomeProducts = createAsyncThunk(
    "products/actGetBestSellers",
    async (_, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;
        try {
            const res = await axios.get<TProduct[]>(
                `/products`,
                { signal }
            );

            return res.data;

        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetHomeProducts;