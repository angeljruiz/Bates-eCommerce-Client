import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Typography, Paper, Grid, Box, makeStyles } from "@material-ui/core";

import { addProduct } from "../../actions/productsActions";

import Product from "../Product/Product";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
}));

function Landing() {
  const products = useSelector((state) => state.products, shallowEqual);
  const sections = useSelector((state) => state.global.sections, shallowEqual);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    fetch("/product").then(async (newproducts) => {
      let images = [];
      newproducts = await newproducts.json();
      if (products.length === 0) return;
      newproducts = newproducts.filter(
        (p) => products.findIndex((s) => s.sku === p.sku) === -1
      );
      newproducts.forEach((product) => {
        images.push(
          fetch(
            `/product/${product.sku}/image?${new URLSearchParams([
              ["limit", 1],
            ])}`
          )
        );
      });
      Promise.all(images).then((data) => {
        data = data.map((d) => d.blob());
        Promise.all(data).then((data) => {
          newproducts = newproducts.map((p, index) => {
            p.image = URL.createObjectURL(data[index]);
            return p;
          });
          if (newproducts.length > 0) dispatch(addProduct(newproducts));
        });
      });
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
                    <Product sku={product.sku} />
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
