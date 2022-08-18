import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { HomePageType } from '../../types/HomePageTypes'
import Categorycard from '../Cards/Categorycard'

const CoreServices = () => {



    return (
        <section className="core-services">
            <div className="container">
                <div className='service-block-first'  >
                    <h2>Our Core Services</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.</p>


                    <Categorycard />

                    {/* <div className="services-block">
                <div className="service-wrap"><a href="/category/61ee6e45a6c42d1621bb52e0/Sustainability">
                    <div className="img-wrap"><img
                        src=""
                        alt="service" /></div>
                    <div className="service-info">Sustainability</div>
                </a></div>
            </div> */}
                </div>
            </div>
        </section>
    )
}

export default CoreServices