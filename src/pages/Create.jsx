/**
 * Create ice cream form.
 */
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { create, test } from "../services/crud";

const CreateSchema = Yup.object().shape({
  name: Yup.string().required("This field is required."),
  flavor: Yup.string().required("This field is required."),
  quantity: Yup.number()
    .typeError("Must be a number.")
    .integer("Must be whole number.")
    .required("This field is required."),
  price: Yup.number()
    .typeError("Must be a number.")
    .test(
      "decimalValidation",
      "Number must have 2 or less decimal.",
      (number) => /^\d+(\.\d{1,2})?$/.test(number)
    )
    .required("This field is required."),
});

export const Create = (props) => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          flavor: "",
          quantity: "",
          price: "",
        }}
        validationSchema={CreateSchema}
        onSubmit={(values) => {
          create(JSON.stringify(values));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" />
            {errors.name && touched.name ? <span>{errors.name}</span> : null}
            <Field name="flavor" />
            {errors.flavor && touched.flavor ? (
              <span>{errors.flavor}</span>
            ) : null}
            <Field name="quantity" />
            {errors.quantity && touched.quantity ? (
              <span>{errors.quantity}</span>
            ) : null}
            <Field name="price" />
            {errors.price && touched.price ? <span>{errors.price}</span> : null}
            <button type="submit">Create</button>
            <button type="button" onClick={() => test()}>
              Test
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
