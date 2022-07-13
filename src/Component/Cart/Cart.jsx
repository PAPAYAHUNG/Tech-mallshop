import React from "react";
import {useSelector,useDispatch} from 'react-redux'

function Cart({ cart }) {
    const {cartList} = useSelector(state=>state.quantityReducer)
  const dispatch = useDispatch()
    console.log('cart in tab cart', cart)
  return (
    <div className="absolute top-10 right-10 h-screen z-50 bg-gray-800 ">
      <h1>Shopping Cart</h1>
      <div className="p-10">
        olala
        {cart?.line_items?.map((item) => {
        //   return <div className="flex" key={item.id}>
        //   <img src={item.image.url} alt={item.image.url} />
        //   <div>
        //     <h3>{item.product_name}</h3>
        //   </div>
        //   <div>
        //     ${item.price.raw}
        //   </div>
        // </div>
        return <h4>olala</h4>
        })}
      </div>
    </div>
  );
}

export default Cart;
