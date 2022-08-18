import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCategoryListAction } from '../../store/slices/categoryListSlice'
import { menuBarActiveClassAction } from '../../store/slices/menuBarActiveClassSlice'
import { getSubCategoryAction } from '../../store/slices/subCategorySlice'
import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import { CategoryListTypes } from '../../types/categoryListTypes'
import { SubCategoryType } from '../../types/subCategoryType'


const CategoryPage = () => {

    const dispatch = useAppDispatch()

    const { categorySlug } = useParams();
    // console.log("categorySlug---->", categorySlug) 

    //for all category list
    const categoryList: CategoryListTypes = useAppSelector((abc) => abc.categoryListDetails)
    // console.log("categoryList==>", categoryList);

    // form Sub Category Data
    const subCategory: SubCategoryType = useAppSelector((a) => a.subCategoryDetails)
    // console.log("subCategory--->", subCategory)

    // for sub category api
    const [catId, setCatId] = useState<string>();
    // console.log("catId----->", catId)

    // for Category name
    const [catName, setCatName] = useState<string>();
    // console.log("catName--->", catName)

    // for all category
    useEffect(() => {
        dispatch(getCategoryListAction())
    }, [dispatch])


    // useEffect(() => {
    //     setCatId("");
    //     setCatName("")
    // }, [categorySlug])


    // for SUB CATEGORY ID-------start
    if (!catId) {
        categoryList.forEach(ele => {
            // console.log("ele====>", ele)
            if (categorySlug === ele.slug) {
                setCatId(ele._id)
                setCatName(ele.name)
            }
        })
    }

    useEffect(() => {
        if (catId) {
            dispatch(getSubCategoryAction(catId))
        }
    }, [dispatch, catId])

    // for active menu bar list
    useEffect(() => {
        // console.log(catId)
        if (catId) {
            dispatch(menuBarActiveClassAction(catId))
        }
    }, [dispatch, catId])



    const categoryItemId = (categoryID: any) => {
        getSubCategoryAction(categoryID)
    }


    return (
        <section className="category-block">
            <div className="container">
                <div className="categories">
                    <ul style={{ paddingLeft: "0px" }}>
                        {
                            categoryList ? categoryList.map((items, index: number) => {
                                return (
                                    <li key={index}
                                        onClick={() => { categoryItemId(items._id) }}
                                        className={(catName == items.name)
                                            ?
                                            "categoryListName active"
                                            :
                                            "categoryListName"
                                        }
                                    // className={(catName == items.name) ? "categoryListName active" : "categoryListName"}
                                    >
                                        <Link to={`/category/${items.slug}`}
                                        >
                                            {items.name}
                                        </Link>

                                    </li>
                                )
                            }) : null
                        }
                    </ul>
                </div>


                <div className="particular-category">
                    {/* use of params */}
                    <h1>{catName}</h1>
                    <div className='service-block-first'  >

                        {
                            subCategory ? subCategory.map((items, index) => {
                                return (
                                    <div className="services-block" key={index} >

                                        <div className="service-wrap">
                                            <Link to={`/category/particular/${categorySlug}/${items.slug}`}  >
                                                <div className="img-wrap"><img
                                                    src={items.path + items.subcategoryIcon}
                                                    alt="service" /></div>
                                                <div className="service-info">{items.name}</div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }) : null
                        }
                    </div>


                    <nav className="pagination-wrap" aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item previous disabled"><a className="page-link" href="#"
                            ><i className="icon-arrow"></i></a></li>
                            <li className="page-item active" aria-current="page"><a className="page-link"
                                href="#">1</a></li>
                            <li className="page-item  disabled"><a className="page-link" href="#"><i
                                className="icon-arrow"></i></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    )
}

export default CategoryPage