import React from "react";
import Typography from "@material-ui/core/Typography";
import { CardElement } from "@stripe/react-stripe-js";
import Axios from "axios";
import { Button } from "@material-ui/core";

export default function PaymentForm() {
  const handlePayment = () => {
    Axios.post("/payment").then(({ data }) => console.log(data));
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Button onClick={handlePayment}>Test</Button>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
    </>
  );
}
