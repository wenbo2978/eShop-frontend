import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Category from "./components/Category/Category";
import Category2 from "./components/Category/Category2";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import Partners from "./components/Partners/Partners.jsx";

import headphone from "./assets/hero/headphone.png";
import smartwatch2 from "./assets/category/smartwatch2-removebg-preview.png";

import Products from "./components/Products/Products";
import Blogs from "./components/Blogs/Blogs";
import Footer from "./components/Footer/Footer.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductsList from "./pages/ProductsList.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import UserContextProvider from "./contexts/UserContexts.jsx";
import Profile from "./pages/Profile.jsx";

const App = () => {
  //console.log('222222222');
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <UserContextProvider>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
        <BrowserRouter>
          <Navbar handleOrderPopup={handleOrderPopup} />
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/product-detail/:id" element={<ProductDetail/>}/>
            <Route path="/product-list" element={<ProductsList/>}/>
            <Route path="/place-order" element={<PlaceOrder/>}/>
            <Route path="/add-product" element={<AddProduct/>} />
            <Route path="/update-product/:id" element={<UpdateProduct/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
          <Partners />
          <Footer />
        </BrowserRouter>
      </div>
    </UserContextProvider>
  );
};

export default App;
