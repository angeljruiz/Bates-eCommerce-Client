import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import axios from "axios";
import { selectProductThumb } from "../../actions/globalActions";
import { addImage, deleteImage } from "../../actions/productsActions";

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

const ProductSlideshow = ({ id }) => {
  const { name, images } =
    useSelector(
      (state) => state.products.find((p) => p.sku === id),
      shallowEqual
    ) || {};
  const selectedThumb = useSelector(
    (state) => state.global.dash.selectedProductThumb
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleUpload = (event) => {
    let data = new FormData();
    data.append("file", event.target.files[0]);
    axios.post(`/product/${id}/image`, data).then((image) => {
      dispatch(addImage(id, image.data));
    });
  };

  const handleRemove = () => {
    axios
      .delete(`/product/${id}/image/${images[selectedThumb].name}`)
      .then((success) => {
        if (success) {
          dispatch(selectProductThumb(null));
          dispatch(deleteImage(id, selectedThumb));
        }
      });
  };

  const selectThumb = (i) => {
    dispatch(selectProductThumb(i));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div id="details" className={classes.details}>
          <div>
            <Typography gutterBottom variant="h4">
              {name}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={(images[0] || {}).url} />
        </div>
        <Grid container direction="row" spacing={2}>
          {images.map((image, i) => {
            return (
              <Grid item xs={6} md={4} key={i}>
                <Avatar
                  className={`${classes.card} ${
                    selectedThumb === i ? classes.selected : ""
                  }`}
                  id={`product-thumb-${i}`}
                  onClick={() => selectThumb(i)}
                  variant="rounded"
                  src={image.url}
                >
                  {""}
                </Avatar>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" variant="text" component="label">
          Upload picture
          <input
            type="file"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </Button>
        {/* {Number.isInteger(selectedThumb) && (
          <Button onClick={handleRemove} variant="text">
            Make main picture
          </Button>
        )} */}
        {Number.isInteger(selectedThumb) && (
          <Button onClick={handleRemove} color="secondary" variant="text">
            Remove picture
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductSlideshow;
