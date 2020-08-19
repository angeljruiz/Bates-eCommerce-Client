import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import Layout from "../layout/Layout";
import ScrollToTop from "../layout/ScrollToTop";

import LandingPage from "../components/Landing/Landing";
import SuperAdmin from "../components/Admin/SuperAdmin";
import StoreAdmin from "../components/Admin/StoreAdmin";
import Checkout from "../components/Checkout/Checkout";
import LoginDashboard from "../components/LoginSignup/LoginDashboard";
import SignupDashboard from "../components/LoginSignup/SignupDashboard";
import ProductPage from "../components/Product/ProductPage";

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/admin" exact component={SuperAdmin} />
          <Route path="/storeadmin" exact component={StoreAdmin} />
          <Route path="/checkout/:id?" component={Checkout} />
          <Route path="/login" exact component={LoginDashboard} />
          <Route path="/signup" exact component={SignupDashboard} />
          <Route path="/product/:sku" exact component={ProductPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
export default Router;
