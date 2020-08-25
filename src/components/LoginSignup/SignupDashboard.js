import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  Button,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import * as Yup from "yup";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Form, Field, Formik } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { useDispatch } from "react-redux";
import { init } from "../../actions/accountActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  alert: {
    width: "100%",
  },
}));

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().min(2).label("First Name"),
  lastName: Yup.string().required().min(2).label("Last Name"),
  storeName: Yup.string()
    .required()
    .min(4)
    .matches(/^[\w\s]*$/, "Store name cannot have special characters")
    .label("Store Name"),
});

export default function SignupDashboard() {
  const [error, setError] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignup = (body, { setSubmitting }) => {
    axios.defaults.baseURL = "/";

    axios
      .post("/signup", body)
      .then(async ({ data: { token } }) => {
        const bearer = "Bearer " + token;
        axios.defaults.headers.common["Authorization"] = bearer;
        axios.defaults.withCredentials = true;
        axios.defaults.credentials = "include";
        localStorage.setItem("token", bearer);
        axios.get("/account").then((res) => {
          dispatch(init(res.data));
          history.push(`/${body.storeUrl}`);
        });
      })
      .catch(() => {
        setSubmitting(false);
        setError("Error. Email or store name already being used!");
        setTimeout(() => {
          setError(null);
        }, 2500);
      });
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        storeName: "",
        storeUrl: "",
      }}
      onSubmit={handleSignup}
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (
        <Form
          onChange={(e) => {
            if (e.target.id === "storeName")
              setFieldValue("storeUrl", e.target.value.replace(/\s/g, "_"));
          }}
        >
          <Container maxWidth="xs">
            <Paper className={classes.paper}>
              {error && (
                <Alert severity="error" className={classes.alert}>
                  {error}
                </Alert>
              )}
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    autoComplete="given-name"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="storeName"
                    label="Store Name"
                    name="storeName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="storeUrl"
                    label="Store URL"
                    disabled
                    name="storeUrl"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={CheckboxWithLabel}
                    required
                    name="tos"
                    color="primary"
                    type="checkbox"
                    Label={{
                      label: (
                        <>
                          <Typography style={{ display: "inline" }}>
                            I agree to the
                          </Typography>
                          <Button href="#" color="primary">
                            terms of use.
                          </Button>
                        </>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
