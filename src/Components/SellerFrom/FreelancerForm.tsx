import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { countryNameAction } from '../../store/slices/countryNameSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { CountryListType } from '../../types/countryNameType';
import { getStateListAction } from '../../store/slices/stateListSlice';
import { getCityListAction } from '../../store/slices/cityListSlice';
import { FreelancerSellerFormType } from '../../types/FreelancerSellerFormType';
import { freelancerSignUpFormAction } from '../../store/slices/freelancerSellerFormSlice';


const numberRegex = /^[0-9]+$/

const schema = yup.object().shape({
    firstName: yup
        .string()
        .required("Please enter First Name")
        .min(2, "First name must be at least 2 characters")
        .max(20, "First name must be at most 20 characters")
        .matches(/^[A-Za-z ]+$/i, "Please enter valid first name"),

    lastName: yup
        .string()
        .required("Please enter Last Name")
        .min(2, "Last name must be at least 2 characters")
        .max(20, "Last name must be at most 20 characters")
        .matches(/^[A-Za-z ]+$/i, "Please enter valid last name"),

    email: yup
        .string()
        .required("Please enter your email address")
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            "Please use the correct email"
        ),

    phone: yup
        .string()
        .required("Please enter mobile")
        .matches(/^[0-9]*$/, "Phone number is not valid")
        .min(8, 'Phone number must be at least 8 characters')
        .max(14, 'Phone number must be at most 8 characters'),

    attachment: yup.string(),

    // typeOfIssue: yup.string().required("Please Select issue"),

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

    comment: yup
        .string()
        .required("Please enter Comment")
        .matches(/^[a-zA-Z0-9\s.,'-]*$/, "Comment is not valid")
        .min(2, 'Comment must be at least 300 characters')
        .max(300, 'Comment must be at most 300 characters'),

    password: yup.string().required("Please enter your password")
        .min(8, "Password length should be greater than 8"),

    re_password: yup
        .string()
        .required("Please enter confirm password")
        .oneOf(
            [yup.ref("password"), null],
            "Confirm Password must be same as Password"
        ),

    dob: yup.string().required("Please enter your Date of Birth"),

    // proofOfIdentity: yup.string().required("Image is required"),

    privacyPolicy: yup
        .bool()
        .oneOf([true], "Please check the privacy policy"),
});


const FreelancerForm = () => {

    const dispatch = useAppDispatch()

    let attachmentName = useRef(null);

    //for calendar
    const [valueDate, setValueDate] = useState<any>(new Date());

    // for image
    const [img, setImg] = useState("");
    const [fileAttach, setFileAttach] = useState<File>();


    const [countryName, setCountryName] = useState("")


    const countryNameDetails: CountryListType = useAppSelector((a) => a.countryNameDetails)
    // console.log("countryNamedetails--->", countryNameDetails)

    const stateList = useAppSelector((a) => a.stateListDetails)
    // console.log('stateList--->', stateList)

    const cityList = useAppSelector((a) => a.cityListDetails)
    // console.log("cityList--->", cityList)

    const freelancerDetails = useAppSelector((a) => a.freelancerSellerFormDetails)
    // console.log("freelancerDetails-->", freelancerDetails)

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<FreelancerSellerFormType>({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });


    //for the country
    useEffect(() => {
        dispatch(countryNameAction())
    }, [dispatch])

    //for the state list
    const getStateHandler = (e: any) => {
        let val = e.target.value;
        setCountryName(val)
        let idCountry = {
            countryId: val
        }
        dispatch(getStateListAction(idCountry))
    }

    //for city list
    const cityHandler = (e: any) => {
        let stateVal = e.target.value
        let idState = {
            countryId: countryName,
            stateId: stateVal
        }
        dispatch(getCityListAction(idState))
    }

    // submit the form
    const freelancerSellerForm = (data: any) => {
        // console.log('errors', errors)

        console.log("asdasd")


        let token = localStorage.getItem("loginData")

        if (fileAttach && !token) {
            let payload = new FormData();
            payload.append("firstName", data.firstName);
            payload.append("type", "Freelancer");
            payload.append("lastName", data.lastName);
            payload.append("comment", data.comment);
            payload.append("email", data.email);
            payload.append("phone", data.phone);
            payload.append("addressLine2", data.addressLine2);
            payload.append("addressLine1", data.addressLine1);
            payload.append("password", data.password);
            payload.append("re_password", data.re_password);
            payload.append("countryId", data.countryId);
            payload.append("stateId", data.stateId);
            payload.append("cityId", data.cityId);
            payload.append("dob", data.dob);
            payload.append("attachment", fileAttach);
            payload.append("typeOfIssue", data.typeOfIssue);
            payload.append("proofOfIdentity", data.proofOfIdentity);
            payload.append("privacyPolicy", data.privacyPolicy);
            payload.append("postcode", data.postcode);

            dispatch(freelancerSignUpFormAction(payload))
        }
    }

    //for image---show the image
    const imgHandler = (e: any) => {
        setFileAttach(e.target.files[0]);
        let src_ = URL.createObjectURL(e.target.files[0]);
        setImg(src_);
    }

    //for calendar
    const selectdata = (e: any) => {
        setValueDate(e.target.value)
    }

    return (
        <>
            <div
                id="uncontrolled-tab-example-tabpane-freelancer"
                aria-labelledby="uncontrolled-tab-example-tab-freelancer"
                className="tab-pane">
                {/* <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                /> */}
                <div className="freelancer-tab">
                    <div className="Toastify"></div>
                    <form
                        onSubmit={handleSubmit(freelancerSellerForm)}
                    >
                        <div className="card inputs-wrapper">
                            <h4>Verification</h4>
                            <div className="row input-block">
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label">first name</label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="firstName"
                                            placeholder="FirstName"
                                            {...register("firstName")}
                                        />
                                    </div>
                                    {
                                        errors.firstName && (
                                            <span className="error">
                                                {errors.firstName.message}
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label">Last name</label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            // name="lastName"
                                            className="form-control"
                                            placeholder="LastName"
                                            {...register("lastName")}
                                        />
                                    </div>
                                    {
                                        errors.lastName && (
                                            <span className="error">
                                                {errors.lastName.message}
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label">Email address</label>
                                    <div className="input-wrap">
                                        <input
                                            type="email"
                                            // name="email"
                                            className="form-control"
                                            placeholder="example@aladyyn.pro"
                                            {...register("email")}
                                        />
                                    </div>
                                    {
                                        errors.email && (
                                            <span className="error">
                                                {errors.email.message}
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label">Password</label>
                                    <div className="input-wrap password">
                                        <input
                                            type="password"
                                            // name="password"
                                            className="form-control"
                                            placeholder="*********"
                                            {...register("password")}
                                        />
                                        <div className="toggle-password">
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                    {
                                        errors.password && (
                                            <span className="error">
                                                {errors.password.message}
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label">Confirm Password</label>
                                    <div className="input-wrap password">
                                        <input
                                            type="password"
                                            // name="re_password"
                                            className="form-control"
                                            placeholder="**********"
                                            {...register("re_password")}
                                        />
                                        <div className="toggle-password">
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                    {
                                        errors.re_password && (
                                            <span className="error">
                                                {errors.re_password.message}
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="inputs-heading">Freelancer Information</div>
                            <div className="row input-block">
                                <div className="col-md-6 col-lg-4 input-wrapper required text-fix">
                                    <label className="input-label">Date of Birth</label>
                                    <div className="input-wrap">
                                        <input
                                            type="date"
                                            // className="form-control date-input"
                                            // name="dob"
                                            placeholder="Select date"
                                            onClick={selectdata}
                                            {...register("dob")}
                                        />

                                    </div>
                                    {
                                        errors.dob && (
                                            <span className="error">
                                                {errors.dob.message}
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="input-wrapper required">
                                        <label className="input-label">Phone Number</label>
                                        <div className="input-wrap">
                                            <input
                                                type="number"
                                                // name="phone"
                                                className="form-control"
                                                placeholder="Mobile"
                                                {...register("phone")}
                                            />
                                        </div>
                                        {
                                            errors.phone && (
                                                <span className="error">
                                                    {errors.phone.message}
                                                </span>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="input-wrapper img-input-fix has-input-file">
                                <label className="">Proof of Identify</label>
                                <div className="row input-block">
                                    <div className="col-lg-8 input-wrapper">
                                        <div className="img-input-wrapper">
                                            <div className="img-input">
                                                <i className="icon-plus"></i>Upload
                                                <input
                                                    // name="proofOfIdentity"
                                                    type="file"
                                                    accept="image/*"
                                                    {...register("proofOfIdentity")}
                                                    ref={attachmentName}
                                                    onChange={imgHandler}
                                                />
                                            </div>
                                            <span className="img-info">
                                                Upload scanned copy of passport, nationalID,
                                                driver’s license etc.
                                            </span>
                                        </div>
                                        {img !== "" ? (
                                            <div className="img-thumbnail-wrapper attachment-name image">
                                                <img src={img} />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="inputs-heading">Business Address</div>
                            <div className="row input-block">
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">address line 1</label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            // name="addressLine1"
                                            placeholder="Address"
                                            {...register("addressLine1")}
                                        />
                                        <span className="input-info">
                                            Building number and Street
                                        </span>
                                    </div>
                                    {
                                        errors.addressLine1 && (
                                            <span className="error">
                                                {errors.addressLine1.message}
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">address line 2</label>
                                    <div className="input-wrap">
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
                                    {
                                        errors.addressLine2 && (
                                            <span className="error">
                                                {errors.addressLine2.message}
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">Country</label>
                                    <div className="input-wrap">
                                        <select
                                            // name="countryId"
                                            className="form-control"
                                            {...register("countryId")}
                                            onBlur={getStateHandler}
                                        >
                                            <option value="">Please select country</option>
                                            {
                                                countryNameDetails && countryNameDetails.data.map((items, index) => {
                                                    return (
                                                        <option value={items._id} key={index}>
                                                            {items.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    {
                                        errors.countryId && (
                                            <span className="error">
                                                {errors.countryId.message}
                                            </span>
                                        )
                                    }
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">State / Region</label>
                                    <div className="input-wrap">
                                        <select className="form-control"
                                            // name="stateId"
                                            {...register("stateId")}
                                            onClick={cityHandler}
                                        >
                                            <option value="">Please select state</option>
                                            {
                                                stateList && stateList.map((items, index) => {
                                                    return (
                                                        <option value={items._id} key={index}>{items.name}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                    {
                                        errors.stateId && (
                                            <span className="error">
                                                {errors.stateId.message}
                                            </span>
                                        )
                                    }
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
                                            {
                                                cityList
                                                    ? cityList?.map((item, index) => {
                                                        return (
                                                            <option value={item._id} key={index}>
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })
                                                    : null
                                            }
                                        </select>
                                    </div>
                                    {
                                        errors.cityId && (
                                            <span className="error">
                                                {errors.cityId.message}
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-6 input-wrapper required">
                                <label className="input-label">ZIP / Postal Code</label>
                                <div className="input-wrap">
                                    <input
                                        type="text"
                                        // name="postcode"
                                        className="form-control"
                                        placeholder="Zip Code"
                                        {...register("postcode")}
                                    />
                                </div>
                                {
                                    errors.postcode && (
                                        <span className="error">
                                            {errors.postcode.message}
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="row input-block">
                            <div className="col-12 input-wrapper required mb-0">
                                <label className="input-label">Comment</label>
                                <div className="input-wrap">
                                    <textarea
                                        // type="text"
                                        className="form-control"
                                        // name="comment"
                                        placeholder="Please enter your comment"
                                        {...register("comment")}
                                    ></textarea>
                                    {
                                        errors.comment && (
                                            <span className="error">
                                                {errors.comment.message}
                                            </span>
                                        )
                                    }
                                </div>

                                <label className="comment-info input-label input-info position-static">
                                    Comment should not exceed 300 characters.
                                </label>

                            </div>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="privacyPolicy"
                                // id="selectCheckbox"
                                className="form-check-input"
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
                                    target="_blank"
                                >
                                    terms and conditions
                                </a>
                            </label>
                            <div className="invalid-feedback"></div>
                        </div>
                        {/* </div> */}
                        <div className="btn-wrap">
                            <input
                                className="btn"
                                type="submit"
                            // value="submit"
                            />
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default FreelancerForm