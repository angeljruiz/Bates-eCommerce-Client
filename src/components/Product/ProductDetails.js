import React from "react";
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

import { AppForm, AppFormField } from "../Form";
import SubmitButton from "../Form/SubmitButton";

const useStyles = makeStyles(() => ({
  root: {},
}));

const validationSchema = Yup.object().shape({
  sku: Yup.string().required().label("SKU"),
  price: Yup.number().required().label("Price"),
  name: Yup.string().required().min(4).label("Name"),
  quantity: Yup.string().required().label("Quantity"),
  description: Yup.string().label("Description"),
  section: Yup.string().required().label("Section"),
});

const ProductDetails = (props) => {
  const { ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={classes.root}>
      <AppForm
        initialValues={{
          sku: "",
          name: "",
          price: "",
          description: "",
          quantity: "",
          section: "",
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <CardHeader title="Profile" />
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
                variant="outlined"
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
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AppFormField
                fullWidth
                label="Price *"
                margin="dense"
                name="price"
                required
                type="number"
                variant="outlined"
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
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AppFormField
                fullWidth
                label="Quantity *"
                margin="dense"
                name="quantity"
                required
                type="number"
                variant="outlined"
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
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <SubmitButton title="save" />
          <Button color="secondary" variant="contained">
            Delete
          </Button>
        </CardActions>
      </AppForm>
    </Card>
  );
};

export default ProductDetails;
