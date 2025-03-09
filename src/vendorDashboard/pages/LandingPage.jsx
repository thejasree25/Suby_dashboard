import React, { useState, useEffect } from 'react';
import { useActionData } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from "../components/forms/AddProduct";
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle,setShowFirmTitle]=useState(true);
  // ✅ Run only once on mount
  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogOut(true);
      //setShowWelcome(true); // ✅ Show Welcome page if user is logged in
    }
  }, []); 
  useEffect(()=>{
    const firmName=localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false);
    }
  },[])
  const logOutHandler = () => {
    confirm("Are You Sure to logOut")
    localStorage.removeItem("loginToken");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");
    setShowLogOut(false);
    //setShowWelcome(false); // ✅ Hide Welcome page on logout
    setShowFirmTitle(true);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const showFirmHandler = () => {
    if(showLogOut){
    setShowFirm(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    }
    else{
      alert("please login");
      setShowLogin(true);
    }
  };

  const showProductHandler = () => {
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(true);
    setShowWelcome(false);
    setShowAllProducts(false);
    }
    else{
      alert("please login");
      setShowLogin(true);
    }
  };

  const showAllProductsHandler = () => {
    // console.log("All Products Handler Called");
    if(showLogOut){
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(true);
    }
    else{
      alert("please login");
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = () => {
    console.log("Welcome Handler Called");
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(true);
    setShowAllProducts(false);
  };

  return (
    <>
      <section className="landingSection">
        <NavBar 
          showLoginHandler={showLoginHandler} 
          showRegisterHandler={showRegisterHandler} 
          showLogOut={showLogOut} 
          logOutHandler={logOutHandler} 
        />
        <div className="collectionSection">
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle} 
          />
          {showFirm && showLogOut  && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts &&  showLogOut && <AllProducts />}
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
        </div>
      </section>
    </>
  );
};
export default LandingPage;