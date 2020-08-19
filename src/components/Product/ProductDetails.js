import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";
import * as Yup from "yup";

import { deleteProduct, addProduct } from "../../actions/productsActions";
import { AppForm, AppFormField } from "../Form";
import SubmitButton from "../Form/SubmitButton";
import {
  showDashProductModal,
  selectProduct,
} from "../../actions/globalActions";

const useStyles = makeStyles(() => ({
  root: { margin: "0 auto" },
}));

const validationSchema = Yup.object().shape({
  sku: Yup.number().required().label("SKU"),
  price: Yup.number().required().label("Price"),
  name: Yup.string().required().min(4).label("Name"),
  quantity: Yup.number().required().label("Quantity"),
  description: Yup.string().label("Description"),
  // section: Yup.string().required().label("Section"),
});

const ProductDetails = ({ id }) => {
  const product =
    useSelector(
      (state) => state.products.find((p) => p.sku === id),
      shallowEqual
    ) || {};
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSave = (body) => {
    fetch("/product", {
      method: id ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    dispatch(addProduct(body));
    dispatch(selectProduct(body.sku));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    dispatch(showDashProductModal(false));
    fetch(`/product/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <Card className={classes.root}>
      <AppForm
        initialValues={{
          sku: product.sku || "",
          name: product.name || "",
          price: product.price || "",
          description: product.description || "",
          quantity: product.quantity || "",
          section: product.section || "",
        }}
        onSubmit={handleSave}
        validationSchema={validationSchema}
      >
        <CardHeader title="Details" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <AppFormField
                fullWidth
                label="SKU"
                margin="dense"
                name="sku"
                required
                type="number"
                variant="outlined"
                defaultValue={product.sku || ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AppFormField
                fullWidth
                label="Name"
                margin="dense"
                name="name"
                required
                variant="outlined"
                defaultValue={product.name || ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AppFormField
                fullWidth
                label="Price"
                margin="dense"
                name="price"
                required
                type="number"
                variant="outlined"
                defaultValue={product.price || ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AppFormField
                fullWidth
                label="Description"
                margin="dense"
                name="description"
                required
                variant="outlined"
                defaultValue={product.description || ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AppFormField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                required
                variant="outlined"
                defaultValue={product.quantity || ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AppFormField
                fullWidth
                label="Section"
                margin="dense"
                name="section"
                required
                variant="outlined"
                defaultValue={product.section || ""}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <SubmitButton title="save" />
          {id && (
            <Button
              onClick={() => handleDelete(id)}
              color="secondary"
              variant="contained"
            >
              Delete
            </Button>
          )}
        </CardActions>
      </AppForm>
    </Card>
  );
};

export default ProductDetails;
