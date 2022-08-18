import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { UserProfileTypes } from "../../types/UserProfileTypes";


const initialState: UserProfileTypes = [{
    email: "",
    firstName: "",
    lastName: "",
    path: "",
    phone: 0,
    phoneNumberVerified: "",
    type: "",
    userId: "",
    message: "",
    status: ""
}]


export const userProfileDetailsAction = createAsyncThunk(
    'userProfileActionType',
    async () => {
        const userProfileResponse = await apiInstance.get(endPoints.API_USER_PROFILE_DETAILS).then((res) => {
            return res.data.data
        })
        // console.log("userProfileResponse==>", userProfileResponse)
        return userProfileResponse;
    })

// Action + Reducer
export const userProfileSlice = createSlice({
    name: 'userProfileInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userProfileDetailsAction.fulfilled, (state, action) => {
            // console.log("userPro===>", action.payload)
            state = action.payload
            return state;
        })
    }

});

export default userProfileSlice.reducer