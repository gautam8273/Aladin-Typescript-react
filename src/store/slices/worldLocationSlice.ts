import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { WorldLocationType } from "../../types/WorldLocationType";


const initialState: WorldLocationType = [

]

export const worldLocationAction = createAsyncThunk(
    "worldCountryLocationActionType",
    async (val: any) => {
        const worldLocationResponse = await apiInstance.get(endPoints.WORLD_LOCATION_API + `?string=${val}`)
            .then((res) => {
                return res.data.data
            })
        return worldLocationResponse;
    }
)

export const worldLocationSlice = createSlice({
    name: "worldLocationInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(worldLocationAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default worldLocationSlice.reducer;