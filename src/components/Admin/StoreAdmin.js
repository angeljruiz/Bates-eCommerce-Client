import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  Typography,
  makeStyles,
  Grid,
  Hidden,
  Fab,
  Modal,
} from "@material-ui/core";

import {
  showDashProductModal,
  selectProduct,
  selectProductThumb,
  addOrders,
} from "../../actions/globalActions";
import { ProductPage } from "../Product";
import Widget from "./Widget";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },

  modal: {
    marginTop: theme.spacing(2),
    overflow: "scroll",
  },

  fab: {
    position: "fixed",
    right: theme.spacing(1),
    bottom: theme.spacing(2),
  },

  toolbar: theme.mixins.toolbar,
}));

function StoreAdmin() {
  const products = useSelector((state) => state.products).map((p) => {
    return { Id: p.sku, Name: p.name };
  }, shallowEqual);
  const orders = useSelector((state) => state.global.dash.orders, shallowEqual);
  const show = useSelector((state) => state.global.dash.productModal);
  const selectedIndex = useSelector(
    (state) => state.global.dash.selectedProduct
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const modalButton = (show) => {
    if (!show) {
      dispatch(selectProduct(null));
      dispatch(selectProductThumb(null));
    }
    dispatch(showDashProductModal(show));
  };

  const selectItem = (i) => {
    dispatch(selectProduct(products[i].Id));
    dispatch(showDashProductModal(true));
  };

  axios.get("/order").then((o) => {
    o.data = o.data.filter(
      (z) => orders.findIndex((s) => s.cid === z.cid) === -1
    );
    if (o.data.length > 0) dispatch(addOrders(o.data));
  });

  orders.forEach(
    (o) => delete o.processing && delete o.line1 && delete o.finalized
  );

  return (
    <>
      <Modal
        open={show}
        onClose={() => modalButton(false)}
        onEscapeKeyDown={() => modalButton(false)}
        aria-labelledby="simple-modal"
        aria-describedby="simple-modal"
        className={classes.modal}
      >
        <>
          <div className={classes.toolbar} />
          <ProductPage id={selectedIndex} />
          <Hidden mdUp>
            <Fab
              color="secondary"
              className={classes.fab}
              onClick={() => modalButton(false)}
            >
              <Typography className={classes.fabButton}>X</Typography>
            </Fab>
          </Hidden>
        </>
      </Modal>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Widget
            name="Products"
            list={products}
            action={selectItem}
            buttonAction={() => modalButton(true)}
            buttonText="Add a Product"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Widget
            name="Sections"
            list={[{ Order: 1, Name: "Featured" }]}
            buttonText="Add a Section"
          />
        </Grid>
        <Grid item xs={12}>
          <Widget
            name="Recent Orders"
            list={orders}
            Content={ProductPage}
            buttonText="See more orders"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default StoreAdmin;
