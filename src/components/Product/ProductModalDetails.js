import React, { useState } from "react";
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
import Axios from "axios";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: { margin: "0 auto" },
  margin: { marginTop: theme.spacing(2) },
}));

const validationSchema = Yup.object().shape({
  price: Yup.number().required().label("Price"),
  name: Yup.string().required().min(4).label("Name"),
  quantity: Yup.number().required().label("Quantity"),
  description: Yup.string().label("Description"),
  sku: Yup.string().label("SKU"),
  // section: Yup.string().required().label("Section"),
});

const ProductDetails = ({ id }) => {
  const product =
    useSelector(
      (state) => state.products.find((p) => p.id === id),
      shallowEqual
    ) || {};
  const sections = useSelector((state) => state.global.sections, shallowEqual);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSave = (data, { setSubmitting }) => {
    Axios({ url: "/product", method: id ? "PATCH" : "POST", data })
      .then(() => {
        setSubmitting(false);
        dispatch(addProduct(data));
        dispatch(selectProduct(data.id));
      })
      .catch((e) => {
        setSubmitting(false);
        setError(e);
      });
  };

  const handleDelete = (id) => {
    Axios.delete(`/product/${id}`).then(() => {
      dispatch(deleteProduct(id));
      dispatch(selectProduct(null));
      dispatch(showDashProductModal(false));
    });
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Details" />
      <Divider />
      <CardContent>
        <Formik
          initialValues={{
            id: product.id || "",
            name: product.name || "",
            price: product.price || "",
            description: product.description || "",
            quantity: product.quantity || "",
            section: product.section || "",
          }}
          onSubmit={handleSave}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              {error && (
                <Alert
                  severity="error"
                  style={{ width: "100%", marginBottom: 15 }}
                >
                  {error.toString()}
                </Alert>
              )}
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    label="SKU"
                    name="sku"
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
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
