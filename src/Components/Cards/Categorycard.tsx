import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { categoryList, HomePageType } from '../../types/HomePageTypes'

const Categorycard = () => {



    const homePageData: HomePageType = useSelector((state: RootState): HomePageType => state.getHomePageDetails)
    // console.log("homePageData==>", homePageData)

    return (

        <>
            {
                homePageData ?
                    homePageData?.categoryData?.map((catData: categoryList, index: number) => {
                        // console.log("catData==>", catData)
                        return (
                            <div className="services-block" key={index} >
                                <div className="service-wrap">

                                    <div className="img-wrap"><img
                                        src={homePageData.categoryImagePath + catData.categoryIcon}
                                        alt="service" /></div>
                                    <div className="service-info">{catData.name}</div>

                                </div>
                            </div>
                        )
                    }) : null
            }
        </>

    )
}

export default Categorycard