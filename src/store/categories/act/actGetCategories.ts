import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Trecord } from "@typesPath/recordType";
import axiosErrorHandler from "@utils/axiosErrorHandler";

// differince between type and interface is
//  type is one object
//  interface is array of objects
type TResponse = Trecord[];

const actGetCategories = createAsyncThunk("categories/actGetCategories", 
    async(_, thunkAPI) => {
        const { rejectWithValue, signal } = thunkAPI;

        try {
            const response = await axios.get<TResponse>
            ("/categories",
                { signal, }
            );
            
            return response.data;
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
)

export default actGetCategories;