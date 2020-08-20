import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  makeStyles,
  Grid,
  Button,
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
  const [selectedThumb, setThumb] = useState(0);
  const classes = useStyles();

  const updateThumb = (index) => {
    if (index >= images.length) {
      setThumb(0);
    } else if (index < 0) {
      setThumb(images.length - 1);
    } else setThumb(index);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12}>
            {(images || {}).length > 1 && (
              <img
                id="mainImg"
                src={images[selectedThumb].url}
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
                alt="Current"
              />
            )}

            {(images || {}).length > 1 && (
              <div style={{ position: "relative", top: "-50%" }}>
                <div style={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateThumb(selectedThumb + 1)}
                  >
                    {"<"}
                  </Button>
                  <div className="flex" />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateThumb(selectedThumb - 1)}
                  >
                    {">"}
                  </Button>
                </div>
              </div>
            )}
          </Grid>
          {images &&
            images.length > 1 &&
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
                    onClick={() => setThumb(i)}
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
