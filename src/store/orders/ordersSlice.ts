import { createSlice } from "@reduxjs/toolkit";
import { Tload } from "@typesPath/loadType";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetUserOrders from "./act/actGetUserOrders";
import TOrder from "@typesPath/orderType";

type TOrdersState = {
    loading: Tload,
    error: null | string,
    orders: {
        id: number,
        total: number,
        items: TOrder[]
    }[],
}

const initialState: TOrdersState = {
    loading: "idle",
    error: null,
    orders: [],
}

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        ordesResetLoading: (state) => {
            state.loading = "idle";
        },
        resetOrdersList: (state) => {
            state.orders = [];
        }
    },
    extraReducers: (builder) => {
        // Place Order
        builder.addCase(actPlaceOrder.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(actPlaceOrder.fulfilled, (state) => {
            state.loading = "succeeded";
            state.error = null;
        })
        builder.addCase(actPlaceOrder.rejected, (state, action) => {
            state.loading = "failed";
            if(action.payload && typeof action.payload === 'string') 
                state.error = action.payload;
        })
        // get Orders
        builder.addCase(actGetUserOrders.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(actGetUserOrders.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.error = null;
            state.orders = action.payload;
        })
        builder.addCase(actGetUserOrders.rejected, (state, action) => {
            state.loading = "failed";
            if(action.payload && typeof action.payload === 'string') 
                state.error = action.payload;
        })
    }
})

export { actPlaceOrder, actGetUserOrders };
export const { ordesResetLoading, resetOrdersList } = ordersSlice.actions;
export default ordersSlice.reducer;