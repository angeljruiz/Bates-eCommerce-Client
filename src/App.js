import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
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
import { addProduct } from "./actions/productsActions";

import "./App.scss";
import { addSection, addOrders } from "./actions/globalActions";

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
  let p = useSelector((state) => state.products, shallowEqual);
  const sections = useSelector((state) => state.global.sections, shallowEqual);
  const orders = useSelector((state) => state.global.dash.orders, shallowEqual);
  const dispatch = useDispatch();

  if (!p) p = [];
  if (!Array.isArray(p)) p = [p];

  useEffect(() => {
    axios.get("/account").then((res) => {
      dispatch(init(res.data));
    });
    axios.get("/sections").then((res) => {
      res.data.filter(
        (s) => sections.findIndex((sec) => sec.id === s.id) === -1
      );
      res.data.forEach((section) => {
        dispatch(addSection(section));
      });
    });
    axios.get("/order").then((o) => {
      o.data = o.data.filter(
        (z) => orders.findIndex((s) => s.cid === z.cid) === -1
      );
      o.data = o.data.map((d) => {
        delete d.cart;
        return d;
      });
      if (o.data.length > 0) dispatch(addOrders(o.data));
    });
    fetch("/product").then(async (products) => {
      products = await products.json();
      products = products.filter(
        (pro) => p.findIndex((s) => s.id === pro.id) === -1
      );
      products.forEach((product) => {
        if (!product.images) {
          product.images = [];
          return;
        }
        if (Array.isArray(product.images)) {
          product.image = product.images[0].url;
        } else {
          product.image = product.images.url;
          product.images = [product.images];
        }
      });
      if (products.length > 0) dispatch(addProduct(products));
    });
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <CssBaseline />
      <Router />
    </Elements>
  );
}
