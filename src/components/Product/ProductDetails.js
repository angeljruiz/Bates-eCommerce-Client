import React, { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { addProductCart } from "../../actions/cartActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 2),
  },
  margin: { marginTop: theme.spacing(2) },
  amount: {
    fontSize: 28,
  },
  price: {
    color: "green",
  },
}));

const ProductDetails = ({ id }) => {
  const product =
    useSelector(
      (state) => state.products.find((p) => p.sku === id),
      shallowEqual
    ) || {};
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              gutterBottom
            >
              {product.name}
            </Typography>
            <Typography variant="subtitle1" className={classes.price}>
              ${(product.price * amount).toFixed(2)}
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Typography variant="body1">{product.description}</Typography>
          </Grid>
        </Grid>
        <Divider className={classes.margin} />
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              product.amount = amount;
              dispatch(addProductCart(product));
            }}
          >
            Add to cart
          </Button>
          <CardActions disableSpacing>
            <IconButton
              onClick={() => {
                if (amount >= 2) setAmount(amount - 1);
              }}
              aria-label="decrement"
            >
              <RemoveIcon />
            </IconButton>
            <Typography className={classes.amount} variant="body2">
              {amount}
            </Typography>
            <IconButton
              aria-label="increment"
              onClick={() => setAmount(amount + 1)}
            >
              <AddIcon />
            </IconButton>
          </CardActions>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
