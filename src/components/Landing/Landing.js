import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Typography, Paper, Grid, Box, makeStyles } from "@material-ui/core";

import { addProduct } from "../../actions/productsActions";

import Product from "../Product/Product";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { addSection, addOrders } from "../../actions/globalActions";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
}));

function Landing() {
  const products = useSelector((state) => state.products, shallowEqual);
  const orders = useSelector((state) => state.global.dash.orders, shallowEqual);
  const sections = useSelector((state) => state.global.sections, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    axios.defaults.baseURL = "/test_store";

    axios.get("/sections").then((res) => {
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
        (pro) => products.findIndex((s) => s.id === pro.id) === -1
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
  }, []);

  useEffect(() => {
    if (history.location.hash) {
      document.querySelector(history.location.hash).scrollIntoView();
    }
  });

  return (
    <Grid>
      {sections.map((section, i) => (
        <React.Fragment key={i}>
          <Grid item xs={12} id={section.name}>
            <Box mb={3}>
              <Paper>
                <Typography
                  variant="h2"
                  align="center"
                  style={{ fontWeight: "400" }}
                >
                  {section.name}
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-around"
            className={classes.container}
          >
            {products
              .filter((p) => p.section === Number(section.id))
              .map((product, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Box mb={2}>
                    <Product id={product.id} />
                  </Box>
                </Grid>
              ))}
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}

export default Landing;
