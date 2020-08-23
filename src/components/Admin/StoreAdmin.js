import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Grid } from "@material-ui/core";

import {
  showDashProductModal,
  selectProduct,
  selectProductThumb,
} from "../../actions/globalActions";
import { ProductModal } from "../Product";
import Section from "../Product/Section";
import Widget from "./Widget";
import { useHistory } from "react-router-dom";
import moment from "moment";

function StoreAdmin() {
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

  return (
    <>
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
