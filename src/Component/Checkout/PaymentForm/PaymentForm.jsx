import React from "react";
import Review from "./Review";
import { Typography, Divider } from "@mui/material";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIBE_PUBLIC_KEY);
const stripePromise = loadStripe(
  "pk_test_51LLiHLJIpx4vRHkepoPI3zmdZZTazSEXnHvUp6wgf2bXpSm9fMaLIfWPSrRh98WCBhzZOhD2M99KxUR0LGBPHmky00nFsy08Jn"
);

const PaymentForm = ({ shippingData, checkoutToken, prev, next, onCaptureCheckout}) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
    // const paymentMethod  = await stripe.createPaymentMethod({
      
      type: "card",
      card: cardElement,
    });

    console.log({paymentMethod});
    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(error);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstname,
          lastname: shippingData.lastname,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: {shipping_method:shippingData.shippingOption},
        payment:{
          gateway:"stripe",
          stripe:{
            payment_method_id:paymentMethod.id
          }
        },

      };
      onCaptureCheckout(checkoutToken.id, orderData)
      next()
    }
  };
  return (
    <div>
      <Review shippingData={shippingData} checkoutToken={checkoutToken} />
      <Divider />
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <form
              onSubmit={(e) => {
                handleSubmit(e, elements, stripe);
              }}
            >
              <div className="px-10">
                <CardElement />
              </div>
              <div className="flex justify-between p-10">
                <button
                  className="text-white outline-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={() => {
                    prev();
                  }}
                >
                  Back
                </button>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit"
                  disabled={!stripe}
                >
                  Pay ${checkoutToken?.live.subtotal.raw}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;
