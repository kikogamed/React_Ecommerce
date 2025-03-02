import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actGetUserOrders = createAsyncThunk(
    "orders/actGetUserOrders",
    async (_, thunkAPI) => {
        const { rejectWithValue, getState, signal } = thunkAPI;
        const { authSlice } = getState() as RootState;
        const userId = authSlice.user?.id;

        try {
            const response = await axios.get(
                `/orders?userId=${userId}`,
                { signal }
            );
            return response.data;
        }
        catch(error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actGetUserOrders;