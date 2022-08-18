import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { otherServiceFromSameSellerAction } from '../../store/slices/otherServiceFromSameSellerSlice'
import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import OtherServicesCard from '../Cards/FilterCard/OtherServicesCard'

const OtherServiceFromSameSeller = () => {

  const dispatch = useAppDispatch();

  const { serviceId } = useParams<string>()
  // console.log("serviceId-->", serviceId)

  const serviceDetailsPage = useAppSelector((a) => a.serviceDetailsPageDetails)
  // console.log("serviceDetailspage--->", serviceDetailsPage)

  const otherServiceFromSameSeller = useAppSelector((a) => a.otherServiceFromSameSellerDetails)
  // console.log("othereServiceFromSameSeller--->", otherServiceFromSameSeller)

  const [sellerId, setSellerId] = useState<string>();
  // console.log("sellerId-->", sellerId)

  useEffect(() => {
    setSellerId(serviceDetailsPage?.sellerId)
  })

  useEffect(() => {
    if (serviceId && sellerId) {
      dispatch(otherServiceFromSameSellerAction({ serviceId, sellerId }))
    }
  }, [dispatch, serviceId, sellerId])


  // for slider
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <>
      <div className="simple-sliders">
        <div className="slider-heading">
          <h2>Other Services from This Seller</h2>
        </div>
        <div className='service_block'>
          <Slider {...settings}>
            {
              otherServiceFromSameSeller ? otherServiceFromSameSeller.map((items, index) => {
                return (
                  <OtherServicesCard cardDetails={items} key={index} />
                )
              }) : null
            }
          </Slider>
        </div>
      </div>
    </>
  )
}

export default OtherServiceFromSameSeller