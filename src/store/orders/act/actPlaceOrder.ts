import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import TOrder from "@typesPath/orderType";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
    "orders/actPlaceOrder",
    async (total: number, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const { authSlice, cart } = getState() as RootState;
        const userId = authSlice.user?.id;
        const productsFullInfo = cart.productFullInfo;
        const items = cart.items; 

        const oredrProducts = productsFullInfo.map(el => {
            return {
                id: el.id,
                title: el.title,
                price: el.price,
                quantity: items[el.id as number],
                img: el.img,
            }
        })
        try {
            const response = await axios.post<TOrder>("/orders", {
                userId,
                total,
                items: oredrProducts,
            });
            return response.data;
        } catch(error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
)

export default actPlaceOrder;