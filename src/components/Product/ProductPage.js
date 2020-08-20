import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { ProductDetails, ProductSlideshowv2 } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
  },
}));

const ProductPage = ({ match }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <ProductSlideshowv2 id={match.params.sku} />
      </Grid>
      <Grid item md={6} xs={12}></Grid>
    </Grid>
  );
};

export default ProductPage;
