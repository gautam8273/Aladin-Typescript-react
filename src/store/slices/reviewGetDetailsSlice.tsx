import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { ReviewGetDetailsType } from "../../types/ReviewGetDetailsType";

const initialState: ReviewGetDetailsType = [{
    createdAt: "",
    firstName: "",
    lastName: "",
    path: "",
    rating: 0,
    review: "",
    serviceId: "",
    title: "",
    userId: "",
    _id: ""
}]

export const reviewGetDetailsAction = createAsyncThunk(
    "reviewGetDetailsActionType",
    async (serviceId: any) => {
        const reviewGetDetailsResponse = await apiInstance.get(endPoints.REVIEW_GET_DETAILS_API
            + '?serviceId=' + `${serviceId}`)
            .then((res) => {
                return res.data.data
            })
        return reviewGetDetailsResponse;
    }

)

export const reviewGetDetailSlice = createSlice({
    name: "getReviewDetailsInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reviewGetDetailsAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default reviewGetDetailSlice.reducer;