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
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <ProductSlideshow id={id} />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <ProductDetails id={id} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
