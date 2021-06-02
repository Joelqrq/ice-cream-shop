import React from "react";
import { Helmet } from "react-helmet";
import { AppLayout } from "./components/AppLayout";
import "./App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const appTheme = createMuiTheme({
  typography: { fontFamily: ["montserrat"] },
});

export const App = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Jim's Ice Cream Shop" />
        <link rel="canonical" href="" />
      </Helmet>
      <ThemeProvider theme={appTheme}>
        <AppLayout />
      </ThemeProvider>
    </>
  );
};
