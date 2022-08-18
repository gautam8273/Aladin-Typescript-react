import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../API/axios";
import endPoints from "../../API/endPoints";
import { RemoveToWishListType } from "../../types/removeToWishListType";

const initialState: RemoveToWishListType = [{}]

export const removeToWishListAction = createAsyncThunk(
    "removeToUishListActionType",
    async (wish: { serviceId: string }) => {
        const removeToWishListResponse = await apiInstance.post(endPoints.REMOVE_TO_WISHLIST_API, wish)
            .then((res) => {
                return res.data.data
            })
        return removeToWishListResponse
    }
)