import React from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Container,
  Avatar,
  Typography,
  Button,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import GoogleLogin from "react-google-login";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, Form, Field } from "formik";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },

  facebook: {
    backgroundColor: "rgb(51, 120, 234)",
    color: "white",
    marginBottom: theme.spacing(1),
  },
  google: {
    backgroundColor: "rgb(210, 78, 62)",
    color: "white",
    marginBottom: theme.spacing(1),
  },
}));

export default function LoginDashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (body) => {
    axios.post("/login", body).then(({ data: { token } }) => {
      const bearer = "Bearer " + token;
      axios.defaults.headers.common["Authorization"] = bearer;
      localStorage.setItem("token", bearer);
      dispatch(init({ email: body.email }));
      history.push("/");
    });
  };

  const handleGoogle = (res) => {
    const google = {
      username: res.profileObj.name,
      email: res.profileObj.email,
      id: res.googleId,
    };
    axios.post("/oauth", google);
    const bearer = "Bearer " + google.id;
    axios.defaults.headers.common["Authorization"] = bearer;
    localStorage.setItem("token", bearer);
    dispatch(init({ email: google.email }));
    history.push("/");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleLogin}
    >
      {() => (
        <Form>
          <Container maxWidth="xs">
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Grid container spacing={2}>
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
                    name="rm"
                    color="primary"
                    type="checkbox"
                    Label={{
                      label: "Remember Me",
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
                Login
              </Button>
              <GoogleLogin
                clientId="1071517499996-t319p34m8es21hn9mrj2bmnrg8ck8j77.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    fullWidth
                    className={classes.google}
                    variant="contained"
                  >
                    Google
                  </Button>
                )}
                onSuccess={handleGoogle}
                onFailure={handleGoogle}
              ></GoogleLogin>
              <Grid container justify="flex-end">
                {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
                <Grid item>
                  <Link to="/signup" variant="body2">
                    Don't have an account? Sign Up
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
