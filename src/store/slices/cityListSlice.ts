import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { CityListType } from "../../types/CityListType";

const initialState: CityListType[] = [
    {
        _id: "",
        status: true,
        deletedAt: 0,
        name: "",
        countryId: "",
        stateId: "",
        createdAt: "",
        updatedAt: "",
        __v: 0
    }
]

export const getCityListAction = createAsyncThunk(
    "getCityListActionType",
    async (idState: { countryId: string, stateId: string }) => {
        const cityListResponse = await apiInstance.post(endPoints.CITY_LIST_API, idState)
            .then((res) => {
                return res.data.data
            })
        // console.log("cityListResponse--->", cityListResponse)
        return cityListResponse;
    }
)


export const cityDataSlice = createSlice({
    name: "cityListInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCityListAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default cityDataSlice.reducer;
