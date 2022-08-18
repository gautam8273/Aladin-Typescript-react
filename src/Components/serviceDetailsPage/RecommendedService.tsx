import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import Slider from 'react-slick'
import { recommendedServiceAction } from '../../store/slices/recommendedServiceSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import OtherServicesCard from '../Cards/FilterCard/OtherServicesCard';

const RecommendedService = () => {

    const { serviceId } = useParams();

    const dispatch = useAppDispatch();

    const serviceDetailsPage = useAppSelector((a) => a.serviceDetailsPageDetails)
    // console.log("serviceDetailspage--->", serviceDetailsPage)

    const recommededServiceData = useAppSelector((a) => a.recommendedServiceDetails)
    // console.log("recommededServiceData-->", recommededServiceData)

    const categoryId: string = serviceDetailsPage.categoryId;
    const subCategoryId: string = serviceDetailsPage.subcategoryId
    // console.log("categoryId-->", categoryId)
    // console.log("subCategoryId--->", subCategoryId)

    useEffect(() => {
        if (serviceId && categoryId && subCategoryId) {
            dispatch(recommendedServiceAction({ serviceId, categoryId, subCategoryId }))
        }
    }, [serviceId, subCategoryId])
    useEffect(() => {

    }, [recommededServiceData])





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
                    <h2>Recommended Services</h2>
                </div>
                <div className='service_block'>
                    <Slider {...settings}>
                        {

                            recommededServiceData ? recommededServiceData.map((data, index) => {
                                return (
                                    <OtherServicesCard cardDetails={data} key={index} />
                                )
                            }) : null
                        }

                    </Slider>

                </div>
            </div>
        </>
    )
}

export default RecommendedService