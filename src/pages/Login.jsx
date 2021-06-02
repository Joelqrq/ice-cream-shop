import React from "react";
import { useLocation, Redirect } from "react-router-dom";
import { login } from "../services/auth";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { userStore } from "../stores/user.store";

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: whitesmoke;

  .title {
    color: #001219;
    margin-bottom: 2rem;
  }
`;

export const Login = () => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  return userStore.user ? <Redirect to={from.pathname} /> : (
    <StyledLogin>
      <Typography variant="h4" component="h1" className="title">
        Welcome to Jim's Ice Cream Inventory
      </Typography>
      <Button
        onClick={() => login(from.pathname)}
        variant="contained"
        color="secondary"
      >
        Login with Google
      </Button>
    </StyledLogin>
  );
};
