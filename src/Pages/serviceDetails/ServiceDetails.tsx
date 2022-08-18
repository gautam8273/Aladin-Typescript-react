import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToWishListAction } from '../../store/slices/addToWishListSlice';
import { removeToWishListAction } from '../../store/slices/removeToWishListSlice';
import { getServiceDetailsPageAction } from '../../store/slices/serviceDetailsPageSlice';
import { userGetWishListAction } from '../../store/slices/userGetWishListSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import OtherServiceFromSameSeller from '../../Components/serviceDetailsPage/OtherServiceFromSameSeller';
import RecommendedService from '../../Components/serviceDetailsPage/RecommendedService';
import ReactStars from "react-rating-stars-component";
import emptyStar from '../assets/images/icons/icon-star-empty.svg'
import Review from '../../Components/serviceDetailsPage/Review';
import ReviewDetailsCard from '../../Components/serviceDetailsPage/ReviewDetailsCard';
import { Tab, TabContainer, TabPane, Tabs } from 'react-bootstrap';
import GalleryServiceDetails from '../../Components/serviceDetailsPage/GalleryServiceDetails';


const ServiceDetails = () => {

    const dispatch = useAppDispatch()

    const { serviceId } = useParams();
    // console.log("serviceId--->", serviceId)

    const userGetWishList = useAppSelector((a) => a.userGetWishListDetails)
    // console.log("userGetWishList--->", userGetWishList)

    const serviceDetailsPage = useAppSelector((a) => a.serviceDetailsPageDetails)
    // console.log("serviceDetailsPage--->", serviceDetailsPage);

    // for wishList information
    const [wishListInfo, setWishListInfo] = useState<boolean>();
    // console.log("wishListInfo-->", wishListInfo)

    const [avgRating, setAvgRating] = useState<any>(serviceDetailsPage.averageRating)

    useEffect(() => {
        let token = localStorage.getItem("loginData");
        if (token) {
            dispatch(userGetWishListAction())
        }
    }, [dispatch, wishListInfo])

    // add and remove wishList
    const btnWishList = (add_id: string) => {

        let token = localStorage.getItem("loginData")
        // console.log("token--->", token)
        if (token) {
            if (!wishListInfo) {
                dispatch(addToWishListAction({ serviceId: add_id }))
                // setWishListInfo(true)
            }
            else {
                dispatch(removeToWishListAction({ serviceId: add_id }))
                // setWishListInfo(false)
            }
            setWishListInfo(x => !x)
        }

    }

    //get servicee details api
    useEffect(() => {

        if (serviceId) {
            dispatch(getServiceDetailsPageAction(serviceId))
        }
    }, [dispatch, serviceId, wishListInfo])


    useEffect(() => {
        setWishListInfo(serviceDetailsPage.wishlist)
    }, [serviceDetailsPage])

    //for Rating
    // const firstExample = {
    //     size: 30,
    //     value: { serviceDetailsPage?.averageRating },
    //     edit: false,
    // };

    useEffect(() => {
        setAvgRating(serviceDetailsPage.averageRating)
    }, [serviceDetailsPage?.averageRating])

    return (
        <>
            {
                serviceDetailsPage &&
                <section className="edit-information profile listing">
                    <div className="Toastify"></div>
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item"><a
                                    href="/category/61ee6e37a6c42d1621bb52da/Traditional Chinese Medicine &amp; Culture">Traditional
                                    Chinese Medicine &amp; Culture</a></li>
                                <li className="breadcrumb-item"><a
                                    href="/category/particular/61ee6e37a6c42d1621bb52da/61ee741ea6c42d1621bb53c8">Traditional
                                    Chinese Medicine</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Traditional Chinese Medicine</li>
                            </ol>
                        </nav>
                        <div className="tabbing-head listing">
                            <div className="tabbing-select"><a className="profile-link"
                                href="/seller-profile/624c306501fbbccfee302eda/61ee6e37a6c42d1621bb52da"><i
                                    className="icon-arrow"></i>Go to Seller Profile</a></div>
                            <Tabs className="tabs-wrap nav nav-tabs" role="tablist">
                                <Tab eventKey="Description" title="Description" className="nav-item" role="presentation">
                                    Description
                                </Tab>
                                <Tab eventKey="Gallery" title="Gallery" className="nav-item" role="presentation">
                                    <GalleryServiceDetails />
                                </Tab>
                            </Tabs>
                            <div className="tab-content">
                                <div id="uncontrolled-tab-example-tabpane-description"
                                    aria-labelledby="uncontrolled-tab-example-tab-description" className="tab-pane active">
                                    <div className="description-wrap listing">
                                        <div className="image-block">
                                            <div className="image-wrap"><img
                                                src={serviceDetailsPage.path + serviceDetailsPage.serviceCover}
                                                alt="profile-image" /></div>

                                            <div className=""  >
                                                <div className='btn' > Go to Cart</div>
                                            </div>

                                            <div className="btn" >
                                                Add to Cart
                                            </div>

                                            <button className="btn">
                                                chat with seller
                                            </button>

                                        </div>
                                        <div className="seller-details">
                                            <div className="details-head">
                                                <div className="main-head">
                                                    <div className="seller-btns">


                                                        <button className="btn-wrap" onClick={() => btnWishList(serviceDetailsPage.serviceId)}>
                                                            <i className={`${wishListInfo ? "icon-heart filledWish" : "icon-heart btnWish"}`}></i>Add
                                                            to Wishlist</button>
                                                        <div>
                                                            <button className="btn-wrap"><i className="icon-share"></i>Share This
                                                                Service</button></div>
                                                    </div>
                                                    <h2>{serviceDetailsPage.title}</h2>
                                                    {serviceDetailsPage?.sellerData?.length && <h3>{serviceDetailsPage?.sellerData[0]?.businessName}</h3>}
                                                </div>
                                                {/* <div className="pricing-wrap">${ServiceDetails?.price}<span className="timer"></span></div> */}
                                                <div className="pricing-wrap">
                                                    $ {
                                                        serviceDetailsPage?.price ?
                                                            serviceDetailsPage.maxPrice :
                                                            <span>{serviceDetailsPage.minPrice}-{serviceDetailsPage.maxPrice}</span>

                                                    }
                                                    <span className="timer"></span>
                                                </div>
                                            </div>

                                            <div className="seller-rating">
                                                <div className="rating-wrap">
                                                    <div className="rating-image">
                                                        <span style={{
                                                            display: "inline-block",
                                                            direction: "ltr"
                                                        }}>
                                                            <span
                                                                style={{
                                                                    cursor: "inherit",
                                                                    display: "inline-block",
                                                                    position: "relative"
                                                                }} >

                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="rating-number">


                                                        < ReactStars
                                                            size={30}
                                                            value={avgRating}
                                                            edit={false}
                                                            isHalf={true}
                                                        />

                                                        {/* {
                                                            serviceDetailsPage?.averageRating
                                                                ?
                                                                <ReactStars
                                                                    size={30}
                                                                    value={serviceDetailsPage.averageRating}
                                                                    edit={false}
                                                                    isHalf={true}
                                                                />
                                                                :
                                                                <ReactStars
                                                                    size={30}
                                                                    value={0}
                                                                    edit={false}
                                                                    isHalf={true}
                                                                />
                                                        } */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-wrap">
                                                {serviceDetailsPage?.addressData?.length && <div className="detail-list">
                                                    <h3>Address:</h3>
                                                    <ul className="details-values">
                                                        <li>
                                                            <div className="detail-text">{serviceDetailsPage.addressData[0]?.countryName}</div>
                                                        </li>
                                                        <li>
                                                            <div className="detail-text">{serviceDetailsPage.addressData[0]?.addressLine1}</div>
                                                        </li>
                                                    </ul>
                                                </div>}
                                                {serviceDetailsPage?.addressData?.length && <div className="detail-list">
                                                    <h3>Days Opened</h3>
                                                    <ul className="details-values">
                                                        <li>
                                                            <div className="detail-text">
                                                                <span className="day-name">
                                                                    {serviceDetailsPage.addressData[0]?.daysOpened[0].day}
                                                                </span>
                                                                <span
                                                                    className="timing">
                                                                    {serviceDetailsPage.addressData[0]?.daysOpened[0].from}-
                                                                    {serviceDetailsPage.addressData[0]?.daysOpened[0].to}
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>}
                                            </div>
                                            <p>{serviceDetailsPage.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <OtherServiceFromSameSeller />
                        </div>

                        <div>
                            <RecommendedService />
                        </div>

                        <div>
                            <Review />
                        </div>
                        <div>
                            <ReviewDetailsCard />
                        </div>

                    </div>
                </section >

            }

        </>
    )
}

export default ServiceDetails