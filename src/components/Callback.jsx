/**
 * Handle redirect after authentication
 */
import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";
import base64url from "base64url";
import { userStore } from "../stores/user.store";

export const Callback = () => {
  const location = useLocation();
  const encodedPayload = queryString.parse(location.search).state;
  const payload = JSON.parse(base64url.decode(encodedPayload));
  const state = JSON.parse(base64url.decode(payload.state));
  const { user, accessToken } = payload;
  userStore.user = {
    name: user.name,
    email: user.email,
    accessToken: accessToken,
  };
  return <Redirect to={{ pathname: state.redirect_uri }} />;
};
