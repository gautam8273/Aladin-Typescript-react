import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endPoints from "../../API/endPoints";
import { apiInstance } from "../../API/axios";
import { FreelancerSellerFormType } from "../../types/FreelancerSellerFormType";

const initialState: FreelancerSellerFormType[] = [{
    addressLine1: "",
    addressLine2: "",
    // businessName: "",
    cityId: "",
    comment: "",
    // companyRegistrationNumber: '',
    countryId: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    re_password: "",
    phone: "",
    postcode: "",
    // primaryContactPerson: "",
    stateId: "",
    type: "Freelancer",
    // vat: "",
    dob: "",
    proofOfIdentity: "",
    privacyPolicy: false
}]

export const freelancerSignUpFormAction = createAsyncThunk(
    "freelancerSellerFormActionType",
    async (data: any) => {
        const freelancerSellerFormResponse = await apiInstance.post(endPoints.SELLER_SIGN_UP_FORM_API, data)
            .then((res) => {
                return res.data.data;
            })
        // console.log("freelancerSellerFormResponse---->", freelancerSellerFormResponse)
        return freelancerSellerFormResponse;
    }
)


export const freelancerSellerFormDataSlice = createSlice({
    name: 'freelancerSellerFormInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(freelancerSignUpFormAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default freelancerSellerFormDataSlice.reducer;