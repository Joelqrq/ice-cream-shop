import { instance } from "./axios.config";
import { userStore } from "../stores/user.store";

export const create = async (values) => {
  const res = await instance
    .post("/products/create", values, {
      headers: {
        Authorization: userStore.user.accessToken,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
};

export const read = async () => {
  const res = await instance
    .get("/products/read", {
      headers: {
        Authorization: userStore.user.accessToken,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return res;
};

export const update = async (id, values) => {
  const product = {
    id: id,
    ...values,
  };
  const res = await instance
    .put("/products/update", product, {
      headers: {
        Authorization: userStore.user.accessToken,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
};

export const deleteProduct = async ({ id, name }) => {
  const res = await instance
    .delete("/products/delete", {
      headers: {
        Authorization: userStore.user.accessToken,
      },
      data: { id: id, name: name },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
};
