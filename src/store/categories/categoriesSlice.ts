import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { Tload } from "@typesPath/loadType";
import { Trecord } from "@typesPath/recordType";
import isString from "../../types/guardes";

interface ICategoriesState {
    records: Trecord[],
    loading: Tload,
    error: null | string,
}
const initialState: ICategoriesState = {
    records: [],
    loading: "idle",
    error: null,
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        categoriesRecordsCleanUp: (state) => {
            state.records = [];
        }
    },
    extraReducers: (build) => {
        build.addCase(actGetCategories.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        build.addCase(actGetCategories.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        });
        build.addCase(actGetCategories.rejected, (state, action) => {
            state.loading = "failed";
            if(isString(action.payload)) {
                state.error = action.payload;
            }
        });
    }
});

export { actGetCategories };
export const { categoriesRecordsCleanUp } = categoriesSlice.actions;
export default categoriesSlice.reducer;