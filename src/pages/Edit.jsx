/**
 * Update and delete ice cream form.
 */
import React, { useState } from "react";
import { Redirect, useLocation } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { deleteProduct, update } from "../services/crud";
import { ProductPriceField } from "../components/ProductPriceField";
import { ProductNumberField } from "../components/ProductNumberField";
import { ProductTextField } from "../components/ProductTextField";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { UpdateButton, DeleteButton } from "../components/EditButtons";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { MessageAlert } from "../components/MessageAlert";

export const Edit = (props) => {
  const location = useLocation();
  const product = location.state || null;
  const history = useHistory();
  const [snackbarState, setSnackbarState] = useState({});
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({ state: false });
  };

  return product === null ? (
    <Redirect to="/" />
  ) : (
    <StyledEdit>
      <Paper elevation={3} className="card">
        <Typography
          variant="h5"
          component="h1"
          align="center"
          className="title"
          noWrap
        >
          Edit "{product.name}"
        </Typography>
        <Formik
          initialValues={{
            name: product.name,
            flavor: product.flavor,
            quantity: product.quantity,
            price: product.price,
          }}
          validationSchema={createSchema}
          onSubmit={async (values) => {
            const result = await update(product.id, values);
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
              <div className="buttons">
                <UpdateButton
                  type="submit"
                  variant="contained"
                  endIcon={<SaveIcon />}
                >
                  Update
                </UpdateButton>
                <DeleteButton
                  type="button"
                  variant="contained"
                  endIcon={<DeleteForeverIcon />}
                  onClick={() => (async () => {
                    const result = await deleteProduct(product);
                    if (result.result) history.push("/", result.message);
                    setSnackbarState({
                      state: !result.result,
                      message: result.message,
                    });
                  })()}
                >
                  Delete
                </DeleteButton>
              </div>
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
    </StyledEdit>
  );
};

const StyledEdit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .card {
    width: 45ch;
    padding: 2rem;
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

  .buttons {
    display: flex;
    justify-content: space-around;
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
