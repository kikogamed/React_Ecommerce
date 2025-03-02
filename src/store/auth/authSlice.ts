import { createSlice } from "@reduxjs/toolkit";
import { Tload } from "@typesPath/loadType";
import actRegisterAuth from "./act/actRegisterAuth";
import actLoginAuth from "./act/actLoginAuth";

type TAuthSlice = {
    loading: Tload,
    error: string | null,
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    } | null,
    accessToken: string | null,
}
const initialState: TAuthSlice = { 
    loading: "idle",
    error: null,
    user: null,
    accessToken: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetUI: (state) => {
            state.error = null;
            state.loading = "idle";
        },
        logOut: (state) => {
            state.accessToken = null;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(actRegisterAuth.pending, (state) => {
            state.error = null;
            state.loading = "pending";
        });
        builder.addCase(actRegisterAuth.fulfilled, (state) => {
            state.error = null;
            state.loading = "succeeded";
        });
        builder.addCase(actRegisterAuth.rejected, (state, action) => {
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string") 
                state.error = action.payload;
        });

        // Login
        builder.addCase(actLoginAuth.pending, (state) => {
            state.error = null;
            state.loading = "pending";
        });
        builder.addCase(actLoginAuth.fulfilled, (state, action) => {
            state.error = null;
            state.loading = "succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });
        builder.addCase(actLoginAuth.rejected, (state, action) => {
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string") 
                state.error = action.payload;
        });
    }
});

export { actRegisterAuth, actLoginAuth };
export const { resetUI, logOut } = authSlice.actions;
export default authSlice.reducer;