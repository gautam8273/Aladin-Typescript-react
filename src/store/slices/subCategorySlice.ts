import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endPoints from "../../API/endPoints";
import { apiInstance } from "../../API/axios";
import { SubCategoryType } from "../../types/subCategoryType";


const initialState: SubCategoryType = [{
    _id: "",
    translationData: [],
    status: true,
    deletedAt: 0,
    name: "",
    slug: "",
    description: "",
    metaTitle: "",
    metaKeyword: "",
    metaDescription: "",
    categoryId: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    path: "",
    subcategoryBanner: "",
    subcategoryBannerMobile: "",
    subcategoryIcon: "",
    subcategoryIconMobile: ""
}]

export const getSubCategoryAction = createAsyncThunk(
    'subCategoryActionType',
    async (catId: string) => {
        const subCategoryResponse = await apiInstance.get(endPoints.SUB_CATEGORY_API + "?categoryId=" + `${catId}`)
            .then((res) => {
                return res.data.data
            })
        // console.log("subCategoryResponse===>", subCategoryResponse)
        return subCategoryResponse;
    }
)

export const subCategoryDataSlice = createSlice({
    name: 'subCategoryInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubCategoryAction.fulfilled, (state, action) => {
            // console.log("action.payload--->", action.payload)
            state = action.payload
            return state;
        })
    }

});

export default subCategoryDataSlice.reducer;

