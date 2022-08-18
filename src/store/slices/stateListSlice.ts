import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endPoints from "../../API/endPoints";
import { apiInstance } from "../../API/axios";
import { StateListType } from "../../types/StateListType";


const initialState: StateListType[] = [{
    _id: "",
    status: true,
    deletedAt: 0,
    name: "",
    countryId: "",
    createdAt: "",
    updatedAt: "",
    __v: 0
}]

export const getStateListAction = createAsyncThunk(
    'stateListActionType',
    async (idCountry: { countryId: string }) => {
        const stateListResponse = await apiInstance.post(endPoints.STATE_LIST_API, idCountry)
            .then((res) => {
                return res.data.data
            })
        // console.log("stateListResponse-->", stateListResponse)
        return stateListResponse
    }
)

export const stateDataSlice = createSlice({
    name: 'stateListInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStateListAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default stateDataSlice.reducer;