import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TToast } from "@typesPath/ToastType";

type TToastSlice = {
    records: TToast[],
}
const initialState: TToastSlice = {
    records: [

    ],
}

const toastSlice = createSlice(
    {
        name: "toastSlice",
        initialState,
        reducers: {
            addToast: (state, action:PayloadAction<TToast>) => {
                state.records.push({
                    id: nanoid(),
                    type: action.payload.type,
                    title: action.payload.title,
                    message: action.payload.message
                });
            },
            removeToast: (state, action) => {
                state.records = state.records.filter(el => {
                    return el.id !== action.payload;
                });
            }
        },
    }
)

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;