import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { GetServiceTypeList } from "../../types/GetServiceType";


const initialState: GetServiceTypeList = [{
    addressId: "",
    averageRating: 0,
    categoryId: "",
    categoryName: "",
    currency: "",
    description: "",
    fixedPrice: true,
    forTime: "",
    path: "",
    price: 0,
    remoteService: true,
    sellerId: "",
    serviceCover: "",
    serviceCreatedDate: "",
    serviceId: "",
    subcategoryId: "",
    subcategoryName: "",
    title: "",
    totalReview: 0,
    wishlist: false,
    _id: "",
    sellerData: [],
    gallery: [],
    addressData: []
}]

export const getServicefilterPageAction = createAsyncThunk(
    "getServiceActionType",
    async (reqPayload: { categoryId: string, subCategoryId: string }) => {

        let countryAbc = JSON.parse(localStorage.getItem("countryData") || "")

        const getServiceResponse = await apiInstance.post(endPoints.GET_SERVICE_API
            + '?categoryId=' + `${reqPayload.categoryId}`
            + '&subcategoryId=' + `${reqPayload.subCategoryId}`
            // + '&string=undefined',
            ,
            {
                country: countryAbc,
                limit: 10,
                pageno: 1
            }
        ).then((res) => {
            return res.data.data
        })
        // console.log("getSeviceResponse-->", getServiceResponse)
        return getServiceResponse;
    }
)


export const getServiceFilterPageSlice = createSlice({
    name: "getServiceInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServicefilterPageAction.fulfilled, (state, action) => {
            // console.log("action.payload---->", action.payload)
            state = action.payload
            return state;
        })
    }
})

export default getServiceFilterPageSlice.reducer;

