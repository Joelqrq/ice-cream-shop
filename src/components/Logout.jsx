import React from "react";
import { Link } from "react-router-dom";

export const Logout = () => {
  
  return (
    <Link
      to={{
        pathname: "/login",
      }}
    />
  );
};
