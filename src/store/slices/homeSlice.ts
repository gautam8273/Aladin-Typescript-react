import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../store';
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { HomePageType } from "../../types/HomePageTypes";




// const initialState: HomePageType | null = null;

const initialState: HomePageType = {
    categoryData: [],
    subcategoryData: [],
    bannerData: [],
    topAdvertiserBannerData: [],
    bottomAdvertiserBannerData: [],
    categoryImagePath: '',
    subcategoryImagePath: '',
    bannerImagePath: ''
};




export const getHomeData = createAsyncThunk(
    'homeDataActionType',
    async () => {
        // debugger
        const response = await apiInstance.get(endPoints.GET_HOME_PAGE).then(
            res => res.data.data
        )
        // console.log("response===>", response)
        return response
    }
)

//Action+Reducer
export const homeSlice = createSlice({
    name: 'homeDataPage',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getHomeData.fulfilled, (state, action) => {
            // console.log("aaaaa", action.payload)
            state = action.payload;
            return state

        })
    }

});


// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = homeSlice.action

// export const homeData = (state: RootState) => state.getHomePageDetails;

export default homeSlice.reducer;