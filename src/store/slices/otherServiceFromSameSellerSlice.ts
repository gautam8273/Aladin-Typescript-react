import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { OtherServiceDataType } from "../../types/OtherServiceSameSellerType";

const initialState: OtherServiceDataType = [{
    _id: "",
    sellerId: "",
    title: "",
    categoryId: "",
    subcategoryId: "",
    fixedPrice: true,
    forTime: "",
    description: "",
    remoteService: false,
    addressId: "",
    gallery: [],
    serviceCover: "",
    sellerData: [],
    addressData: [],
    wishlist: true,
    totalReview: 0,
    averageRating: 0,
    serviceId: "",
    serviceCreatedDate: "",
    currency: "",
    minPrice: 0,
    maxPrice: 0,
    path: "",
    categoryName: "",
    subcategoryName: "",
    price: ""
}]

export const otherServiceFromSameSellerAction = createAsyncThunk(
    "otherServiceFromSameSellerActionType",

    async (payload: { serviceId: string, sellerId: string }) => {
        const countryName = JSON.parse(localStorage.getItem("countryData") || "");
        const otherServiceResponse = await apiInstance.get(endPoints.OTHER_SERVICE_SAME_SELLER_API
            + '?serviceId=' + `${payload.serviceId}`
            + '&sellerId=' + `${payload.sellerId}`
            + '&country=' + countryName
        )
            .then((res) => {
                return res.data.data
            })
        return otherServiceResponse;
    }
)

export const otherServiceFromSameSellerSlice = createSlice({
    name: "otherServiceFromSameSellerInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(otherServiceFromSameSellerAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default otherServiceFromSameSellerSlice.reducer;