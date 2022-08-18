import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endPoints from "../../API/endPoints";
import { apiInstance } from "../../API/axios";
import { GetServiceType, GetServiceTypeList } from "../../types/GetServiceType";
// import { CountryListType } from "../../types/countryNameType";


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


export const getServiceAction = createAsyncThunk(
    'getServiceActionType',
    async (val: any) => {
        let countryAbc = JSON.parse(localStorage.getItem("countryData") || "")
        const getServiceDetailsResponse = await apiInstance.post(endPoints.GET_SERVICE_API
            + '?categoryId=undefined'
            + '&subcategoryId=undefined'
            + '&string=' + `${val}`,
            {
                country: countryAbc,
                limit: 10,
                pageno: 1
            }
        )
            .then((res) => {
                return res.data.data
            })
        // console.log("getServiceDetailsResponse--->", getServiceDetailsResponse)
        return getServiceDetailsResponse;
    }
)

export const getServiceSlice = createSlice({
    name: 'getServiceInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServiceAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default getServiceSlice.reducer;
