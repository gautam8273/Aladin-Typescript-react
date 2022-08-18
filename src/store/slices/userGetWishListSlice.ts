import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { userGetWishListDataType } from "../../types/userGetWishListType";

const initialState: userGetWishListDataType = [{
    _id: "",
    sellerData: [],
    wishlist: "",
    totalReview: 0,
    averageRating: 0,
    serviceId: "",
    serviceCreatedDate: "",
    sellerId: "",
    title: "",
    categoryId: "",
    subcategoryId: "",
    fixedPrice: true,
    price: 0,
    currency: "",
    serviceCover: "",
    path: ""
}]

export const userGetWishListAction = createAsyncThunk(
    "userGetWishListActionType",
    async () => {
        const userGetWishListResponse = await apiInstance.get(endPoints.USER_GET_WISHLIST_API)
            .then((res) => {
                return res.data.data
            })
        // console.log("userGetWishListResponse--->", userGetWishListResponse)
        return userGetWishListResponse;
    }
)

export const userGetWishListSlice = createSlice({
    name: 'userGetWishListInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userGetWishListAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default userGetWishListSlice.reducer;