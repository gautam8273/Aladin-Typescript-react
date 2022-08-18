import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { AddToWishListType } from "../../types/AddToWishListType";


const initialState: AddToWishListType = [{
    createdAt: "",
    deletedAt: 0,
    serviceId: "",
    status: true,
    updatedAt: "",
    userId: "",
    __v: 0,
    _id: ""
}]


export const addToWishListAction = createAsyncThunk(
    "addToWishListActionType",
    async (wish: { serviceId: string }) => {
        const addToWishListResponse = await apiInstance.post(endPoints.ADD_TO_WISHLIST_API, wish)
            .then((res) => {
                return res.data.data
            })
        // console.log("addToWishListResponse--->", addToWishListResponse)
        return addToWishListResponse;
    }
)

export const addToWishListSlice = createSlice({
    name: "addToWishListInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToWishListAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default addToWishListSlice.reducer;