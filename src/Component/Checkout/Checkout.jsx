import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from "../Navbar/Navbar";
import { Paper } from "@mui/material";
import { useState } from "react";
import AddressForm from "./AddressForm/AddressForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import { useEffect } from "react";
import { commerce } from "../../lib/commerce";
import { useDispatch, useSelector } from "react-redux";
import { setCartList } from "../../Redux/Slice/ecommerceSlice";

function Checkout() {
  const dispatch = useDispatch()

  const { cartList } = useSelector((state) => state.quantityReducer);
  console.log({ cartList });
  const [activeStep, setActiveStep] = useState(0);
  const [order, setOrder] = useState({})
  const steps = ["Shipping Adress", "Payment Detail"];

  const [checkoutToken, setCheckoutToken] = useState(null);

  const [shippingData, setShippingData] = useState({});
  console.log({shippingData});
  //next and prev button
  const next = () => {
    setActiveStep((prev) => prev + 1);
  };
  const prev = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleNext = (data)=>{
    setShippingData(data)
    next()
  }

  const refreshCart = async ()=>{
    const newCart = await commerce.cart.refresh()

    dispatch(setCartList(newCart))
  }

  const handleCaptureCheckout = async (checkoutTokenID, newOrder)=>{
      try {
        const incomingOrder = await commerce.checkout.capture(checkoutTokenID,newOrder)

        setOrder(incomingOrder)
        refreshCart()
      } catch (error) {
        console.log(error)
      }
  }
  
  useEffect(() => {
    async function createToken() {
      try {
        const token = await commerce.checkout.generateToken(cartList.id, {
          type: "cart",
        });
        console.log({ token });
        setCheckoutToken(token);
      } catch (err) {
        console.log({ err });
      }
    }
    createToken();
  }, []);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
      handleNext={handleNext}
        checkoutToken={checkoutToken}
      />
    ) : (
      <PaymentForm next={next} shippingData={shippingData} onCaptureCheckout={handleCaptureCheckout} checkoutToken={checkoutToken} prev={prev} />
    );

  const Confirmation = () => <div>Your process is complete</div>;
  return (
    <div>
      <Navbar />
      <div className="flex  justify-center items-center">
        <Paper elevation={10} style={{ width: 500 }}>
          <Stepper activeStep={activeStep} style={{ fontSize: 20 }}>
            {steps.map((step, index) => {
              return (
                <Step key={step} style={{ fontSize: 20 }}>
                  <StepLabel style={{ fontSize: 40 }}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </div>
    </div>
  );
}

export default Checkout;
