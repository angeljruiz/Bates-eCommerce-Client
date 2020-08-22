import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const products = useSelector((state) => state.cart.products, shallowEqual);
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  if (Object.keys(products).length === 0 && !id) history.push("/");

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {Object.keys(products || {}).map((k, i) => (
          <ListItem className={classes.listItem} key={products[k].name}>
            <ListItemText
              primary={`${products[k].amount} x ${products[k].name}`}
              secondary={products[k].description}
            />
            <Typography variant="body2">
              {"$" +
                ((products[k].price / 100) * products[k].amount).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {`$${Object.keys(products || {})
              .reduce(
                (sum, k) =>
                  sum + (products[k].price / 100) * products[k].amount,
                0
              )
              .toFixed(2)}`}
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
