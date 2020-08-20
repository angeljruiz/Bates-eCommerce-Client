import React from "react";
import { Paper, Container, makeStyles, Grid, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },

  grid: {
    marginBottom: theme.spacing(2),
  },

  save: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Section({ Order, list }) {
  const classes = useStyles();
  const handleSave = (data) => {
    axios({
      method: Order !== null ? "PATCH" : "POST",
      url: "/sections",
      data,
    });
  };
  const handleDelete = (id) => {
    axios.delete(`/sections/${id}`);
  };

  return (
    <Formik
      initialValues={{
        name: (list[Order] || {}).name || "",
        num: (list[Order] || {}).num || "",
        id: (list[Order] || {}).id || "",
      }}
      onSubmit={handleSave}
    >
      {() => (
        <Form>
          <Container maxWidth="xs">
            <Paper className={classes.paper}>
              <Grid container spacing={2} className={classes.grid}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Section Name"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    name="num"
                    label="Number"
                    type="number"
                    id="num"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.save}
              >
                Save
              </Button>
              <Button
                onClick={() => handleDelete(list[Order].id)}
                fullWidth
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </Paper>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
