import React from "react";
import { Helmet } from "react-helmet";
import { AppLayout } from "./components/AppLayout";
import "./App.css";

export const App = () => {
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="description" content="Jim's Ice Cream Shop" />
        <link rel="canonical" href="" />
        <title>Jim's Ice Cream Shop</title>
        <script defer src="/__/firebase/8.6.2/firebase-app.js"></script>
        <script defer src="/__/firebase/init.js?useEmulator=true"></script>
      </Helmet>
      <AppLayout />
    </>
  );
};
