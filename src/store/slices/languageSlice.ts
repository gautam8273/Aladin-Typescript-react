import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { LanguageDataType } from "../../types/languageDataType";


const initialState: LanguageDataType = [{
    _id: "",
    default: true,
    siteLanguage: true,
    status: true,
    deletedAt: 0,
    name: "",
    code: "",
    flag: "",
    flagLarge: "",
    createdAt: "",
    updatedAt: "",
    __v: 0
}]

export const getLanguageAction = createAsyncThunk(
    "getLanguageActionType",
    async () => {
        const languageDataResponse = await apiInstance.get(endPoints.LANGUAGE_DATA_API)
            .then((res) => {
                return res.data.data;
            })
        return languageDataResponse;
    }
)


export const languageDataSlice = createSlice({
    name: "getLanguageInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLanguageAction.fulfilled, (state, action) => {
            state = action.payload
            return state;
        })
    }
})


export default languageDataSlice.reducer;