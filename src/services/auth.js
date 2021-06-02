import cryptoRandomString from "crypto-random-string";
import base64url from "base64url";
import { userStore } from "../stores/user.store";

export const generateRandomString = () => {
  return cryptoRandomString({ length: 43, type: "url-safe" });
};

export const login = (redirect) => {
  const randomString = generateRandomString();
  const state = base64url.encode(
    JSON.stringify({ randomString: randomString, redirect_uri: redirect })
  );
  window.location.replace(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://ice-cream-inventory.herokuapp.com"
    }/v1/api/auth/login?state=${state}`
  );
};

export const redirectToLogin = (status, message, redirect, history) => {
  if (status === 401) {
    userStore.user = null;
    history.push("/login", { message: message, from: { pathname: redirect} });
    return true;
  }
  return false;
};
