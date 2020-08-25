import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSignOutAlt,
  faSignInAlt,
  faShoppingCart,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Router from "./router/Router";
import { init } from "./actions/accountActions";

import "./App.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

library.add(
  faSignInAlt,
  faSignOutAlt,
  faShoppingCart,
  faUserCircle,
  faLinkedin,
  faGithub
);

let token = localStorage.getItem("token");
if (token) {
  axios.defaults.withCredentials = true;
  axios.defaults.credentials = "include";
  axios.defaults.headers.common["Authorization"] = token;
} else {
  axios.defaults.headers.common["Authorization"] = null;
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.baseURL = null;
    axios.get("/account").then((res) => {
      dispatch(init(res.data));
    });
  });

  return (
    <Elements stripe={stripePromise}>
      <CssBaseline />
      <Router />
    </Elements>
  );
}
