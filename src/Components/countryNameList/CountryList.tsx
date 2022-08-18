import React from 'react'
import { useAppSelector } from '../../store/storeHooks';
import { CountryListType, CountryData } from '../../types/countryNameType';
// import { countryListNameType } from '../../types/countryNameType';


type Props = {
    countryMenubar: (state: boolean) => void
}

const CountryList = (props: Props) => {

    // const hideCountryListName = props.countryMenubar;
    // console.log("hideCountryListName==>", hideCountryListName)

    //country name list
    const countryList: CountryListType = useAppSelector((abc) => abc.countryNameDetails)
    // console.log("countryList==>", countryList)


    const showCountryName = (item: CountryData) => {
        localStorage.setItem("countryData", JSON.stringify(item));
        window.location.reload();
    }

    return (
        <>
            <ul className="custom-select_options custom-scroll">
                {
                    countryList ? countryList.data.map((item: CountryData, index: number) => {
                        return <li style={{ color: "#000" }}
                            className="custom-select_option" key={index}
                            onClick={() => showCountryName(item)}
                        >{item?.name}</li>
                    }) : null
                }

                {/* <li className='custom-select_option'>India--</li> */}
            </ul>
        </>
    )
}

export default CountryList