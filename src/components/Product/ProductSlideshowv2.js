import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  makeStyles,
  Grid,
  Button,
  Box,
} from "@material-ui/core";
import { useSelector, shallowEqual } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    card: {
      width: "100%",
      height: "125px",
    },
    cardContent: {},
    details: {
      display: "flex",
      marginBottom: theme.spacing(2),
    },
    avatar: {
      marginLeft: "auto",
      height: 110,
      width: 100,
      flexShrink: 0,
      flexGrow: 0,
    },
    selected: {
      border: `3px solid ${theme.palette.primary.dark}`,
    },
  };
});

const ProductSlideshowv2 = ({ id }) => {
  const { name, images } =
    useSelector(
      (state) => state.products.find((p) => p.sku === id),
      shallowEqual
    ) || {};
  const selectedThumb = useSelector(
    (state) => state.global.dash.selectedProductThumb
  );
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12}>
            {images && (
              <img
                id="mainImg"
                src={images[0].url}
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
                alt="Current"
              />
            )}
            <div style={{ position: "relative", top: "-50%" }}>
              <div style={{ display: "flex" }}>
                <Button variant="contained" color="primary">
                  {"<"}
                </Button>
                <div className="flex" />
                <Button variant="contained" color="primary">
                  {">"}
                </Button>
              </div>
            </div>
          </Grid>
          {images &&
            images.map((image, i) => {
              return (
                <Grid item xs={4} key={i}>
                  <Avatar
                    className={`${classes.card} ${
                      selectedThumb === i ? classes.selected : ""
                    }`}
                    id={`product-thumb-${i}`}
                    variant="rounded"
                    src={image.url}
                  ></Avatar>
                </Grid>
              );
            })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductSlideshowv2;
