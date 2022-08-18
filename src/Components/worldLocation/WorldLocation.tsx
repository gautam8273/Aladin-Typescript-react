import React, { useState } from 'react'
import { worldLocationAction } from '../../store/slices/worldLocationSlice'
import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import { WorldLocationType } from '../../types/WorldLocationType'

const WorldLocation = () => {

    const dispatch = useAppDispatch()

    const worldLocationData: WorldLocationType = useAppSelector((a) => a.worldLocationDetails)
    // console.log("worldLocationdata-->", JSON.stringify(worldLocationData))

    const [locate, setLocate] = useState<any>()

    const locationFind = (e: any) => {
        let val = e.target.value
        setLocate(val)
        dispatch(worldLocationAction(val))
    }

    const locationSelect = (item: WorldLocationType) => {
        setLocate(item)
    }

    return (
        <>
            <div className="input-wrap">
                <label className="input-label">Location</label>
                <div className="wrap-input contains-btn contains-search-input">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="input search text"
                        value={locate}
                        onChange={locationFind}
                    />
                    <div className="btn-wrap">
                        <button type="button">
                            <i className="icon-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="searched-items">
                <ul className="custom-scroll">
                    {
                        worldLocationData
                            ? worldLocationData.map((item, index) => {
                                return (
                                    <li key={index} onClick={() => locationSelect(item)} >{item}</li>
                                )
                            })
                            : null
                    }

                    {/* <li>Indaparapeo, Michoacan, Mexico</li> */}
                </ul>
            </div>
        </>
    )
}

export default WorldLocation