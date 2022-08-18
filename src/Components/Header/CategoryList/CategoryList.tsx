import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../store/storeHooks'
import { CategoryListTypes } from '../../../types/categoryListTypes'

type Props = {
    listMenuBar: (state: boolean) => void
}

const CategoryList = (props: Props) => {
    const hideList = props.listMenuBar;

    // const { categorySlug } = useParams();
    // console.log("categorySlug--->", categorySlug)

    //for all category list
    const categoryList: CategoryListTypes = useAppSelector((abc) => abc.categoryListDetails)
    // console.log("categoryList==>", categoryList)

    const menuBarActive: any = useAppSelector((a) => a.menuBarActiveClassDetails)
    // console.log("menuBarActive--->", menuBarActive)

    const closeMenuBar = () => {
        hideList(false)
        // window.location.reload();
    }



    return (
        <>
            {/* <h5>{menuBarActive._id}</h5> */}
            <div className="navigation active">
                <div className="menu-wrapper">
                    <div style={{
                        position: "relative",
                        // overflow: "hidden",
                        width: "100%",
                        height: "100%",
                        maxWidth: "360px"
                    }}>

                        <div style={{
                            // position: "absolute",
                            inset: "0px",
                            overflow: "scroll",
                            marginRight: "-15px",
                            marginBottom: "-15px"
                        }}>
                            <ul className="category-list">

                                {
                                    categoryList ? categoryList.map((items, index) => {
                                        // console.log("dfsdfsd", menuBarActive)
                                        // console.log("items", items._id)
                                        return (

                                            <Link to={`/category/${items.slug}`}
                                                style={{
                                                    paddingTop: "16px",
                                                    paddingRight: "80px",
                                                    // paddingLeft: "60px",
                                                    paddingBottom: "15px",
                                                    fontWeight: "700"
                                                }}
                                                key={index}

                                                // for active class on category list dropdown menu
                                                className={
                                                    (menuBarActive.id == items._id)
                                                        ?
                                                        "category-list-Name activeList"
                                                        :
                                                        "category-list-Name"
                                                }
                                                onClick={closeMenuBar}

                                            >

                                                {items.name}

                                            </Link>
                                        )
                                    }) : null
                                }


                            </ul>
                        </div>
                        <div style={{
                            position: "absolute",
                            height: "6px",
                            right: "2px",
                            bottom: "2px",
                            left: "2px",
                            borderRadius: "3px"
                        }}>
                            <div
                                style={{
                                    position: "relative",
                                    display: "block",
                                    height: "100%",
                                    cursor: "pointer",
                                    borderRadius: "inherit",
                                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    width: "0px"
                                }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryList