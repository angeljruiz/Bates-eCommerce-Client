import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import { TextField, Input } from "@material-ui/core";

function AppFormField({ name, type = "text", label, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      {type === "text" && (
        <TextField
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          label={label}
          {...otherProps}
        />
      )}
      {type === "number" && (
        <Input
          type="number"
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange(name)}
          placeholder={label}
          {...otherProps}
        />
      )}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
