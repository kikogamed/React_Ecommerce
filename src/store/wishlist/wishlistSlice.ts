import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishListItems from "./act/actGetWishlistItems";
import { Tload } from "@typesPath/loadType";
import { TProduct } from "@typesPath/productType";
import { logOut } from "@store/auth/authSlice";

type TWishlist = { 
    itemsId: number[],
    error: null | string,
    loading: Tload,
    productsFullInfo: TProduct[],
};
const initialState : TWishlist = {
    itemsId: [],
    error: null,
    loading: "idle",
    productsFullInfo: []
};
const wishListSlice = createSlice({
    name: "wishlist", 
    initialState,
    reducers: {
        productsFullInfoCleanUp: (state) => {
            state.productsFullInfo = [];
        }
    },
    extraReducers: (builder) => {
        // actLikeToggle
        builder.addCase(actLikeToggle.pending, (state) => {
            state.error = null;
        });
        builder.addCase(actLikeToggle.fulfilled, (state, action) => {
            if(action.payload.type === "add") {
                state.itemsId.push(action.payload.id);
            }
            else {
                state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
                state.productsFullInfo = state.productsFullInfo.filter(
                    (el) => el.id !== action.payload.id
                );
            }
        });
        builder.addCase(actLikeToggle.rejected, (state, action) => {
            if(action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        })
        // actGetItems
        builder.addCase(actGetWishListItems.pending, (state) => {
            state.error = null;
            state.loading = "pending";
        });
        builder.addCase(actGetWishListItems.fulfilled, (state, action) => {
            state.error = null;
            state.loading = "succeeded";
            state.productsFullInfo = action.payload;
            if(!state.itemsId.length && state.productsFullInfo.length) {
                state.productsFullInfo.map(el => {
                    state.itemsId.push(el.id as number);
                });
            }
        });
        builder.addCase(actGetWishListItems.rejected, (state, action) => {
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
        })

        // When logout

        builder.addCase(logOut, (state) => {
            state.productsFullInfo = [];
            state.itemsId = [];
        });
    }
});

export { actLikeToggle, actGetWishListItems };
export const { productsFullInfoCleanUp } = wishListSlice.actions;
export default wishListSlice.reducer;