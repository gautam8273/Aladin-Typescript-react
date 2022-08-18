import { configureStore } from "@reduxjs/toolkit";
import homeReducer from '../store/slices/homeSlice';
import signUpReducer from '../store/slices/signUpSlice'
import userProfileReducer from '../store/slices/userProfileSlice'
import categoryListReducer from '../store/slices/categoryListSlice'
import countryNameReducer from '../store/slices/countryNameSlice'
import subCategoryDataReducer from '../store/slices/subCategorySlice'
import menuBarActiveClassID from '../store/slices/menuBarActiveClassSlice'
import worldLocationReducer from '../store/slices/worldLocationSlice'
import languageDataReducer from '../store/slices/languageSlice'
import getServiceReduer from '../store/slices/searchBarSlice'
import stateListReducer from '../store/slices/stateListSlice'
import cityListReducer from '../store/slices/cityListSlice'
import companySellerFormReducers from '../store/slices/CompanySellerFormSlice'
import freelancerSellerFormReducer from '../store/slices/freelancerSellerFormSlice'
import getServiceFilterPageReducer from '../store/slices/getServiceSlice'
import addToWishListReducer from '../store/slices/addToWishListSlice'
import serviceDetailspageReducer from '../store/slices/serviceDetailsPageSlice'
import userGetWishListReducer from '../store/slices/userGetWishListSlice'
import otherServiceFromSameSellerReducer from '../store/slices/otherServiceFromSameSellerSlice'
import recommededServiceReducer from '../store/slices/recommendedServiceSlice'
import reviewGetDetailsreducer from '../store/slices/reviewGetDetailsSlice'



export const store = configureStore({
    reducer: {
        getHomePageDetails: homeReducer,
        getSignUpPageDetails: signUpReducer,
        userProfileDetailsAction: userProfileReducer,
        categoryListDetails: categoryListReducer,

        subCategoryDetails: subCategoryDataReducer,
        menuBarActiveClassDetails: menuBarActiveClassID,

        // country Details
        countryNameDetails: countryNameReducer,

        // world location
        worldLocationDetails: worldLocationReducer,

        // forlanguage 
        languageDetails: languageDataReducer,

        // for get service ---- search  bar
        getServiceDetails: getServiceReduer,

        //for state list
        stateListDetails: stateListReducer,

        // for city list
        cityListDetails: cityListReducer,

        // for company seller form data
        companySellerFormDetails: companySellerFormReducers,

        // for freelancer seller form data
        freelancerSellerFormDetails: freelancerSellerFormReducer,

        //filter page--- get service data
        getServiceFilterPageDetails: getServiceFilterPageReducer,

        // add to wishlist
        addToWishListDetails: addToWishListReducer,

        //service details page
        serviceDetailsPageDetails: serviceDetailspageReducer,

        // user get wishlidt
        userGetWishListDetails: userGetWishListReducer,

        // otherServiceFromSameSeller
        otherServiceFromSameSellerDetails: otherServiceFromSameSellerReducer,


        //recommendedService
        recommendedServiceDetails: recommededServiceReducer,

        // get review details
        reviewGetDetails: reviewGetDetailsreducer

    }

})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

