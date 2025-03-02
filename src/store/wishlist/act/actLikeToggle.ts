import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actLikeToggle = createAsyncThunk(
    "wishlist/actLikeToggle",
    async (id: number, thunkAPI) => {
        const { rejectWithValue, signal, getState } = thunkAPI;
        const { authSlice } = getState() as RootState;

        try {
            const response = await axios.get(
                `/wishlist?userId=${authSlice.user?.id}&productId=${id}`,
                { signal }
            );
            
            if(response.data.length > 0) {
                await axios.delete(`/wishlist/${response.data[0].id}`);
                return { type: "remove", id };
            }
            else {
                await axios.post(`/wishlist`, { userId: authSlice.user?.id, productId: id });
                return { type: "add", id };
            }
        }
        catch(error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
)

export default actLikeToggle;