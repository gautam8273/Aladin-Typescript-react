import React, { PropsWithChildren, useState } from 'react'
import { getSignUpFormAction } from '../../store/slices/signUpSlice';
import { useAppDispatch } from '../../store/storeHooks'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignUpType } from '../../types/SignUpTypes';

const numberRegex = /^[0-9]+$/

const schema = yup.object().shape({
    firstName: yup.string()
        .required("Please enter your Name")
        .min(2, "First Name must be having at least 2 char")
        .max(20, "First Name not having more than 20 character")
        .matches(/^[A-Za-z ]+$/i, "Please enter valid first name"),
    lastName: yup.string()
        .required("Please enter your Name")
        .min(2, "last Name must be having at least 2 char")
        .max(20, "last Name not having more than 20 character")
        .matches(/^[A-Za-z ]+$/i, "Please enter valid first name"),
    phone: yup
        .string()
        .required("Please enter mobile number")
        .matches(/^[0-9]*$/, "Phone number is not valid")
        .min(7)
        .max(14),
    email: yup.string()
        .required("Please enter your email")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Please enter valid email"),
    password: yup.string()
        .required("Please enter your password")
        .min(8, "Password length should be greater than 8"),
    re_password: yup
        .string()
        .required("Please enter confirm password")
        .oneOf(
            [yup.ref("password"), null],
            "Confirm Password must be same as Password"
        ),
    privacyPolicy: yup
        .bool()
        .oneOf([true], "Please check the privacy policy"),

});

const CreateAccount = () => {

    const dispatch = useAppDispatch();

    //show password
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");

    // const [checked, setChecked] = useState(false)
    // const [errorCheck, setErrorCheck] = useState("")


    // const checkedClick = () => {
    //     setChecked(!checked)
    //     setErrorCheck("")

    // }
    // console.log("checked item", checked)


    const
        {
            register,
            formState: { errors },
            handleSubmit,
            reset
        } = useForm<SignUpType>({
            resolver: yupResolver(schema),
        });

    const createAccount = (data: SignUpType) => {
        data.type = "User"
        // console.log("data==>", data)
        dispatch(getSignUpFormAction(data))
    }

    // e@gmail.com

    const phoneKeyDownHandler = (event: any) => {
        // console.log(event)
        if (event.target.value.length >= 14) {
            // console.log(event);
            if (!(event.keyCode === 8 || event.keycode === 46 || event.keycode === 37 || event.keycode === 39))
                event.preventDefault()
        }
    }

    // show password
    const showPassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    const handlePasswordChange = (event: any) => {
        setPasswordInput(event.target.value);
    }

    return (
        <section className="create-account">
            {/* <div className="Toastify"></div> */}
            <div className="container">
                <div className="card">
                    <h2>Create Account</h2>
                    <form
                        onSubmit={handleSubmit(createAccount)}
                    >
                        <div className="row inputs-wrapper">
                            <div className="col-md-6 pr-fix input-block">
                                <div className="input-wrapper required">
                                    <label>First Name</label>
                                    <div className={`input-wrap ${errors.firstName ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            // name="firstName" 
                                            {...register("firstName")}
                                            className="form-control"
                                            placeholder="First Name"
                                        />
                                        {
                                            errors?.firstName &&
                                            <span className="error">
                                                {errors?.firstName?.message}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-6 pl-fix input-block">
                                <div className="input-wrapper required">
                                    <label>Last Name</label>
                                    <div className={`input-wrap ${errors.lastName ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            //  name="lastName" 
                                            {...register("lastName")}
                                            className="form-control"
                                            placeholder="Last Name" />
                                        {
                                            errors?.lastName &&
                                            <span className="error">
                                                {errors?.lastName?.message}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="row inputs-wrapper">
                            <div className="col-12 input-block">
                                <div className="input-wrapper required">
                                    <label htmlFor="user-id">Mobile Number</label>
                                    <div className={`input-wrap ${errors.phone ? 'has-error' : ''}`}>
                                        <input
                                            type="number"
                                            //  name="phone"
                                            {...register("phone")}
                                            className="form-control"
                                            placeholder="Phone"
                                            onKeyDown={phoneKeyDownHandler}

                                        />
                                        {
                                            errors?.phone &&
                                            <span className="error">
                                                {errors?.phone?.message}
                                            </span>
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="col-12 input-block">
                                <div className="input-wrapper required">
                                    <label htmlFor="user-id">Email Address</label>
                                    <div className={`input-wrap ${errors.email ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            //  name="email" 
                                            {...register("email")}
                                            className="form-control"
                                            placeholder="Email" />
                                        {
                                            errors?.email &&
                                            <span className="error">
                                                {errors?.email?.message}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>


                            <div className="col-12 input-block">
                                <div className="input-wrapper required">
                                    <label htmlFor="password">Password</label>
                                    <div className={`input-wrap ${errors.password ? 'has-error' : ''}`}>
                                        <input
                                            type={passwordType}
                                            className="form-control"
                                            // name="password"
                                            {...register("password")}
                                            placeholder="***********"
                                            onChange={handlePasswordChange} />
                                        {
                                            errors?.password &&
                                            <span className="error">
                                                {errors?.password?.message}
                                            </span>
                                        }
                                        <div className="toggle-wrap" onClick={showPassword}>
                                            <i className="icon-eye "></i></div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-12 input-block">
                                <div className="input-wrapper required">
                                    <label htmlFor="password">Confirm Password</label>
                                    {/* <div className={`input-wrap ${errors?.password ? 'has-error' : ''}`}> */}
                                    <div className='input-wrap'>
                                        <input type="password"
                                            // name="re_password"
                                            {...register("re_password")}
                                            className="form-control"
                                            placeholder="************" />
                                        {
                                            errors?.re_password?.message &&
                                            <span className="error">
                                                {errors?.re_password?.message}
                                            </span>
                                        }
                                        <div className="toggle-wrap" >
                                            <i className="icon-eye "></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 mb-2 mb-md-0">
                                <div className="form-check contain-checkbox">
                                    <input
                                        type="checkbox"
                                        //  name="privacyPolicy"
                                        id="selectCheckbox"
                                        className="form-check-input "
                                        // checked={checked}
                                        {...register("privacyPolicy")}
                                    // onChange={checkedClick}
                                    />
                                    {
                                        errors?.privacyPolicy &&
                                        <span className="error">
                                            {errors?.privacyPolicy?.message}
                                        </span>
                                    }
                                    <label className="form-check-label">By signing
                                        in you agree to the <a href="/user-terms-conditions" target="_blank">Terms and
                                            Conditions</a> of Aladyyn</label>
                                    <div className="invalid-feedback"></div>
                                </div>
                            </div>
                        </div>
                        <div className="btn-wrap"><button type="submit" className="btn w-100">Create Account</button></div>
                    </form>
                </div>
                <div className="card text-center">
                    <div className="signin-wrap">Already have an account?
                        <a className="signin-link">
                            Sign In</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateAccount