import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  makeStyles,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import * as Yup from "yup";

import { deleteProduct, addProduct } from "../../actions/productsActions";
import {
  showDashProductModal,
  selectProduct,
} from "../../actions/globalActions";
import { Formik, Field, Form } from "formik";
import { TextField, Select } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  root: { margin: "0 auto" },
  margin: { marginTop: theme.spacing(2) },
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
  const sections = useSelector((state) => state.global.sections, shallowEqual);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSave = (body) => {
    console.log("@@@@@@");
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
      <CardHeader title="Details" />
      <Divider />
      <CardContent>
        <Formik
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
          {() => (
            <Form>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    label="SKU"
                    name="sku"
                    required
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    label="Name"
                    name="name"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    label="Price"
                    name="price"
                    required
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    label="Description"
                    name="description"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl style={{ minWidth: 100 }}>
                    <InputLabel htmlFor="section">Section</InputLabel>
                    <Field
                      component={Select}
                      name="section"
                      fullWidth
                      inputProps={{
                        id: "section",
                      }}
                    >
                      {sections.map((section) => (
                        <MenuItem key={section.id} value={section.id}>
                          {section.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Divider className={classes.margin} />
              <CardActions>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
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
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
