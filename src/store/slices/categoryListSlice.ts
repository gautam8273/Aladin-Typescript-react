import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { CategoryListTypes } from "../../types/categoryListTypes";


const initialState: CategoryListTypes = [{
    _id: "",
    translationData: [],
    status: "",
    deletedAt: 0,
    name: "",
    slug: "",
    description: "",
    metaTitle: "",
    metaKeyword: "",
    metaDescription: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    categoryBanner: "",
    categoryBannerMobile: "",
    categoryIcon: "",
    categoryIconMobile: "",
    path: ""
}]

export const getCategoryListAction = createAsyncThunk(
    'categoryListActionType',
    async () => {
        const categoryListResponse = await apiInstance.get(endPoints.API_CATEGORY_LIST)
            .then((res) => {
                return res.data.data
            })
        // console.log("categoryListResponse==>", categoryListResponse)
        return categoryListResponse;
    }
)

export const categoryListSlice = createSlice({
    name: 'categoryListInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategoryListAction.fulfilled, (state, action) => {
            // console.log("action.payload==>", action.payload)
            state = action.payload
            return state;
        })
    }
});

export default categoryListSlice.reducer;