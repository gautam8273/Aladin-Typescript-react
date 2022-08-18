import React from 'react'
import Slider from 'react-slick'
import { useAppSelector } from '../../store/storeHooks';
import { categoryList, HomePageType } from '../../types/HomePageTypes';

// for slider
const TrendingSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3
};

const TrendingSlider = () => {


    const homePageData: HomePageType = useAppSelector((xyz) => xyz.getHomePageDetails)
    // console.log("homePageData===>", homePageData)

    return (
        <>
            <section className="trending-services">
                <div className="container">
                    <h2>Trending</h2>

                    <Slider {...TrendingSettings}>
                        {
                            homePageData?.subcategoryData.map((subCatData: categoryList, index: number) => {
                                // console.log("subCatData==>", subCatData)
                                return (
                                    <div className="card" key={index}>

                                        <div className="service-img"><img
                                            src="https://inszn-ecom.s3.amazonaws.com/986075f1-aee4-427c-841d-b300a8f42dfd.jpeg" alt="service" style={{ width: "500px", height: "350px" }} />
                                        </div>
                                        <div className="service-name">
                                            <h3>{subCatData.name}</h3>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default TrendingSlider