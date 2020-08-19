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
      console.log(res.data);
      console.log(localStorage.getItem("token"));
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
  }
  render() {
    return (
      <>
        <CssBaseline />
        <Router
          products={this.props.products}
          cart={this.props.cart}
          dispatch={this.props.dispatch}
        />
      </>
    );
  }
}

const mapStateToProps = ({ products, cart }) => {
  return {
    products,
    cart,
  };
};

export default connect(mapStateToProps)(App);
