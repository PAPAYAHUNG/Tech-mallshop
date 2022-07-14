import React, { useEffect, useState } from "react";
import { Navbar, Loading, Products } from "../../Component/index";
import { commerce } from "../../lib/commerce";
import { useSelector, useDispatch } from "react-redux";
import { setCartList, setIsloading } from "../../Redux/Slice/ecommerceSlice";
import { Outlet, Route, Routes } from "react-router-dom";
function Home() {
  const { isLoading } = useSelector((state) => state.quantityReducer);
  const dispatch = useDispatch();

  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);

  // console.log({ productList });
  // console.log({ cart });
  const fetchProduct = async () => {
    try {
      const { data } = await commerce.products.list();
      setProductList(data);
    } catch (err) {}
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
    dispatch(setCartList(cart));
  };

  const handleAddtoCart = async (id, qty) => {
    dispatch(setIsloading());
    const cartAdd = await commerce.cart.add(id, qty);
    console.log({ cartAdd });
    await fetchCart();
    dispatch(setIsloading());
  };

  const handleEmptyCard = async () => {
    dispatch(setIsloading());
    const cart = await commerce.cart.empty();
    // setCart(cart);
    await fetchCart();
    dispatch(setIsloading());
  };

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);

  return (
    <div className="Home">
      {isLoading && <Loading />}
   
      <Navbar cart={cart} handleAddtoCart={handleAddtoCart} handleEmptyCard={handleEmptyCard} />
      <Products
        productList={productList}
        cart={cart}
        handleAddtoCart={handleAddtoCart}
      />
      {/* <Outlet/> */}
    </div>
  );
}

export default Home;
