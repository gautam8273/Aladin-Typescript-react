import React from 'react'
import Slider from 'react-slick'
import { useAppSelector } from '../../store/storeHooks';
import GalleryServicePageCard from '../Cards/ServiceDetailsPage/GalleryServicePageCard';
import OtherServiceFromSameSeller from './OtherServiceFromSameSeller'

const GalleryServiceDetails = () => {

    const serviceDetailsPage = useAppSelector((a) => a.serviceDetailsPageDetails)
    // console.log("serviceDetailsPage--->", serviceDetailsPage);

    // for slider
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1

    };

    return (
        <>
            <div className="simple-sliders">
                <div className="slider-heading">
                    <h2>Recommended Services</h2>
                </div>
                <div className='service_block' style={{ width: '182%' }}>
                    <Slider {...settings}>
                        {
                            (serviceDetailsPage?.gallery) ? serviceDetailsPage?.gallery?.map((items, index) => {
                                return (
                                    <GalleryServicePageCard galleryData={items} key={index} />
                                )
                            }) : null
                        }
                    </Slider>

                </div>
            </div>
        </>
    )
}

export default GalleryServiceDetails