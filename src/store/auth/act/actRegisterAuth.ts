import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";
import axios from "axios";

type TFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
} 
const actRegisterAuth = createAsyncThunk(
    "/auth/actRegisterAuth",
    async (formData: TFormData, thunk) => {
        const { rejectWithValue } = thunk;

        try {
            const res = await axios.post("/register", formData);
            return res.data;
        } catch(error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actRegisterAuth;