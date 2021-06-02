import React from "react";
import styled from "styled-components";
import { ContentLayout } from "./ContentLayout";
import { Login } from "../pages/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Callback } from "./Callback";

const StyledAppLayout = styled.div`
  background-color: #fafcff;
`;

export const AppLayout = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/callback">
          <Callback />
        </Route>
        <Route path="/">
          <StyledAppLayout>
            <ContentLayout />
          </StyledAppLayout>
        </Route>
        <Route path="/*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
