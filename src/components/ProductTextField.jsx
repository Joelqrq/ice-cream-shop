import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export const ProductTextField = (props) => {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <TextField
      label={props.label}
      {...field}
      {...props}
      helperText={meta.error}
      className={classes.root}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormHelperText-root": {
      color: "#f44336",
    },
    marginBottom: "1rem"
  },
}));
