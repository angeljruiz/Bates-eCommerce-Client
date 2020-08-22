import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

export default function AddressForm() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextField}
            variant="outlined"
            required
            id="fn"
            name="fn"
            label="First name"
            fullWidth
            autoFocus
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextField}
            variant="outlined"
            required
            id="ln"
            name="ln"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            variant="outlined"
            required
            id="line1"
            name="line1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            variant="outlined"
            id="line2"
            name="line2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextField}
            variant="outlined"
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextField}
            variant="outlined"
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            autoComplete="shipping region"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextField}
            variant="outlined"
            required
            id="postal_code"
            name="postal_code"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
      </Grid>
    </>
  );
}
