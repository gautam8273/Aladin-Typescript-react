import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { SignInTypes } from "../../types/SignInTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState: SignInTypes = {
    email: "",
    password: "",
    privacyPolicy: false
}

export const getSignInFormAction = createAsyncThunk(
    'signinFormActionType',
    async (data: SignInTypes) => {
        console.log("fsdfsdf")
        const signInFormResponse = await apiInstance.post(endPoints.API_USER_SIGN_IN_FORM, data)
            .then((res) => {

                if (res.data.data.token) {
                    localStorage.setItem("loginData", res.data.data.token);
                }
                return res.data.data

            })
        console.log("signInFromResponse==>", signInFormResponse)
        return signInFormResponse;
    }

)


// export const getSignInFormAction = createAsyncThunk('signin', async (data: SignInTypes) => {
//     const response = await apiInstance.post(endPoints.API_USER_SIGN_IN_FORM, data).then((res) => {
//         return res.data.data
//     })
//     console.log("response", response)
// })

export const signInSlice = createSlice({
    name: 'signInInfo',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getSignInFormAction.fulfilled, (state, action) => {
            console.log("signIn==>", action.payload)
            state = action.payload
            return state;
        })
    }
})

export default signInSlice.reducer