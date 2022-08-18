import React from 'react';
import './App.css';
import "./assets/scss/main.scss";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import Header from './Components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePageData from './Pages/HomePageData/HomePageData';
import Footer from './Components/Footer/Footer';
import SignInForm from './Pages/signInForm/SignInForm';
import CreateAccount from './Pages/createAccount/CreateAccount';
import YourAccount from './Pages/UserDashBorad/YourAccount';
import CategoryPage from './Pages/categoryPage/CategoryPage';
import FilterPage from './Pages/FilterPage/FilterPage';
import SellerFrom from './Pages/SellerForm/SellerFrom';
import ServiceDetails from './Pages/serviceDetails/ServiceDetails';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePageData />} />
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/user/dashboard' element={<YourAccount />} />
          <Route path='/category/:categorySlug' element={<CategoryPage />} />
          <Route path='/category/particular/:categorySlug/:subCategorySlug' element={<FilterPage />} />
          <Route path='become-seller-form' element={<SellerFrom />} />
          <Route path='/service-detail/:serviceId/:selllerName' element={<ServiceDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
