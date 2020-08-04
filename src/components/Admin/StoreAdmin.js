import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  makeStyles,
  Grid,
  Hidden,
  Fab,
  Modal,
} from "@material-ui/core";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";

import {
  showDashProductModal,
  selectProduct,
} from "../../actions/globalActions";
import { ProductPage } from "../Product";
import Widget from "./Widget";

function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },

  modal: {
    marginTop: theme.spacing(2),
  },

  toolbar: theme.mixins.toolbar,
}));

function StoreAdmin() {
  const products = useSelector((state) => state.products).map((p) => {
    return { Id: p.sku, Name: p.name };
  });
  const show = useSelector((state) => state.global.dash.productModal);
  const selectedIndex = useSelector(
    (state) => state.global.dash.selectedProduct
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const modalButton = (show) => {
    if (!show) dispatch(selectProduct(null));
    dispatch(showDashProductModal(show));
  };

  const selectItem = (i) => {
    dispatch(selectProduct(products[i].Id));
    dispatch(showDashProductModal(true));
  };

  return (
    <>
      <Modal
        open={show}
        onClose={() => modalButton(false)}
        onEscapeKeyDown={() => modalButton(false)}
        aria-labelledby="simple-modal"
        aria-describedby="simple-modal"
        className={classes.modal}
      >
        <>
          <div className={classes.toolbar} />
          <ProductPage id={selectedIndex} />
          <Hidden mdUp>
            <Fab
              color="secondary"
              className={classes.fab}
              onClick={() => modalButton(false)}
            >
              <Typography className={classes.fabButton}>X</Typography>
            </Fab>
          </Hidden>
        </>
      </Modal>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Widget name="Product" list={products} action={selectItem} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Widget
            name="Section"
            list={[{ Order: 1, Name: "Featured" }]}
            Content={ProductPage}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Title>Recent Orders</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Ship To</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell align="right">Sale Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.shipTo}</TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button color="primary">See more orders</Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default StoreAdmin;
