import React from "react";
import { connect } from "react-redux";
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

class App extends React.Component {
  componentDidMount() {
    axios.get("/account").then((res) => {
      this.props.dispatch(init(res.data));
    });
    fetch("/product").then(async (products) => {
      products = await products.json();
      products = products.filter(
        (p) => this.props.products.findIndex((s) => s.sku === p.sku) === -1
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
      if (products.length > 0) this.props.dispatch(addProduct(products));
    });
    axios.get("/sections").then((res) => {
      res.data.forEach((section) => {
        this.props.dispatch(addSection(section));
      });
    });
  }
  render() {
    return (
      <>
        <CssBaseline />
        <Router />
      </>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products,
  };
};

export default connect(mapStateToProps)(App);
