import { Typography } from "@mui/material";
import React from "react";

function Review({ shippingData, checkoutToken }) {
  return (
    <div className="p-10">
      <Typography variant="h5">Order Summary</Typography>
      {checkoutToken?.live.line_items.map((product) => {
        return (
            product.quantity!==0 && (<div key={product.name} className="flex justify-between mt-4">
            <div>
              <Typography variant="h5">{product.name}</Typography>
              <Typography style={{ color: "gray" }} variant="body1">
                Quantity: {product.quantity}
              </Typography>
            </div>
            <div>
              <Typography style={{ color: "gray" }} variant="h5">
                ${product?.price.raw}
              </Typography>
            </div>
          </div>)
          
        );
      })}

      <div className="mt-5">
        <Typography variant="h5">Total</Typography>
        <Typography style={{ color: "gray" }} variant="h4">
          ${checkoutToken?.live.subtotal.raw}
        </Typography>
      </div>
    </div>
  );
}

export default Review;
