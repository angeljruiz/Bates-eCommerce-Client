import React from "react";
import Typography from "@material-ui/core/Typography";
import { CardElement } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
}));

export default function PaymentForm() {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.header} variant="h6" gutterBottom>
        Payment method
      </Typography>
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
