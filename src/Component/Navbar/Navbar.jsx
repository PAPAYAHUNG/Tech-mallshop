import React from "react";
import logo from "../../Asset/png-logo-design-transparent-logo-design-images-489321.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import style from "./Navbar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../Cart/Cart";
import { setIsOpenCart } from "../../Redux/Slice/ecommerceSlice";
import { useLocation } from "react-router-dom";

function Navbar({handleAddtoCart,handleEmptyCard}) {
  const { isOpenCart,cartList } = useSelector((state) => state.quantityReducer);
  const dispatch = useDispatch();
  const location = useLocation()
  console.log({location});
  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" style={{ width: 60, marginRight: 10 }} />
          <h2 style={{ fontWeight: "bold" }}>Mall Shop</h2>
        </div>
        {
          location.pathname!=='/checkout' && (
            <div
          className={style.navbar}
          style={{ position: "relative", padding: 10, borderRadius: "50%" }}
        >
          <button
            onClick={() => {
              dispatch(setIsOpenCart());
            }}
          >
            <AddShoppingCartIcon style={{ fontSize: 34 }} />
          </button>
          <span
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            {cartList?.total_items}
          </span>
        </div>
          )

        }
        
      </div>
      <div>{isOpenCart && <Cart handleEmptyCard={handleEmptyCard} handleAddtoCart={handleAddtoCart} />}</div>
    </div>
  );
}

export default Navbar;
