/**
 * Create ice cream form.
 */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { create } from "../services/crud";
import { ProductPriceField } from "../components/ProductPriceField";
import { ProductNumberField } from "../components/ProductNumberField";
import { ProductTextField } from "../components/ProductTextField";
import { FormSubmitButton } from "../components/FormSubmitButton";
import CreateIcon from "@material-ui/icons/Create";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { MessageAlert } from "../components/MessageAlert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const Create = (props) => {
  const history = useHistory();
  const [snackbarState, setSnackbarState] = useState({});
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({ state: false });
  };

  const navigateBack = () => {
    history.push("/");
  };

  return (
    <StyledCreate>
      <Paper elevation={3} className="card">
        <ArrowBackIcon className="back-arrow" onClick={navigateBack} />
        <Typography
          variant="h5"
          component="h1"
          align="center"
          className="title"
          noWrap
        >
          Create ice cream
        </Typography>
        <Formik
          initialValues={{
            name: "",
            flavor: "",
            quantity: 0,
            price: 0,
          }}
          validationSchema={createSchema}
          onSubmit={async (values) => {
            const result = await create(values);
            if (result.result) history.push("/", result.message);
            setSnackbarState({
              state: !result.result,
              message: result.message,
            });
          }}
        >
          {() => (
            <Form className="form">
              <ProductTextField
                className="form-field"
                label="Name"
                name="name"
                type="text"
                variant="outlined"
              />
              <ProductTextField
                className="form-field"
                label="Flavor"
                name="flavor"
                type="text"
                variant="outlined"
              />
              <ProductNumberField
                className="form-field"
                label="Quantity"
                name="quantity"
                decimalscale={0}
                variant="outlined"
              />
              <ProductPriceField
                className="form-field"
                label="Price per unit"
                name="price"
                variant="outlined"
              />
              <FormSubmitButton
                type="submit"
                variant="contained"
                endIcon={<CreateIcon />}
              >
                Create
              </FormSubmitButton>
            </Form>
          )}
        </Formik>
      </Paper>
      <Snackbar
        open={snackbarState.state}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MessageAlert severity="error" onClose={handleClose}>
          {snackbarState.message}
        </MessageAlert>
      </Snackbar>
    </StyledCreate>
  );
};

const StyledCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .card {
    position: relative;
    width: 45ch;
    padding: 2rem;
  }

  .back-arrow {
    position: absolute;
    margin-top: 0.25rem;
    margin-left: 2rem;
    cursor: pointer;
  }

  .title {
    color: rgba(0, 0, 0, 0.87);
  }

  .form {
    display: flex;
    flex-direction: column;
    margin: 1.7rem;
  }

  .form-field {
    margin-bottom: 2rem;
  }
`;

const createSchema = Yup.object().shape({
  name: Yup.string().required("This field is required."),
  flavor: Yup.string().required("This field is required."),
  quantity: Yup.number()
    .typeError("Must be a number.")
    .required("This field is required.")
    .integer("Must be whole number."),
  price: Yup.number()
    .typeError("Must be a number.")
    .required("This field is required.")
    .test("decimalValidation", "Field must have 2 or less decimal.", (number) =>
      /^\d+(\.\d{1,2})?$/.test(number)
    ),
});
