import React, { useEffect, useState } from "react";
import { Navbar, Loading, Products } from "./Component/index";
import { commerce } from "./lib/commerce";
import { useSelector, useDispatch } from "react-redux";
import { setCartList, setIsloading } from "./Redux/Slice/ecommerceSlice";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Checkout from "./Component/Checkout/Checkout";
function App() {


  return (
    <div className="App">
      
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
           

         
      </Routes>
    </div>
  );
}

export default App;
