import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "@typesPath/productType";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { Tload } from "@typesPath/loadType";
import isString from "../../types/guardes";
import { logOut } from "@store/auth/authSlice";
import { actPlaceOrder } from "@store/orders/ordersSlice";

interface ICartState {
    items: { [key: number]: number },
    productFullInfo: TProduct[],
    error: string | null,
    loading: Tload,
}

const initialState: ICartState = 
{
    items: {},
    productFullInfo: [],
    error: null,
    loading: "idle",
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload;
            if(state.items[id]) state.items[id]++;
            else state.items[id] = 1;
        },
        cartItemChangeQuantity: (state, action) => {
            state.items[action.payload.id] = action.payload.quantity;
        },
        cartItemRemove: (state, action) => {
            state.productFullInfo = state.productFullInfo.filter(el => el.id !== action.payload);
            delete state.items[action.payload];
        },
        cartProductFullInfoCleanUp: (state) => {
            state.productFullInfo = [];
        }
    },
    extraReducers: (build) => {
        build.addCase(actGetProductsByItems.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        build.addCase(actGetProductsByItems.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.productFullInfo = action.payload;
        });
        build.addCase(actGetProductsByItems.rejected, (state, action) => {
            state.loading = "failed";
            if(isString(action.payload)) {
                state.error = action.payload;
            }
        });

        // When Logout
        build.addCase(logOut, state => {
            state.productFullInfo = [];
            state.items = [];
        })
        // place Order
        build.addCase(actPlaceOrder.fulfilled, state => {
            state.productFullInfo = [];
            state.items = [];
        });
    }
});

export {actGetProductsByItems}
export const { addToCart, cartItemChangeQuantity, cartItemRemove, cartProductFullInfoCleanUp }  = CartSlice.actions;
export default CartSlice.reducer;