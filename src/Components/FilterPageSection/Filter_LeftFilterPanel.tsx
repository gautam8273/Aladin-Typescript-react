import React, { useEffect, useState } from 'react'
import { getLanguageAction } from '../../store/slices/languageSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import { LanguageDataType } from '../../types/languageDataType';
import WorldLocation from '../worldLocation/WorldLocation'

const Filter_LeftFilterPanel = () => {

    const dispatch = useAppDispatch();

    const [lang, setLang] = useState<any>();

    const languageList: LanguageDataType = useAppSelector((a) => a.languageDetails)
    // console.log("languageList--->", languageList)

    //for language
    useEffect(() => {
        dispatch(getLanguageAction())
    }, [dispatch])

    const languageSelect = (items: any) => {
        setLang(items)
    }

    return (
        <>

            <div className="left-block">
                <div className="filters-wrap">
                    <h3>Filters</h3>
                    {/* <form> */}
                    <div className="input-wrap">
                        <label className="input-label">Service Type</label>
                        <div className="contains-checkbox">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="check"
                                    value="Company"
                                />
                                <label className="form-check-label">Companies</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="check1"
                                    value="Freelancer"
                                />
                                <label className="form-check-label">Freelancers</label>
                            </div>
                        </div>
                    </div>


                    <WorldLocation />

                    <div className="input-wrap">
                        <label className="input-label">Distance</label>
                        <div className="multiple-inputs">
                            <div className="wrap-input">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="0 km"
                                />
                            </div>
                            <div className="wrap-input">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="800 km"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-wrap">
                        <label className="input-label">Language</label>
                        <div className="wrap-input">
                            <select
                                className="form-control drop-down"
                                placeholder="input search text"


                            >
                                <option value="">Please select</option>

                                {
                                    languageList
                                        ?
                                        languageList.map((items, index) => {
                                            return (
                                                <option key={index}
                                                    value={lang}
                                                    onChange={() => languageSelect(items)}>{items.name}</option>
                                            )
                                        }) : null
                                }

                                <option value="60817cf559b4452bb1000afd">English</option>
                            </select>

                        </div>
                    </div>
                    <div className="rating-input">
                        <label className="input-label">Ratings</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="rating"
                                id="ratingCheck4"
                                value="4"
                            />
                            <label className="custom-checkbox">
                                <span className="rating-wrap">
                                    <span className="img-wrap">
                                        <img
                                            src="/static/media/rating-4.612684496eb611ffdaa9bf8e03bf0023.svg"
                                            alt="rating"
                                        />
                                    </span>
                                    <span className="text-wrap">&amp; Up</span>
                                </span>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="rating"
                                id="ratingCheck3"
                                value="3"
                            />
                            <label className="custom-checkbox">
                                <span className="rating-wrap">
                                    <span className="img-wrap">
                                        <img
                                            src="/static/media/rating-3.6dd9c635cd5474a49cf9eb9f100323ad.svg"
                                            alt="rating"
                                        />
                                    </span>
                                    <span className="text-wrap">&amp; Up</span>
                                </span>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="rating"
                                id="ratingCheck2"
                                value="2"
                            />
                            <label className="custom-checkbox">
                                <span className="rating-wrap">
                                    <span className="img-wrap">
                                        <img
                                            src="/static/media/rating-2.8b3ee31daeaff6656c7b27c9c3655e80.svg"
                                            alt="rating"
                                        />
                                    </span>
                                    <span className="text-wrap">&amp; Up</span>
                                </span>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="rating"
                                id="ratingCheck1"
                                value="1"
                            />
                            <label className="custom-checkbox">
                                <span className="rating-wrap">
                                    <span className="img-wrap">
                                        <img
                                            src="/static/media/rating-1.ce9231a1402cfcd0a20ad1e7a64e7f08.svg"
                                            alt="rating"
                                        />
                                    </span>
                                    <span className="text-wrap">&amp; Up</span>
                                </span>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div className="input-wrap">
                        <label className="input-label">Price Type</label>
                        <div className="contains-checkbox">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkPrice1"
                                    value="Fixed"
                                />
                                <label className="form-check-label">Fixed</label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkPrice2"
                                    value="Range"
                                />
                                <label className="form-check-label">Hourly Rate</label>
                            </div>
                        </div>
                    </div>
                    <div className="range-slider_wrapper input-wrap">
                        <label className="input-label">Price Range</label>
                        <div>

                        </div>
                        <div className="range-info">
                            <div className="left-box">₹0</div>
                            <div className="right-box">₹1929750.00</div>
                        </div>

                    </div>

                    {/* <Range
                        step={0.1}
                        min={0}
                        max={100}
                        values={[50]}
                        renderTrack={({ children }) => (
                            <div
                                style={{
                                    height: '6px',
                                    width: '100%',
                                    backgroundColor: '#ccc'
                                }}
                            >
                            </div>
                        )}
                        renderThumb={({ }) => (
                            <div
                                style={{
                                    height: '42px',
                                    width: '42px',
                                    backgroundColor: '#999'
                                }}
                            />
                        )}
                    /> */}

                    <div className="btns-wrap">
                        <button type="button" className="secondary-btn">
                            Reset
                        </button>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </>
    )
}

export default Filter_LeftFilterPanel