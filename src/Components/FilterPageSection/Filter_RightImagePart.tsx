import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCategoryListAction } from '../../store/slices/categoryListSlice'
import { getServicefilterPageAction } from '../../store/slices/getServiceSlice'
import { getSubCategoryAction } from '../../store/slices/subCategorySlice'
import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import { CategoryListTypes } from '../../types/categoryListTypes'
import { SubCategoryType } from '../../types/subCategoryType'
import FilterImageCard from '../Cards/FilterCard/FilterImageCard'
// import filterImageCard from '../Cards/FilterCard/filterImageCard'

const Filter_RightImagePart = () => {

    const dispatch = useAppDispatch();

    const { categorySlug } = useParams();
    const { subCategorySlug } = useParams();
    // console.log("categorySlug-->", categorySlug)
    // console.log("subCategorySlug--->", subCategorySlug)


    // for category id
    const [categoryId, setCategoryId] = useState<string>();
    // console.log("categoryId--->", categoryId)

    // for sub category id
    const [subCategoryId, setSubCategoryId] = useState<string>();
    // console.log("subCategoryId--->", subCategoryId)

    const categoryList: CategoryListTypes = useAppSelector((a) => a.categoryListDetails)
    // console.log("categoryList--->", categoryList)

    const subCategoryList: SubCategoryType = useAppSelector((a) => a.subCategoryDetails)
    // console.log("suCategoryList---->", subCategoryList)

    const filterImageData = useAppSelector((a) => a.getServiceFilterPageDetails)
    // console.log("filterImageData---->", filterImageData)


    //category api
    useEffect(() => {
        dispatch(getCategoryListAction())
    }, [dispatch])

    if (!categoryId) {
        categoryList.forEach(element => {
            if (categorySlug == element.slug) {
                setCategoryId(element._id)
            }
        })
    }


    // for subCategory api
    useEffect(() => {
        if (categoryId) {
            dispatch(getSubCategoryAction(categoryId))
        }
    }, [dispatch, categoryId])


    // for sub category id
    if (!subCategoryId) {
        subCategoryList.forEach(ele => {
            if (subCategorySlug == ele.slug) {
                setSubCategoryId(ele._id)
            }
        })
    }

    // for get service api
    useEffect(() => {
        if (categoryId && subCategoryId) {
            dispatch(getServicefilterPageAction({ categoryId, subCategoryId }))
        }
    }, [dispatch, subCategoryId])

    return (
        <>

            <div className="right-block">
                <div className="head-wrap">
                    {/* <h1>{subCategoryName}</h1> */}
                    <div className="sort-select"><label>Sort by</label>
                        <div className="sort-wrap">
                            <div className="react-select-container css-b62m3t-container"><span id="react-select-2-live-region"
                                className="css-7pg0cj-a11yText"></span><span aria-live="polite" aria-atomic="false"
                                    aria-relevant="additions text" className="css-7pg0cj-a11yText"></span>
                                <div className="react-select__control css-1s2u09g-control">
                                    <div className="react-select__value-container css-1d8n9bt">
                                        <div className="react-select__placeholder css-14el2xx-placeholder"
                                            id="react-select-2-placeholder">Select...</div>
                                        <div className="react-select__input-container css-ackcql"
                                        // data-value=""
                                        ><input
                                                className="react-select__input" autoCapitalize="none" autoComplete="off"
                                                autoCorrect="off" id="react-select-2-input" spellCheck="false"
                                                type="text" aria-autocomplete="list" aria-expanded="false" aria-haspopup="true"
                                                aria-controls="react-select-2-listbox" aria-owns="react-select-2-listbox"
                                                role="combobox" aria-describedby="react-select-2-placeholder"
                                                //  value=""
                                                style=
                                                {{
                                                    color: "inherit",
                                                    background: "0px center",
                                                    opacity: "1",
                                                    width: "100%",
                                                    gridArea: "1 / 2 / auto / auto",
                                                    font: "inherit",
                                                    minWidth: "2px",
                                                    border: "0px",
                                                    margin: "0px",
                                                    outline: "0px",
                                                    padding: "0px"
                                                }} />
                                        </div>
                                    </div>
                                    {/* <div className="react-select__indicators css-1wy0on6">
                                        <span
                                            className="react-select__indicator-separator css-1okebmr-indicatorSeparator"></span>
                                        <select name="cars" id="cars"> Select Price
                                            <option >Price: Low to High</option>
                                            <option>Price: High to Low</option>
                                        </select>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='image_box_filter'>

                    {
                        filterImageData ? filterImageData?.map((items, index) => {
                            // console.log("items--->", items)
                            return (
                                <div key={index} >
                                    <FilterImageCard imageData={items} />
                                </div>
                            )
                        }) : null
                    }

                    {/* <FilterImageCard /> */}

                </div>

            </div>
        </>
    )
}

export default Filter_RightImagePart