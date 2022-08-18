import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { SignUpType } from '../../types/SignUpTypes'


const initialState: SignUpType = {
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    password: "",
    re_password: "",
    privacyPolicy: "",
    type: ""
}

export const getSignUpFormAction = createAsyncThunk(
    'signUpFormActionType',
    async (data: SignUpType) => {

        const signUpResponse = await apiInstance.post(endPoints.API_USER_SIGN_UP_FORM, data).then(
            res => res.data.data
        )
        return signUpResponse;
    }
)

// Action + Reducer
export const signUpDataSlice = createSlice({
    name: 'signUpInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSignUpFormAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }

});

export default signUpDataSlice.reducer