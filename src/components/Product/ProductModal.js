import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { ProductModalDetails, ProductSlideshow } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    justifyContent: "center",
  },
}));

const ProductPage = ({ id }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      style={{
        margin: 0,
        width: "100%",
      }}
    >
      {id && (
        <Grid item md={6} xs={12}>
          <ProductSlideshow id={id} />
        </Grid>
      )}
      <Grid item md={6} xs={12}>
        <ProductModalDetails id={id} />
      </Grid>
    </Grid>
  );
};

export default ProductPage;
