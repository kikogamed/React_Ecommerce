import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import axios from "axios";

type TFormData = {
    email: string,
    password: string
}
type TResponse = {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    },
    accessToken: string;
}
const actLoginAuth = createAsyncThunk(
    "/authSlice/actLoginAuth",
    async (formData: TFormData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const response = await axios.post<TResponse>(`/login`, formData);
            return response.data;
        } catch(error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actLoginAuth;