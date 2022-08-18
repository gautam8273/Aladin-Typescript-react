import React, { useEffect } from 'react'
import Slider from "react-slick";
import { getHomeData } from '../../store/slices/homeSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { BannerData, HomePageType } from '../../types/HomePageTypes';

let bannerSetting = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};

const TopBanner = () => {

    const dispatch = useAppDispatch();
    const homePageData: HomePageType = useAppSelector((xyz) => xyz.getHomePageDetails)
    // console.log("homePageData==>", homePageData)


    useEffect(() => {
        dispatch(getHomeData());
    }, [dispatch])

    return (
        <>
            <section className="banner">
                <div className="container">
                    <div className="banner-wrap">
                        <Slider className="overflow-hidden" {...bannerSetting}>
                            {homePageData?.bannerData?.map(
                                (bannerItem: BannerData, index: number) => {
                                    // console.log("bannerItems==>", bannerItem)
                                    return (
                                        <div className="img-wrap" key={index}>
                                            <img
                                                src={
                                                    homePageData.bannerImagePath + bannerItem.webImage
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

export default TopBanner