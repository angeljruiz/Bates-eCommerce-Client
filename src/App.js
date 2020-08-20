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

import Router from "./router/Router";
import { init } from "./actions/accountActions";
import { addProduct } from "./actions/productsActions";

import "./App.scss";
import { addSection } from "./actions/globalActions";

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
    fetch("/product").then(async (products) => {
      products = await products.json();
      products = products.filter(
        (pro) => p.findIndex((s) => s.sku === pro.sku) === -1
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
    <>
      <CssBaseline />
      <Router />
    </>
  );
}
