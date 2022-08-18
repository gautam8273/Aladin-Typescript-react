import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { CountryListType } from "../../types/countryNameType";
// import { countryName } from "../../types/countryNameType";


const initialState: CountryListType = {
    data: []

}

export const countryNameAction = createAsyncThunk(
    "countryNameActionType",
    async () => {
        const countryNameResponse = await apiInstance.get(endPoints.COUNTRY_NAME_API)
            .then((res) => {
                return res.data
            })
        return countryNameResponse;
    }
)

export const countryNameSlice = createSlice({
    name: 'countryNameInfo',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(countryNameAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default countryNameSlice.reducer;