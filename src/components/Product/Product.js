import React from "react";

import {
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { addProductCart } from "../../actions/cartActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(0, 2),
  },
  productImg: {
    height: "250px",
  },
}));

function Product({ id }) {
  const product = useSelector(
    (state) => state.products.find((p) => p.id === id),
    shallowEqual
  );
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardActionArea
        disableRipple
        onClick={() => history.push(`/product/${product.id}`)}
      >
        {product.image && (
          <CardMedia
            className={classes.productImg}
            image={product.image}
            title={product.name}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          color="primary"
          onClick={() => {
            dispatch(addProductCart(product));
          }}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;
