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


export const recommendedServiceAction = createAsyncThunk(
    "recommendedServiceActionType",
    async (payload: { serviceId: string, categoryId: string, subCategoryId: string }) => {
        const countryName = JSON.parse(localStorage.getItem("countryData") || "");
        const recommededServiceResponse = await apiInstance.get(endPoints.RECOMMENDED_SERVICE_API
            + '?serviceId=' + `${payload.serviceId}`
            + '&categoryId=' + `${payload.categoryId}`
            + '&subcategoryId=' + `${payload.subCategoryId}`
            + '&country=' + countryName
        ).then((res) => {
            return res.data.data
        })
        return recommededServiceResponse;
    }
)

export const recommendedServiceSlice = createSlice({
    name: 'recommendedSercvicesInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(recommendedServiceAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default recommendedServiceSlice.reducer;