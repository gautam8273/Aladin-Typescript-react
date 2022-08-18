import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { countryNameAction } from '../../store/slices/countryNameSlice';
import { CountryData, CountryListType } from '../../types/countryNameType';
import { getStateListAction } from '../../store/slices/stateListSlice';
import { StateListType } from '../../types/StateListType';
import { getCityListAction } from '../../store/slices/cityListSlice';
import { sellerSignUpFormAction } from '../../store/slices/CompanySellerFormSlice';
import { CompanySellerFormType } from '../../types/CompanySellerFormType';


const numberRegex = /^[0-9]+$/

const schema = yup.object().shape({

    firstName: yup.string().required("Please enter your Name")
        .min(2, "First Name must be having at least 2 char")
        .max(20, "First Name not having more than 20 character")
        .matches(/^[A-Za-z ]+$/i, "Please enter valid first name"),

    lastName: yup.string().required("Please enter your last Name")
        .min(2, "last Name must be having at least 2 char")
        .max(20, "last Name not having more than 20 character")
        .matches(/^[A-Za-z ]+$/i, "Please enter valid first name"),

    email: yup.string().required("Please enter your email")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Please enter valid email"),

    password: yup.string().required("Please enter your password")
        .min(8, "Password length should be greater than 8"),

    re_password: yup
        .string()
        .required("Please enter confirm password")
        .oneOf(
            [yup.ref("password"), null],
            "Confirm Password must be same as Password"
        ),

    businessName: yup
        .string()
        .required("Please enter Business Name")
        .min(2, "Business name must be at least 2 characters")
        .max(20, "Business name must be at most 20 characters"),

    primaryContactPerson: yup.string()
        .required("Please enter Business Name")
        .min(2, "contactPerson must be at least 2 characters")
        .max(20, "contactPerson must be at most 20 characters"),

    companyRegistrationNumber: yup
        .string()
        .required("Please enter Company Register Number")
        .matches(/^[0-9a-zA-Z]+$/, "Company Register Number is not valid"),

    vat: yup
        .string()
        .required("Please enter Vat Number"),

    addressLine1: yup
        .string()
        .required("Please enter Address")
        .min(2, "Address must be at least 2 characters")
        .max(60, "Address must be at most 20 characters")
        .matches(/^[a-zA-Z0-9\s.,'-]*$/, "Please enter valid Address"),

    addressLine2: yup
        .string(),

    cityId: yup
        .string().required("Please enter your city"),

    stateId: yup
        .string()
        .required("Please enter state"),

    countryId: yup
        .string()
        .required("Please enter country"),

    phone: yup
        .string()
        .required("Please enter mobile")
        .min(7)
        .max(14),

    postcode: yup
        .string()
        .required("Please enter Zip")
        .matches(/^[0-9a-zA-Z]+$/, "Enter valid Zip Code")
        .min(3),

    comment: yup
        .string()
        .required("Please enter Comment")

        .min(2)
        .max(300, "comment not  exceed more th"),
    privacyPolicy: yup
        .bool()
        .oneOf([true], "Please check the privacy policy"),
});



const CompanyFrom = () => {

    const dispatch = useAppDispatch();

    const [countryName, setCountryName] = useState("")

    const countryNameDetails: CountryListType = useAppSelector((a) => a.countryNameDetails)
    // console.log("countryNameDetails--->", countryNameDetails)

    const stateList = useAppSelector((a) => a.stateListDetails)
    // console.log('stateList---->', stateList)

    const cityList = useAppSelector((a) => a.cityListDetails)
    // console.log("cityList-->", cityList)

    const companySellerformDetails = useAppSelector((a) => a.companySellerFormDetails)
    // console.log("companySellerformDetails--->", companySellerformDetails)

    useEffect(() => {
        dispatch(countryNameAction())
    }, [dispatch])

    const
        {
            register,
            formState: { errors },
            handleSubmit,
            reset
        } = useForm<CompanySellerFormType>({
            // mode: "Company",
            resolver: yupResolver(schema),
        });



    // for state
    const getStateHandler = (e: any) => {
        // alert("ndfndasjk")
        let val = e.target.value;
        setCountryName(val)
        let idCountry = {
            countryId: val
        }
        dispatch(getStateListAction(idCountry))
    }

    // for city
    const getCityHandler = (e: any) => {
        // alert("sfsdfsdf")
        let idState = {
            countryId: countryName,
            stateId: e.target.value
        }
        dispatch(getCityListAction(idState))
    }

    const companySellerForm = (data: any) => {
        // console.log("data-->", data)
        let token = localStorage.getItem("loginData")
        data.type = "Company"
        if (!token) {
            dispatch(sellerSignUpFormAction(data))
        }
    }

    return (
        <>
            <div
                id="uncontrolled-tab-example-tabpane-company"
                aria-labelledby="uncontrolled-tab-example-tab-company"
                className="tab-pane active"
            >
                <div className="company-tab">
                    <div className="Toastify"></div>
                    <form
                        onSubmit={handleSubmit(companySellerForm)}
                    >
                        <div className="card inputs-wrapper">
                            <h4>Verification</h4>
                            <div className="row input-block">
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required required">
                                        first name
                                    </label>
                                    <div className={`input-wrap ${errors.firstName ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="firstName"
                                            {...register("firstName")}
                                            placeholder="FirstName"
                                            maxLength={15}
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <span className="error">
                                            {errors.firstName.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Last name
                                    </label>
                                    <div className={`input-wrap ${errors.lastName ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            // name="lastName"
                                            className="form-control"
                                            placeholder="LastName"
                                            {...register("lastName")}
                                            maxLength={15}
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <span className="error">
                                            {errors.lastName.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Email address
                                    </label>
                                    <div className={`input-wrap ${errors.email ? 'has-error' : ''}`}>
                                        <input
                                            type="email"
                                            // name="email"
                                            {...register("email")}
                                            className="form-control"
                                            placeholder="example@aladyyn.pro"

                                        />
                                    </div>
                                    {errors.email && (
                                        <span className="error">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">Password</label>
                                    <div className={`input-wrap ${errors.password ? 'has-error' : ''}`}>
                                        <input
                                            type="password"
                                            // name="password"
                                            {...register("password")}
                                            className="form-control"
                                            placeholder="**********"

                                        />
                                        <div className="toggle-password">
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                    {errors.password && (
                                        <span className="error">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Confirm Password
                                    </label>
                                    <div className={`input-wrap ${errors.re_password ? 'has-error' : ''}`}>
                                        <input
                                            type="password"
                                            // name="re_password"
                                            className="form-control"
                                            placeholder="************"
                                            {...register("re_password")}
                                        />
                                        <div className="toggle-password">
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                    {errors.re_password && (
                                        <span className="error">
                                            {errors.re_password.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="inputs-heading">Business Information</div>
                            <div className="row input-block margin-fix">
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Business Name
                                    </label>
                                    <div className={`input-wrap ${errors.businessName ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="businessName"
                                            placeholder="Business Name"
                                            {...register("businessName")}
                                        />
                                    </div>
                                    {errors.businessName && (
                                        <span className="error">
                                            {errors.businessName.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Primary Contact Person
                                    </label>
                                    <div className={`input-wrap ${errors.primaryContactPerson ? 'has-error' : ''}`} >
                                        <input
                                            type="text"
                                            // name="primaryContactPerson"
                                            {...register("primaryContactPerson")}
                                            className="form-control"
                                            placeholder="Primary Person"

                                        />
                                    </div>
                                    {errors.primaryContactPerson && (
                                        <span className="error">
                                            {errors.primaryContactPerson.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Company Registration Number
                                    </label>
                                    <div className={`input-wrap ${errors.companyRegistrationNumber ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            // name="companyRegistrationNumber"
                                            {...register("companyRegistrationNumber")}
                                            className="form-control"
                                            placeholder="Company Registration Number"

                                        />
                                    </div>
                                    {errors.companyRegistrationNumber && (
                                        <span className="error">
                                            {errors.companyRegistrationNumber.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper">
                                    <label className="input-label">
                                        VAT Number
                                        <span className="text-lowercase">
                                            (if applicable)
                                        </span>
                                    </label>
                                    <div className={`input-wrap ${errors.vat ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            // name="vat"
                                            {...register("vat")}
                                            className="form-control"
                                            placeholder="Vat number"

                                        />
                                    </div>
                                    {errors.vat && (
                                        <span className="error">
                                            {errors.vat.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="input-wrapper required">
                                        <label className="input-label required">
                                            Phone Number
                                        </label>
                                        <div className={`input-wrap ${errors.phone ? 'has-error' : ''}`}>
                                            <input
                                                type="number"
                                                // name="phone"
                                                {...register("phone")}
                                                className="form-control"
                                                placeholder="Mobile"
                                                maxLength={14} />
                                        </div>
                                        {errors.phone && (
                                            <span className="error">
                                                {errors.phone.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="inputs-heading">
                                Registered Business Address
                            </div>
                            <div className="row input-block">
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label required">
                                        address line 1
                                    </label>
                                    <div className={`input-wrap ${errors.addressLine1 ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="addressLine1"
                                            {...register("addressLine1")}
                                            placeholder="Address"

                                        />
                                        <span className="input-info">
                                            Building number and Street
                                        </span>
                                    </div>
                                    {errors.addressLine1 && (
                                        <span className="error">
                                            {errors.addressLine1.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">address line 2</label>
                                    <div className={`input-wrap ${errors.addressLine2 ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            // name="addressLine2"
                                            className="form-control"
                                            placeholder="Address"
                                            {...register("addressLine2")}
                                        />
                                        <span className="input-info">
                                            Room/Block/Apartments
                                        </span>
                                    </div>
                                    {errors.addressLine2 && (
                                        <span className="error">
                                            {errors.addressLine2.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">Country</label>
                                    <div className={`input-wrap ${errors.countryId ? 'has-error' : ''}`}>
                                        <select
                                            // name="countryId"
                                            className="form-control"
                                            id="countryId"
                                            {...register("countryId")}
                                            onBlur={getStateHandler}
                                        >
                                            <option value="">Please select country</option>

                                            {
                                                countryNameDetails ?
                                                    countryNameDetails.data.map((items: CountryData, index) => {
                                                        return (
                                                            <option value={items._id} key={index}>
                                                                {items.name}
                                                            </option>
                                                        )
                                                    }) : null
                                            }
                                        </select>
                                    </div>
                                    {errors.countryId && (
                                        <span className="error">
                                            {errors.countryId.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label required">
                                        State / Region
                                    </label>
                                    <div className={`input-wrap ${errors.stateId ? 'has-error' : ''}`}>
                                        <select
                                            className="form-control"
                                            {...register("stateId")}
                                            onClick={getCityHandler}
                                        >
                                            <option value="">Please select state</option>
                                            {stateList
                                                ? stateList?.map((item, index) => {
                                                    return (
                                                        <option value={item._id} key={index}>
                                                            {item.name}
                                                        </option>
                                                    );
                                                })
                                                : null}
                                        </select>
                                    </div>
                                    {errors.stateId && (
                                        <span className="error">
                                            {errors.stateId.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">City</label>
                                    <div className="input-wrap">
                                        <select
                                            className="form-control"
                                            // name="cityId"
                                            {...register("cityId")}

                                        >
                                            <option value={""}>Please select city</option>
                                            {cityList
                                                ? cityList?.map((item, index) => {
                                                    return (
                                                        <option value={item._id} key={index}>
                                                            {item.name}
                                                        </option>
                                                    );
                                                })
                                                : null}
                                        </select>
                                    </div>
                                    {errors.cityId && (
                                        <span className="error">
                                            {errors.cityId.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label required">
                                        ZIP / Postal Code
                                    </label>
                                    <div className={`input-wrap ${errors.postcode ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            // name="postcode"
                                            className="form-control"
                                            placeholder="Zip Code"
                                            {...register("postcode")}
                                        />
                                    </div>
                                    {errors.postcode && (
                                        <span className="error">
                                            {errors.postcode.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="row input-block">
                                <div className="col-12 input-wrapper required mb-0">
                                    <label className="input-label required">Comment</label>
                                    <div className={`input-wrap ${errors.comment ? 'has-error' : ''}`}>
                                        <textarea
                                            // type="text"
                                            className="form-control"
                                            // name="comment"
                                            placeholder="Please enter your comment"
                                            {...register("comment")}
                                        ></textarea>
                                    </div>
                                    <label className="comment-info input-label required input-info position-static">
                                        Comment should not exceed 300 characters.
                                    </label>
                                    {errors.comment && (
                                        <span className="error">
                                            {errors.comment.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    // name="privacyPolicy"
                                    // id="selectCheckbox"
                                    className="form-check-input"
                                    {...register("privacyPolicy")}
                                />
                                {
                                    errors?.privacyPolicy &&
                                    <span className="error">
                                        {errors?.privacyPolicy?.message}
                                    </span>
                                }
                                <label
                                    htmlFor="privacyPolicy"
                                    className="form-check-label"
                                >
                                    Please accept our
                                    <a
                                        className="term-conditions"
                                        href="/terms-and-conditions"
                                    >
                                        terms and conditions
                                    </a>
                                </label>
                                <div className="invalid-feedback"></div>
                            </div>
                        </div>
                        <div className="btn-wrap">
                            <input
                                className="btn"
                                type="submit"
                                value="submit"
                            // disabled={isFormSubmitting ? true : false}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CompanyFrom