import React from "react";
import { Grid, makeStyles, Container } from "@material-ui/core";

import { ProductDetails, ProductSlideshow } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const ProductPage = ({ id }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <ProductSlideshow id={id} />
        </Grid>
        <Grid item md={6} xs={12}>
          <ProductDetails id={id} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
