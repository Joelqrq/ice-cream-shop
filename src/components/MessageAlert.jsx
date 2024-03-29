import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

export const MessageAlert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
