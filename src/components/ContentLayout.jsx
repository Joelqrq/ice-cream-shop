import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import { Create } from "../pages/Create";
import { Edit } from "../pages/Edit";
import { LandingPage } from "../pages/LandingPage";
import { AuthRoute } from "./AuthRoute";

const StyledContentLayout = styled.section`
  display: block;
  width: 100%;
  height: 1000px;
  background-color: #fafcff;
`;

export const ContentLayout = () => {
  return (
    <StyledContentLayout>
      <Switch>
        <AuthRoute exact path="/">
          <LandingPage/>
        </AuthRoute>
        <AuthRoute exact path="/create">
          <Create />
        </AuthRoute>
        <AuthRoute path="/edit">
          <Edit/>
        </AuthRoute>
        <Route path="/*">
            <Redirect to="/" />
        </Route>
      </Switch>
    </StyledContentLayout>
  );
};
