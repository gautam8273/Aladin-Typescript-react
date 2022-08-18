import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addToWishListAction } from '../../../store/slices/addToWishListSlice'
import { removeToWishListAction } from '../../../store/slices/removeToWishListSlice'
import { useAppDispatch, useAppSelector } from '../../../store/storeHooks'
import { GetServiceType } from '../../../types/GetServiceType'

export type DataType = {
    imageData: GetServiceType


}

const FilterImageCard = (imageDetails: DataType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const filterImageDetails = imageDetails.imageData;
    // console.log("filterImageDetails--->", filterImageDetails)

    // const filterImageData = useAppSelector((a) => a.getServiceFilterPageDetails)
    // console.log("filterImageData---->", filterImageData)

    // const addToWishListData = useAppSelector((a) => a.addToWishListDetails)
    // console.log("addToWishListData--->", addToWishListData)

    const [wishList, setWishList] = useState(filterImageDetails.wishlist)
    // console.log("wishList-->", wishList)



    // add to wishlist
    const addToWishList = (add_id: string) => {
        // console.log("add_id--->", add_id)
        // setWishList(true)

        let token = localStorage.getItem("loginData")
        // console.log("token--->", token)
        if (token) {
            if (!wishList) {
                dispatch(addToWishListAction({ serviceId: add_id }))
                setWishList(true)
            }
            else {
                dispatch(removeToWishListAction({ serviceId: add_id }))
                setWishList(false)
            }
        }
        else {
            navigate('/sign-in')
        }
    }

    // refresh error--- wishlist
    useEffect(() => {
        setWishList(filterImageDetails.wishlist)
    }, [imageDetails])


    return (
        <>
            <div>
                <div className="image-Box">
                    <div>
                        <Link to={`/service-detail/${filterImageDetails.serviceId}/${filterImageDetails.sellerData[0]?.firstName}`}>
                            <div className="service-image" style={{ width: "200px" }}><img
                                src={filterImageDetails.path + filterImageDetails.serviceCover} alt="service" />
                            </div>
                        </Link>
                        <div className="service-card">
                            <div className="service-name">{filterImageDetails.categoryName}</div>
                            <div className="service-name">{filterImageDetails.title}</div>
                            <div className="provider-info">{filterImageDetails.sellerData[0]?.businessName}</div>
                            <div className="provider-info">${filterImageDetails.price}</div>
                            {/* <div className="provider-info">$ </div> */}
                            <div className="seller-rating">
                                <div className="rating-wrap">
                                    <div className="rating-number">Rating:= </div>
                                </div>
                            </div>
                            <div className="services-block">
                                {/* <div className="price">$34.00</div> */}
                                <button className="wishlist-btn"
                                    onClick={() => addToWishList(filterImageDetails._id)}
                                >
                                    <i className={`${wishList ? " icon-heart filled" : "icon-heart"}`} ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterImageCard