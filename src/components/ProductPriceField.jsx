import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";

export const ProductPriceField = (props) => {
  const [field, meta, helpers] = useField(props);
  const classes = useStyles();

  const handleChange = (value) => {
    helpers.setValue(value);
  };

  return (
    <TextField
      label={props.label}
      {...props}
      helperText={meta.error}
      className={classes.root}
      value={field.value}
      onChange={handleChange}
      InputProps={{
        inputComponent: priceFormat,
      }}
    />
  );
};

const priceFormat = (props) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange(values.value);
      }}
      thousandSeparator
      decimalScale={2}
      fixedDecimalScale={true}
      allowNegative={false}
      prefix="$"
      isNumericString
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormHelperText-root": {
      color: "#f44336",
    },
    marginBottom: "1rem",
  },
}));