import React from 'react'
import Slider from 'react-slick'
import { useAppSelector } from '../../store/storeHooks'
import { BottomAdvertiserBannerData, HomePageType } from '../../types/HomePageTypes'

let bannerSetting = {
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: true
};

const BottomSliderdata = () => {

    const homePageData: HomePageType = useAppSelector((xyz) => xyz.getHomePageDetails)
    // console.log("homePageData==>", homePageData);


    return (
        <>
            <section className="banner">
                <div className="container">
                    <div className="banner-wrap">
                        <Slider className="overflow-hidden" {...bannerSetting}>
                            {homePageData?.bottomAdvertiserBannerData?.map(
                                (bottomAdvertiserBannerData: BottomAdvertiserBannerData, index: number) => {
                                    // console.log("bannerItems==>", bannerItem)
                                    return (
                                        <div className="img-wrap" key={index}>
                                            <img
                                                src={
                                                    homePageData.bannerImagePath + bottomAdvertiserBannerData.webImage
                                                }
                                            />
                                        </div>
                                    );
                                }
                            )}
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BottomSliderdata