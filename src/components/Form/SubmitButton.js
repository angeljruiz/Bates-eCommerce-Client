import React from "react";
import { useFormikContext } from "formik";
import { Button } from "@material-ui/core";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button color="primary" variant="contained" onClick={handleSubmit}>
      {title}
    </Button>
  );
}

export default SubmitButton;
