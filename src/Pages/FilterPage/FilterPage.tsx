import React from 'react'
import Filter_LeftFilterPanel from '../../Components/FilterPageSection/Filter_LeftFilterPanel'
import Filter_RightImagePart from '../../Components/FilterPageSection/Filter_RightImagePart'

const FilterPage = () => {
    return (
        <>
            <section className="sub-category-block">
                <div className="container">
                    <nav aria-label="breadcrumb" className="w-100">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/user/dashboard">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/category/61ee6e30a6c42d1621bb52d9/Entertainment">
                                    Entertainment
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Music Band
                            </li>
                        </ol>
                    </nav>

                    <Filter_LeftFilterPanel />
                    <Filter_RightImagePart />



                </div>
            </section>
        </>
    )
}

export default FilterPage