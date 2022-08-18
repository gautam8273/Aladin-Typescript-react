import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: any = {}

export const menuBarActiveClassSlice = createSlice({
    name: 'menuBarActiveClasInfo',
    initialState,
    reducers: {
        menuBarActiveClassAction: (state, action) => {
            // console.log("action.payload-->", action.payload)
            state.id = action.payload
            // return state;
        }
    },

});

export default menuBarActiveClassSlice.reducer;
export const { menuBarActiveClassAction } = menuBarActiveClassSlice.actions


