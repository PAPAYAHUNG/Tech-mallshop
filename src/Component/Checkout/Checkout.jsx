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

function Checkout() {
    const [activeStep, setActiveStep] = useState(1)
  const steps = ["Shipping Adress", "Payment Detail"];
  return (
    <div>
        {/* <Navbar /> */}
      <div className="flex justify-center p-10">
        <Paper  elevation={10} style={{ width: 500 }}>
          <Stepper activeStep={activeStep} style={{fontSize:20}}>
            {steps.map((step, index) => {
              return (
                <Step key={step} style={{fontSize:20}}>
                  <StepLabel style={{fontSize:40}}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Paper>
      </div>
    </div>
  );
}

export default Checkout;
