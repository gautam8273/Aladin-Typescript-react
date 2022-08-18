import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { CompanySellerFormType } from "../../types/CompanySellerFormType";

const initialState: CompanySellerFormType[] = []

export const sellerSignUpFormAction = createAsyncThunk(
    "companySellerFormActionType",
    async (data: any) => {
        const companySellerFormResponse = await apiInstance.post(endPoints.SELLER_SIGN_UP_FORM_API, data)
            .then((res) => {
                return res.data.data;
            })
        // console.log("companySellerFormresponse---->", companySellerFormResponse)
        return companySellerFormResponse;
    }
)


export const companySellerFormDataSlice = createSlice({
    name: 'companySellerFormInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sellerSignUpFormAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})

export default companySellerFormDataSlice.reducer;