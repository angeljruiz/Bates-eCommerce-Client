import React from "react";

import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
  },
}));

function ErrorMessage({ error, visible }) {
  const classes = useStyles();

  if (!visible || !error) return null;

  return (
    <Typography variant="subtitle2" className={classes.error}>
      {error}
    </Typography>
  );
}

export default ErrorMessage;
