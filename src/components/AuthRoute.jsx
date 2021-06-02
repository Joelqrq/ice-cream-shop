import React from "react";
import { Route, useLocation } from "react-router-dom";
import { login } from "../services/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { userStore } from "../stores/user.store";
import styled from "styled-components";

export const AuthRoute = ({ children, ...props }) => {
  
  const location = useLocation();
  if (!userStore.user) {
    login(location.pathname);
  }

  return (
    <Route
      {...props}
      render={() => {
        return userStore.user ? (
          children
        ) : (
          <StyledLoading>
            <CircularProgress size="5rem" className="load-heading" />
          </StyledLoading>
        );
      }}
    ></Route>
  );
};

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .load-heading {
    color: #0a9396;
  }
`;
