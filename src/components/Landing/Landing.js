import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Typography, Paper, Grid, Box, makeStyles } from "@material-ui/core";

import { addProduct } from "../../actions/productsActions";

import Product from "../Product/Product";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { addSection } from "../../actions/globalActions";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
}));

function Landing() {
  const products = useSelector((state) => state.products, shallowEqual);
  const sections = useSelector((state) => state.global.sections, shallowEqual);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    // axios.defaults.baseURL = `/${params.storeUrl}`;
    axios.defaults.baseURL = `/test_store`;

    axios.get("/section").then((res) => {
      res.data = res.data.filter(
        (s) => sections.findIndex((sec) => sec.id === s.id) === -1
      );
      res.data.forEach((section) => {
        dispatch(addSection(section));
      });
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
      let section = document.querySelector(history.location.hash);
      if (section) section.scrollIntoView();
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
