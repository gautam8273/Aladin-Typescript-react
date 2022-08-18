import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { apiInstance } from '../../API/axios';
import endPoints from '../../API/endPoints';
import { useAppSelector } from '../../store/storeHooks';

const Review = () => {

    const { serviceId } = useParams();

    const navigate = useNavigate()

    const serviceDetailsPage = useAppSelector((a) => a.serviceDetailsPageDetails)
    // console.log("serviceDetailsPage--->", serviceDetailsPage);


    const [starRating, setStarRating] = useState<any>(0);
    // console.log("starRating", starRating)
    const [reviewMessage, setReviewMessage] = useState<any>("")

    const ratingChange = (val: any) => {
        setStarRating(val)
    }

    const submitRating = () => {
        let token = localStorage.getItem("loginData")

        if (!token) {
            navigate('/sign-in')
        }
        else {
            // if (starRating == 0 || reviewMessage == "") {
            //     alert("Please rate and review the service")
            // } else {

            apiInstance.post(endPoints.USER_ADD_REVIEW_RATING, {
                rating: starRating,
                review: reviewMessage,
                serviceId: serviceId
            }).then((res) => {
                return res.data.data
            })
            setReviewMessage("");
            setStarRating(0);
            // }
        }
    }



    return (
        <>
            <div className="reviews">
                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                />
                <div className="review-head">
                    <h2>Reviews</h2>
                </div>
                <div className="reviews-wrap"></div>
                <div className="add-review">
                    <div className="review-logo">
                        <div className="text-image">a</div>
                    </div>
                    <div className="add-form">
                        <form>
                            <div className="form-wrap">
                                <div className="textarea-wrap">
                                    <textarea
                                        className="textarea"
                                        placeholder="Write a review"
                                        value={reviewMessage}
                                        onChange={(e) => setReviewMessage(e.target.value)}
                                    >

                                    </textarea>
                                </div>
                                <div className="rate-service">
                                    <h4>Rate the service:</h4>
                                    <div className="rate-image">
                                        <div className="rating-image">

                                            <ReactStars
                                                size={25}
                                                value={starRating}
                                                edit={true}
                                                isHalf={true}
                                                onChange={ratingChange}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="button"
                                className="btn"
                                value="Add a Review"
                                onClick={submitRating}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review