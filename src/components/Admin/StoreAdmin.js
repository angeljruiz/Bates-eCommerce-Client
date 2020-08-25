import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Grid, Button } from "@material-ui/core";

import {
  showDashProductModal,
  selectProduct,
  selectProductThumb,
  addOrders,
  addSection,
} from "../../actions/globalActions";
import { ProductModal } from "../Product";
import Section from "../Product/Section";
import Widget from "./Widget";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { addProduct } from "../../actions/productsActions";
import { Alert } from "@material-ui/lab";

function StoreAdmin() {
  const account = useSelector((state) => state.account, shallowEqual);
  const products = useSelector((state) => state.products).map((p) => {
    return { Id: p.id, Name: p.name };
  }, shallowEqual);
  const sections = useSelector((state) => state.global.sections, shallowEqual);
  const orders = useSelector((state) => state.global.dash.orders, shallowEqual);
  const show = useSelector((state) => state.global.dash.productModal);
  const selectedIndex = useSelector(
    (state) => state.global.dash.selectedProduct
  );
  const [showSections, setShowSections] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!account.url) return;
    axios.defaults.baseURL = `/${account.url}`;

    axios.get("/section").then((res) => {
      res.data = res.data.filter(
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

    axios.get("/product").then(({ data }) => {
      data = data.filter(
        (pro) => products.findIndex((s) => s.Id === pro.id) === -1
      );
      data.forEach((product) => {
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
      if (data.length > 0) dispatch(addProduct(data));
    });
  }, [account]);

  const modalButton = (show) => {
    if (!show) {
      dispatch(selectProduct(null));
      dispatch(selectProductThumb(null));
    }
    dispatch(showDashProductModal(show));
  };

  const selectItem = (i) => {
    dispatch(selectProduct((products[i] || {}).Id));
    dispatch(showDashProductModal(true));
  };

  const selectSection = (i) => {
    setSectionIndex(i);
    setShowSections(true);
  };

  const handleOnboard = () => {
    axios.get("/onboard").then(({ data }) => (window.location.href = data.url));
  };

  return (
    <>
      {!account.onboard && (
        <Alert
          variant="filled"
          severity="warning"
          style={{ justifyContent: "center" }}
          action={<Button onClick={handleOnboard}>Setup Bank info</Button>}
        >
          You need to setup a Stripe account for payments
        </Alert>
      )}
      <Grid container>
        <Grid item xs={12} md={4}>
          <Widget
            name="Products"
            list={products}
            action={selectItem}
            buttonText="Add a Product"
            modalHandler={modalButton}
            ModalPage={ProductModal}
            show={show}
            modalProps={{ id: selectedIndex }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Widget
            name="Sections"
            list={sections}
            buttonText="Add a Section"
            action={selectSection}
            ModalPage={Section}
            show={showSections}
            modalHandler={setShowSections}
            modalProps={{
              Order: sectionIndex,
              list: sections,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Widget
            name="Recent Orders"
            list={orders.map((o) => {
              o.date = moment(o.date).format("lll");
              return o;
            })}
            Content={ProductModal}
            action={(i) => history.push(`/checkout/${orders[i].id}`)}
            buttonText="See more orders"
            ModalPage={ProductModal}
            show={false}
            modalHandler={() => history.push("/orders")}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default StoreAdmin;
