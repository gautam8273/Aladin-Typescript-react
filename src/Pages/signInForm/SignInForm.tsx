import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignUpType } from '../../types/SignUpTypes';
import { useAppDispatch } from '../../store/storeHooks'
import { SignInTypes } from '../../types/SignInTypes';
import { getSignInFormAction } from '../../store/slices/signInSlice';
import { toast, ToastContainer } from 'react-toastify';


const numberRegex = /^[0-9]+$/

const schema = yup.object().shape({

    email: yup.string()
        .required("Please enter your email")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Please enter valid email"),
    password: yup.string()
        .required("Please enter your password")
        .min(8, "Password length should be greater than 8"),
    privacyPolicy: yup
        .bool()
        .oneOf([true], "Please check the privacy policy"),

});


const SignInForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //show password
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");


    const
        {
            register,
            formState: { errors },
            handleSubmit,
            reset
        } = useForm<SignInTypes>({
            resolver: yupResolver(schema),
        });

    const signInAccount = (data: SignInTypes) => {
        // console.log("data==>", data)

        dispatch(getSignInFormAction(data))
        toast.success("Login Successssssss!");
        setTimeout(() =>
            navigate('/')
            , 2000
        )

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
        <section className="sign-in">
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
            />
            <div className="">
                <div className="Toastify"></div>
            </div>
            <div className="container">
                <div className="card">
                    <h2>Sign In</h2>
                    <form
                        onSubmit={handleSubmit(signInAccount)}
                    >
                        <div className="input-block"><label htmlFor="user-id" className="show-star">Email or phone number</label>
                            <div className={`input-wrap ${errors.email ? 'has-error' : ''}`}>
                                <input
                                    type="text"
                                    // name="email"
                                    {...register("email")}
                                    className="form-control"
                                    placeholder="Email or Phone"
                                />
                                {
                                    errors?.email &&
                                    <span className="error">
                                        {errors?.email?.message}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className="input-block"><label htmlFor="password" className="show-star">Password</label>
                            <div className={`input-wrap ${errors.password ? 'has-error' : ''}`}>
                                <input
                                    type={passwordType}
                                    className="form-control"
                                    // name="password"
                                    {...register("password")}
                                    placeholder="***********"
                                    onChange={handlePasswordChange}
                                />
                                {
                                    errors?.password &&
                                    <span className="error">
                                        {errors?.password?.message}
                                    </span>
                                }
                                <div className="toggle-wrap">
                                    <button className="toggle-btn hide" type="button" onClick={showPassword}><i
                                        className="icon-eye"></i></button></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-2 mb-md-0">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        // name="checkedValue"
                                        {...register("privacyPolicy")}
                                    // required
                                    />
                                    {
                                        errors?.privacyPolicy &&
                                        <span className="error">
                                            {errors?.privacyPolicy?.message}
                                        </span>
                                    }
                                    <label
                                        className="form-check-label">Keep me signed in</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2 mb-md-0 text-md-end"><a className="forgot-link" href="/forgot-password">Forgot
                                Password?</a></div>
                        </div>
                        <div className="btn-wrap"><button type="submit" className="btn w-100">Sign In</button></div>
                    </form>
                    <div className="signin-with">or continue with</div>
                    <div className="signin-options text-center"><a className="google-login" href="/sign-in"><i
                        className="icon-google"></i><span className="text">Google</span></a><button></button><a className="fb-login"
                            href="/sign-in"><i className="icon-fb"></i><span className="text">Facebook</span></a></div>
                </div>
                <div className="card text-center">
                    <div className="signup-wrap">Don’t have an account?
                        <Link to={`/create-account`} className="signup-link">Sign Up</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignInForm