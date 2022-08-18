import React from 'react'
import Slider from 'react-slick'
import { useAppSelector } from '../../store/storeHooks'
import { HomePageType, TopAdvertiserBannerData } from '../../types/HomePageTypes'

// for slider
const TopSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
};


const TopSliderData = () => {


    const homePageData: HomePageType = useAppSelector((xyz) => xyz.getHomePageDetails)
    // console.log("homePageData==>", homePageData)

    return (
        <aside className="ads-banners">
            <div className="container">

                <Slider {...TopSliderSettings}>
                    {
                        homePageData ? homePageData.topAdvertiserBannerData.map((topSliderData: TopAdvertiserBannerData, index: number) => {
                            return (
                                <div className="card" key={index}>
                                    <div className="ad-img"><img
                                        src={homePageData.bannerImagePath + topSliderData.webImage}
                                        alt="ad" />
                                    </div>
                                </div>
                            )
                        }) : null
                    }
                </Slider>
            </div>

        </aside>
    )
}

export default TopSliderData