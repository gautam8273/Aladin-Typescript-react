import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { reviewGetDetailsAction } from '../../store/slices/reviewGetDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import ReactStars from "react-rating-stars-component";

const ReviewDetailsCard = () => {

    const { serviceId } = useParams();
    // console.log("serviceId-->", serviceId)

    const dispatch = useAppDispatch();

    const reviewList = useAppSelector((a) => a.reviewGetDetails)
    // console.log("reviewList-->", reviewList)

    useEffect(() => {
        dispatch(reviewGetDetailsAction(serviceId))
    }, [dispatch, serviceId])

    return (
        <>
            <div className="reviews" >
                <div className="review-head">
                    <h2>Reviews List</h2>
                </div>
                <div className="reviews-wrap" style={{ backgroundColor: "#ffffff" }}>
                    <div className="add-review">
                        <div className="review-logo">
                            <div className="text-image">a</div>
                        </div>
                        <div className="review-text">
                            {
                                reviewList
                                    ?
                                    reviewList.map((item, index) => {
                                        return (
                                            <div className="review-details" key={index}>
                                                <div className="review-info">
                                                    <ul className="tests-wrap">
                                                        <li>Astrology Services</li>
                                                    </ul>
                                                    <div className="review-name">{item.firstName} {item.lastName}</div>
                                                    <div className="review-timing">22 Jun 2022 12:39</div>
                                                </div>

                                                <div className="form-wrap">
                                                    <div className="textarea-wrap">
                                                        {item.review}
                                                    </div>

                                                    <div className="rate-image">
                                                        < ReactStars
                                                            size={30}
                                                            value={item.rating}
                                                            edit={false}
                                                            isHalf={true}
                                                        />
                                                        <div className="rating-image">
                                                            <span style={{
                                                                display: "inline-block",
                                                                direction: "ltr"
                                                            }}>
                                                                <span style={{
                                                                    cursor: "inherit",
                                                                    display: "inline-block",
                                                                    position: "relative"
                                                                }}><span
                                                                    style={{ visibility: "hidden" }}>
                                                                        <img src=""
                                                                            className="icon" />
                                                                    </span>
                                                                    <span style={{
                                                                        display: "inline-block",
                                                                        position: "absolute",
                                                                        overflow: "hidden",
                                                                        top: "0px",
                                                                        left: "0px",
                                                                        width: "100%"
                                                                    }}>
                                                                        {/* <img src=""
                                                                            className="icon" /> */}

                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                            }
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}

export default ReviewDetailsCard