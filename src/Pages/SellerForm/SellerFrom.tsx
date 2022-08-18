import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import CompanyFrom from '../../Components/SellerFrom/CompanyFrom';
import FreelancerForm from '../../Components/SellerFrom/FreelancerForm';

const SellerFrom = () => {
    return (
        <>
            <div>
                <section className="become-seller">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="/">Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Become an Aladyyn Seller
                                </li>
                            </ol>
                        </nav>
                        <div className="section-header">
                            <h1>Become an Aladyyn Seller</h1>
                            {/* <div className="btn-wrap">
                                <a className="btn" href="/seller-sign">
                                    Seller panel login
                                </a>
                            </div> */}
                        </div>


                        <Tabs defaultActiveKey="company" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="company" title="Company">
                                <CompanyFrom />
                            </Tab>
                            <Tab eventKey="freelancer" title="Freelancer">
                                <FreelancerForm />
                            </Tab>

                        </Tabs>
                    </div>
                </section>
            </div>
        </>
    )
}

export default SellerFrom