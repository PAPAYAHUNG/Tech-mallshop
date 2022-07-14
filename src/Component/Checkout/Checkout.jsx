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
import { useSelector } from "react-redux";

function Checkout() {
  const { cartList } = useSelector((state) => state.quantityReducer);
  console.log({ cartList });
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Shipping Adress", "Payment Detail"];

  const [checkoutToken, setCheckoutToken] = useState(null)

  useEffect(() => {
    async function createToken() {
      try {
        const token = await commerce.checkout.generateToken(cartList.id, {
          type: "cart",
        });
        console.log({ token });
        setCheckoutToken(token)
      } catch (err) {
        console.log({ err });
      }
    }
    createToken();
  }, []);

  const Form = () => (activeStep === 0 ? <AddressForm setActiveStep={setActiveStep} checkoutToken={checkoutToken}/> : <PaymentForm />);


  const Confirmation = () => <div>Your process is complete</div>;
  return (
    <div>
      {/* <Navbar /> */}
      <div className="flex h-screen justify-center items-center">
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
