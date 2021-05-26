/**
 * Update and delete ice cream form.
 */
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const UpdateSchema = Yup.object().shape({
  name: Yup.string().required("This field is required."),
  flavor: Yup.string().required("This field is required."),
  quantity: Yup.number()
    .integer("Must be whole number.")
    .required("This field is required."),
  price: Yup.number()
    .test(
      "decimalValidation",
      "Number must have 2 or less decimal.",
      (number) => /^\d+(\.\d{1,2})?$/.test(number)
    )
    .required("This field is required."),
});

export const Edit = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          flavor: "",
          quantity: "",
          price: "",
        }}
        validationSchema={UpdateSchema}
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
            <button type="submit">Update</button>
            <button type="button">Delete</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
