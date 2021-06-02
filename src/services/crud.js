import { instance } from "./axios.config";

export const create = async (values) => {
  let result = false;
  const res = await instance
    .post("/products/create", values)
    .then((res) => {
      result = true;
      return res.data;
    })
    .catch((err) => {
      result = false;
      return err.response.data;
    });
  return { result: result, message: res.message };
};

export const read = async () => {
  let result = false;
  const res = await instance
    .get("/products/read")
    .then((res) => {
      result = true;
      return res.data;
    })
    .catch((err) => {
      result = false;
      return err.response.data;
    });
  return { result: result, products: res.products, message: res.message };
};

export const update = async (id, values) => {
  let result = false;
  const product = {
    id: id,
    ...values,
  };
  const res = await instance
    .put("/products/update", product)
    .then((res) => {
      result = true;
      return res.data;
    })
    .catch((err) => {
      result = false;
      return err.response.data;
    });
  return { result: result, message: res.message };
};

export const deleteProduct = async ({ id, name }) => {
  let result = false;
  const res = await instance
    .delete("/products/delete", {
      data: { id: id, name: name },
    })
    .then((res) => {
      result = true;
      return res.data;
    })
    .catch((err) => {
      result = false;
      return err.response.data;
    });
  return { result: result, message: res.message };
};
