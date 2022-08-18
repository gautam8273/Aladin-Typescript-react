import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { useAppSelector } from '../../../store/storeHooks'
import { GalleryType } from '../../../types/ServiceDeatilsPageType'

export type GalleryDetailsType = {
    galleryData: GalleryType
}

const GalleryServicePageCard = (galleryPageInfo: GalleryDetailsType) => {

    const galleryImages = galleryPageInfo.galleryData;
    // console.log("galleryImages-->", galleryImages)

    const serviceDetailsPage = useAppSelector((a) => a.serviceDetailsPageDetails)
    // console.log("serviceDetailsPage--->", serviceDetailsPage);

    return (
        <>

            <div className='card-wrap'>
                <div className="image-Box service-block">
                    <div>
                        <div className="service-image" >
                            <img
                                src={serviceDetailsPage.path + galleryImages.media} alt="service" />
                        </div>
                        <div className="service-card">
                            <div className="service-name">{serviceDetailsPage.description}</div>
                        </div>
                    </div>

                </div>
            </div>

        </>



    )
}

export default GalleryServicePageCard