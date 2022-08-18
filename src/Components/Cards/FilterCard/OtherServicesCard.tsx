import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addToWishListAction } from '../../../store/slices/addToWishListSlice'
import { removeToWishListAction } from '../../../store/slices/removeToWishListSlice'
import { useAppDispatch } from '../../../store/storeHooks'
import { OtherServiceFromSameSellerType } from '../../../types/OtherServiceSameSellerType'

export type CardDataType = {
    cardDetails: OtherServiceFromSameSellerType
}

const OtherServicesCard = (cardInfo: CardDataType) => {

    const otherCardInfo = cardInfo.cardDetails;
    // console.log("otherCardInfo--->", otherCardInfo)

    const dispatch = useAppDispatch()

    const [wishlistBtn, setWishlistBtn] = useState(otherCardInfo.wishlist)

    const { serviceId } = useParams()

    const wishListButton = (add_id: string) => {
        let token = localStorage.getItem("loginData")
        // console.log("token--->", token)
        if (token) {
            if (!wishlistBtn) {
                dispatch(addToWishListAction({ serviceId: add_id }))
                // setWishListInfo(true)
            }
            else {
                dispatch(removeToWishListAction({ serviceId: add_id }))
                // setWishListInfo(false)
            }
            setWishlistBtn(x => !x)
        }
    }

    useEffect(() => {
        setWishlistBtn(otherCardInfo.wishlist)
    })

    return (
        <>
            <div className='card-wrap'>
                <div className="image-Box service-block">
                    <div>
                        <Link to={`/service-detail/${otherCardInfo.serviceId}/${otherCardInfo.sellerData[0]?.firstName}`}>
                            <div className="service-image" style={{ width: "200px" }}><img
                                src={otherCardInfo.path + otherCardInfo.serviceCover} alt="service" />
                            </div>
                        </Link>
                        <div className="service-card">
                            <div className="service-name">{otherCardInfo.title}</div>
                            <div className="service-name">{otherCardInfo.addressData[0]?.countryName}</div>
                            <div className="provider-info">{otherCardInfo.addressData[0]?.stateName}</div>
                            <div className="provider-info">{otherCardInfo.addressData[0]?.addressLine1}</div>
                            {/* <div className="provider-info">$ </div> */}
                            <div className="seller-rating">
                                <div className="rating-wrap">
                                    <div className="rating-number">Rating--{otherCardInfo.averageRating} </div>
                                </div>
                            </div>
                            <div className="services-block">
                                {/* <div className="price">$34.00</div> */}
                                <Link to={`/service-detail/${otherCardInfo.serviceId}/${otherCardInfo.sellerData[0]?.firstName}`}>
                                    <button className="wishlist-btn-1"
                                        onClick={() => { wishListButton(otherCardInfo.serviceId) }}
                                    >
                                        <i className={`${wishlistBtn ? "icon-heart filledOther" : "icon-heart btnWishOther"}`}></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OtherServicesCard