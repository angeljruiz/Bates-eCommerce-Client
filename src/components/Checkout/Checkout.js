import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { Alert } from "@material-ui/lab";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  alert: {
    width: "100%",
  },
}));

const steps = ["Review your order", "Shipping address", "Payment details"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Review />;
    case 1:
      return <AddressForm />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error("Unknown step");
  }
}

const validationSchema = Yup.object().shape({
  fn: Yup.string().required().min(2).label("First Name"),
  ln: Yup.string().required().min(2).label("Last Name"),
  line1: Yup.string().required().min(1).label("Address Line 1"),
  city: Yup.string().required().label("City"),
  state: Yup.string().required().label("State"),
  postal_code: Yup.string().required().length(5).label("ZIP Code"),
});

export default function Checkout() {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart.products);
  const [error, setError] = useState();
  const [activeStep, setActiveStep] = useState(id ? steps.length : 0);
  const [disabled, setDisabled] = useState(true);
  const classes = useStyles();
  const paymentCheck = activeStep === steps.length - 1;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePayment = (formData, setSubmitting) => {
    setDisabled(true);
    Axios.post("/payment", cart)
      .then(async ({ data }) => {
        if (!stripe || !elements) {
          return;
        }
        const result = await stripe.confirmCardPayment(data, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${formData.fn} ${formData.ln}`,
            },
          },
        });
        if (result.error) {
          setError(result.error.message);
          setSubmitting(false);
          setDisabled(false);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            formData.cart = JSON.stringify(cart);
            formData.date = new Date().toISOString();
            formData.id = uuid().split("-").slice(0, 2).join("");
            Axios.post("/order", formData).then(({ data }) => {
              window.location.href = `/checkout/${data.id}`;
            });
          }
        }
      })
      .catch((e) => {
        setError(e);
        setSubmitting(false);
        setDisabled(false);
      });
  };

  useEffect(() => {
    if (elements) {
      let cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.on("change", (event) => {
          if (event.complete) {
            setDisabled(false);
          } else setDisabled(true);
        });
      }
    }
  }, [paymentCheck, elements]);

  const handleStep = (data, { setSubmitting }) => {
    if (paymentCheck) handlePayment(data, setSubmitting);
    else {
      handleNext();
      setSubmitting(false);
    }
  };

  return (
    <Formik
      onSubmit={handleStep}
      initialValues={{}}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <Container className={classes.layout}>
            <Paper className={classes.paper}>
              {error && (
                <Alert severity="error" className={classes.alert}>
                  {error}
                </Alert>
              )}
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper
                activeStep={activeStep}
                className={classes.stepper}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <>
                {activeStep === steps.length ? (
                  <>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order id is #{id}. We have emailed your order
                      confirmation, and will send you an update when your order
                      has shipped.
                    </Typography>
                  </>
                ) : (
                  <>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      {activeStep === 0 && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={`${classes.button} paypal-logo`}
                        >
                          Continue
                        </Button>
                      )}
                      {activeStep !== 0 && (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.button}
                          disabled={
                            activeStep === steps.length - 1
                              ? disabled || isSubmitting
                              : false
                          }
                        >
                          {activeStep === steps.length - 1
                            ? "Place order"
                            : "Continue"}
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </>
            </Paper>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
