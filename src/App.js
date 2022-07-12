import React, { useEffect, useState } from "react";
import Navbar from "./Component/Navbar/Navbar";
import Products from "./Component/Products/Products";
import { commerce } from "./lib/commerce";
function App() {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  console.log({ productList });
  console.log({ cart });
  const fetchProduct = async () => {
    try {
      const { data } = await commerce.products.list();
      setProductList(data);
    } catch (err) {}
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddtoCart =async (id) => {
    const cartAdd = await commerce.cart.add(id, 1)
    console.log({cartAdd})

  };

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Products productList={productList} handleAddtoCart={handleAddtoCart} />
    </div>
  );
}

export default App;
