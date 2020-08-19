import React from "react";
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
import axios from "axios";

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
}));

export default function SignupDashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignup = (body) => {
    axios.post("/signup", body).then(({ data: { token } }) => {
      const bearer = "Bearer " + token;
      axios.defaults.headers.common["Authorization"] = bearer;
      localStorage.setItem("token", bearer);
      dispatch(init({ email: body.email }));
      history.push("/");
    });
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSignup}
    >
      {() => (
        <Form>
          <Container maxWidth="xs">
            <Paper className={classes.paper}>
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
                    autoComplete="fname"
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
                    autoComplete="lname"
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
