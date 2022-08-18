import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { ServiceDeatilsPageType } from "../../types/ServiceDeatilsPageType";


const initialState: ServiceDeatilsPageType = {
    _id: "",
    sellerId: "",
    title: "",
    categoryId: "",
    subcategoryId: "",
    fixedPrice: false,
    forTime: "",
    description: "",
    remoteService: false,
    addressId: "",
    gallery: [],
    serviceCover: "",
    sellerData: [],
    addressData: [],
    sellerInformationData: [],
    wishlist: false,
    cart: false,
    totalReview: 0,
    averageRating: 0,
    serviceId: "",
    price: "",
    serviceCreatedDate: "",
    currency: "",
    minPrice: 0,
    maxPrice: 0,
    path: "",
    categoryName: "",
    subcategoryName: ""
}

export const getServiceDetailsPageAction = createAsyncThunk(
    'serviceDetailspageActionType',
    async (serviceId: string) => {
        // console.log("serviceId-->", serviceId)
        let countryAbc = localStorage.getItem("countryData")
        const serviceDetailsPageResponse = await apiInstance.get(endPoints.SERVICE_DETAILS_PAGE_API
            + '?serviceId='
            + `${serviceId}`
            + '&country='
            + {
            country: countryAbc,

        })
            .then((res) => {
                return res.data.data
            })
        // console.log("serviceDeatilspageResponse--->", serviceDetailsPageResponse)
        return serviceDetailsPageResponse;
    }
)

export const serviceDetailsPageSlice = createSlice({
    name: "serviceDetailspageInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServiceDetailsPageAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default serviceDetailsPageSlice.reducer;