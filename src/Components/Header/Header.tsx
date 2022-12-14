import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { getCategoryListAction } from "../../store/slices/categoryListSlice"
import { countryNameAction } from "../../store/slices/countryNameSlice"
import { getServiceAction } from "../../store/slices/searchBarSlice"
import { userProfileDetailsAction } from "../../store/slices/userProfileSlice"
import { useAppDispatch, useAppSelector } from "../../store/storeHooks"
import { CategoryListTypes } from "../../types/categoryListTypes"
import { CountryData, CountryListType } from "../../types/countryNameType"
// import { countryNameType } from "../../types/countryNameType"
import { UserProfileTypes } from "../../types/UserProfileTypes"
import CountryList from "../countryNameList/CountryList"
import SearchBar from "../SearchBar/SearchBar"
import CategoryList from "./CategoryList/CategoryList"

const Header = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Drop down menu X sign change
    const [changeXsign, setChangeXsign] = useState(true)

    // signout button change to UserProfileDetails
    const [userDetails, setUserDetails] = useState(false)

    //show and hide category list 
    const [showCategoryList, setShowCategoryList] = useState<boolean>(false)

    // country list name show and hide
    const [showCountryName, setShowCountryName] = useState(false)

    // for Search bar
    const [searchItem, setSearchItem] = useState<any>(false)



    let token = JSON.parse(localStorage.getItem("countryData") || "")
    // console.log("token==>", token)
    const [NameCountry, setNameCountry] = useState(token);
    // console.log("NameCountry==>", NameCountry)


    //up and down Country -- ARROW sign
    const [arrow, setArrow] = useState(false)


    //country name list
    // const countryList: CountryListType = useAppSelector((abc) => abc.countryNameDetails)
    // console.log("countryList==>", countryList)

    const userProfileDetails: UserProfileTypes = useAppSelector((abc) => abc.userProfileDetailsAction)
    // console.log("userProfileDetails==>", userProfileDetails)

    useEffect(() => {
        let token = localStorage.getItem("loginData")
        // console.log("token===>", token)
        if (token) {
            dispatch(userProfileDetailsAction())
        }

    }, [dispatch])

    // signout button and user profile detail dropdown
    const userMenuBarHeader = () => {
        setUserDetails(prev => !prev)
    }
    // console.log("userDetails==>", userDetails)

    //logout
    const logOutForm = () => {
        localStorage.removeItem("loginData");

        toast.success("Logout!");
        setTimeout(() =>
            navigate('/')
            , 2000
        )

        setUserDetails(prev => !prev)
    }

    // All category list
    const categoryListShow = () => {
        dispatch(getCategoryListAction())
        setShowCategoryList(x => !x)

        setChangeXsign(y => !y)

    }

    useEffect(() => {

    }, [changeXsign])

    //Country name List
    const countryName = () => {
        setShowCountryName(x => !x)
        setArrow(!arrow)
    }
    useEffect(() => {
        dispatch(countryNameAction())
    }, [dispatch, NameCountry])


    //Search bar
    const searchItems = (e: any) => {
        let val = e.target.value
        setSearchItem(true)
        dispatch(getServiceAction(val))
    }

    return (<>
        <header className="header logged-in">
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
            />
            <div className="primary-header">
                <div className="container">
                    <div className="logo"><a href="/"><img
                        src="data:image/png;base64,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"
                        alt="logo" /></a></div>
                    <div className="search-wrapper" /* style="position: relative;" */
                        style={{
                            zIndex: "1",
                            position: "relative"
                        }}
                    >
                        <form>
                            <div className="input-wrap">
                                <input type="text"
                                    name="searchBar"
                                    className="form-control"
                                    placeholder="Search"
                                    minLength={3}
                                    onChange={searchItems}
                                // value=""
                                />
                                <div className="btn-wrap"><button type="submit" className="btn"><i className="icon-search"></i></button>
                                </div>
                            </div>
                        </form>
                        {
                            searchItem && <SearchBar />
                        }
                        {/* < SearchBar /> */}

                        <div className="searched-items_wrapper " style={{ position: "absolute" }}>
                            {/* <div className={searchItem ? 'searched-items_wrapper active' : 'searched-items_wrapper '}> */}
                            <div className="scroll_searched-items"
                                /* style="position: relative; overflow: hidden; width: 100%; height: 100%;" */>
                                <div
                                   /*  style="position: absolute; inset: 0px; overflow: scroll; margin-right: -15px; margin-bottom: -15px;" */>
                                    <div className="global-searched-items"
                                        /* style="background-color: rgb(255, 255, 255); border: 1px solid rgb(211, 211, 211); width: 100%; position: absolute; z-index: 9999; display: none;" */>
                                    </div>
                                </div>
                                <div
                                    /* style="position: absolute; height: 6px; right: 2px; bottom: 2px; left: 2px; border-radius: 3px;" */>
                                    <div
                                      /*   style="position: relative; display: block; height: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2); width: 0px;" */>
                                    </div>
                                </div>
                                <div
                                   /*  style="position: absolute; width: 6px; right: 2px; bottom: 2px; top: 2px; border-radius: 3px;" */>
                                    <div
                                       /*  style="position: relative; display: block; width: 100%; cursor: pointer; border-radius: inherit; background-color: rgba(0, 0, 0, 0.2);" */>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="header-right">
                        <div className="cart-wrap">
                            <a href="/user/cart"><i className="icon-cart"></i>
                                <div className="item-counter">0</div>
                            </a>
                        </div>
                        <div className="notification-wrap">
                            <a href="/"><i className="icon-mail"></i>
                                <div className="item-counter">0</div>
                            </a>
                        </div>


                        {
                            localStorage.getItem("loginData")
                                ?
                                <div className="profile-dropdown">
                                    <div className="show dropdown">
                                        <button aria-expanded="true"
                                            type="button"
                                            className="dropdown-toggle btn btn-primary"
                                            onClick={userMenuBarHeader}
                                        // onClick={() => setUserDetails(prev => !prev)}
                                        // userDetailsmenuBar={setUserDetails}
                                        >
                                            {userProfileDetails[0]?.firstName}
                                        </button>
                                        {
                                            userDetails
                                                ?
                                                <div x-placement="bottom-end" aria-labelledby="" className="dropdown-menu show dropdown-menu-end"
                                                    data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end"
                                                    style={{
                                                        position: "absolute",
                                                        inset: "0px 0px auto auto",
                                                        transform: "translate(0px, 42px)"
                                                    }}>
                                                    <Link
                                                        to={`/user/dashboard`}
                                                        data-rr-ui-dropdown-item=""
                                                        className="dropdown-item"
                                                        role="button"
                                                        // tabIndex="0"
                                                        onClick={userMenuBarHeader}
                                                    >
                                                        Your Account
                                                    </Link>
                                                    <a href="#"
                                                        data-rr-ui-dropdown-item=""
                                                        className="dropdown-item"
                                                        role="button"
                                                        //  tabIndex="0"
                                                        onClick={userMenuBarHeader}
                                                    >Notifications</a>
                                                    <a
                                                        data-rr-ui-dropdown-item=""
                                                        className="dropdown-item"
                                                        onClick={userMenuBarHeader}
                                                    >My Wishlist</a>
                                                    <a href="#"
                                                        data-rr-ui-dropdown-item=""
                                                        className="dropdown-item" role="button"
                                                        // tabIndex="0"
                                                        onClick={logOutForm}
                                                    >Sign Out</a></div>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                :
                                <div className="signin-btn">
                                    <Link to={'/sign-in'} className="btn">Sign In</Link>
                                </div>
                        }




                    </div>
                </div>
            </div>

            <div className="secondary-header">
                <div className="container">
                    <div className="header-left">
                        <button type="button"
                            onClick={categoryListShow}

                            className={changeXsign ? "menu-btn" : "menu-btn active"}
                        >
                            <div className="ham-burger"><span className="line"></span><span className="line"></span><span
                                className="line"></span></div>
                            <div className="text-wrap">All Categories</div>
                        </button>

                        {
                            showCategoryList && <CategoryList listMenuBar={setShowCategoryList} />
                        }
                    </div>
                    <nav className="nav">
                        <ul className="w-100">
                            <li><a href="/customer-service">Customer Service</a></li>
                            <li><a href="/best-seller">Best Sellers</a></li>
                            <li><Link to={`/become-seller-form`}>Become a Seller</Link ></li>
                        </ul>
                    </nav>

                    {/* Show Country  Name */}
                    <div className="country-select">
                        <div className="custom-select">

                            <div className="custom-select_header"
                                onClick={countryName}>
                                {
                                    NameCountry
                                        ?
                                        <span style={{ color: "white", marginRight: "15px" }}>{NameCountry?.name} ||
                                            {NameCountry?.currency}</span>
                                        :
                                        null
                                }


                                <i className="icon-location"></i>
                                {/* <i className="icon-down"></i> */}
                                <i className={arrow ? "icon-down" : "icon-down showing-options"}></i>
                                {/* <i className={`icon-down ${arrow ? " showing-options" : ""}`}></i> */}
                                {
                                    showCountryName && <CountryList countryMenubar={setNameCountry} />
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>
    )
}
export default Header