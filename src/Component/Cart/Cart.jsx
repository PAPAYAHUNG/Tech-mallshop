import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenCart } from "../../Redux/Slice/ecommerceSlice";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import EmptyCart from "./EmptyCart";

function Cart({ cart, handleAddtoCart, handleEmptyCard }) {
  const { cartList } = useSelector((state) => state.quantityReducer);
  const dispatch = useDispatch();
  console.log("cart in tab cart", cartList);

  const isEmptyCart = !cartList.line_items.length;

  const FilledCart = () => (
    <>
      <div className="p-10 pb-5 ">
        {cartList?.line_items?.map((item) => {
          return (
            <div
              className="flex p-2 py-5 border-b-2 border-indigo-500"
              key={item.id}
            >
              <img
                className="rounded mr-3"
                style={{ width: 120, objectFit: "cover" }}
                src={item.image.url}
                alt={item.image.url}
              />
              <div className="flex-1 justify-start">
                <div>
                  <h3 className="font-bold">{item.product_name}</h3>
                </div>
                <div className="flex justify-between">
                  <span>Quantity </span>
                  <div className="flex items-center">
                    <Button
                      style={{ fontSize: 15, fontWeight: 700, minWidth: 40 }}
                      size="small"
                      variant="outlined"
                      color="success"
                      // onClick={()=>{
                      //     dispatch(increment())}
                      // }
                      onClick={() => {
                        handleAddtoCart(item.product_id, 1);
                      }}
                    >
                      +
                    </Button>
                    <span className="mx-3 font-bold">{item.quantity}</span>

                    <Button
                      style={{ fontSize: 15, fontWeight: 700, minWidth: 40 }}
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        if (item.quantity < 0) {
                          alert("Quantity as least 0");
                        } else {
                          // console.log('im clicked')
                          // dispatch(decrement())}

                          handleAddtoCart(item.product_id, -1);
                        }
                      }}
                    >
                      -
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Price </span>
                  <span className="text-gray-900 font-semibold">
                    ${item.price.raw}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between p-10">
        <span>Total </span>
        <div className="  text-2xl font-bold text-red-700">
          {cartList?.line_items?.reduce((acc, item, index) => {
            return (acc += item.quantity * item.price.raw);
          }, 0)}
        </div>
      </div>

      <div className=" flex justify-between p-10">
        <button
          className="p-5 text-right bg-red-500 rounded-2xl"
          onClick={() => {
            // dispatch(setIsOpenCart());
            handleEmptyCard()
          }}
        >
          Clear up
        </button>
        <button
          className="p-5 text-right bg-indigo-500 rounded-2xl"
          onClick={() => {
            dispatch(setIsOpenCart());
          }}
        >
          Checkout
        </button>
      </div>
    </>
  );
  return (
    <div
      style={{ width: 500 }}
      className="absolute rounded-2xl top-20 right-10 bg-gray-200 z-50 dark:bg-gray-800 "
    >
      <div className="flex justify-between items-center">
        <h4 className="text-left text-5xl pt-5 ml-10 ">Shopping Cart</h4>
        <button
          className="mr-5"
          onClick={() => {
            dispatch(setIsOpenCart());
          }}
        >
          <CancelIcon style={{ fontSize: 30, marginLeft: 30 }} />
        </button>
      </div>
      {isEmptyCart ? <EmptyCart /> : <FilledCart />}
    </div>
  );
}

export default Cart;
