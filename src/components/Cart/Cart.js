import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { makeStyles, Box, Button, Drawer } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { showCart } from "../../actions/cartActions";
import CartItem from "./CartItem";
import dStyle from "../../style/style";

const useStyles = makeStyles((theme) => {
  return {
    modal: {
      overflow: "scroll",
    },

    drawerPaper: {
      backgroundColor: "inherit",
    },

    toolbar: theme.mixins.toolbar,
  };
});

function Cart() {
  const { show, products, totalItems } = useSelector(
    (state) => state.cart,
    shallowEqual
  );
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  if (!show) return <></>;

  const hideCart = () => {
    dispatch(showCart(false));
  };

  const gotoCheckout = () => {
    dispatch(showCart(false));
    history.push("/checkout");
  };

  if (totalItems === 0) {
    hideCart();
    return <></>;
  }

  return (
    <Drawer
      open={show}
      anchor="right"
      className={classes.modal}
      onBackdropClick={hideCart}
      onEscapeKeyDown={hideCart}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Box style={{ outline: "none" }}>
        <div className={classes.toolbar} />
        {Object.keys(products || {}).map((k, i) => (
          <CartItem sku={products[k].sku} key={i} />
        ))}
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={gotoCheckout}
          fullWidth
        >
          Checkout
        </Button>
        <div className={classes.toolbar} />
      </Box>
    </Drawer>
  );
}

export default Cart;
