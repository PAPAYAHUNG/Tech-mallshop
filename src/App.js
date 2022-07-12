import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar/Navbar";
import Products from "./Component/Products/Products";
import { commerce } from "./lib/commerce";
function App() {

   const [productList, setProductList] = useState([])
   const [cart, setCart] = useState([])
   console.log({productList})
   console.log({cart})
  const fetchProduct = async ()=>{
    try{
        const {data} = await commerce.products.list()
        setProductList(data)
    }catch(err){

    }
  }

  const fetchCart = async ()=>{
    const cart = await commerce.cart.retrieve()
    setCart(cart)
  }

  useEffect(()=>{
    fetchProduct()
  },[])

  return (
    <div className="App">
      <Navbar/>
      <Products productList={productList}/>
    </div>
  );
}

export default App;
