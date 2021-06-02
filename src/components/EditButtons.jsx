import { Button, styled } from "@material-ui/core";

export const UpdateButton = styled(Button)({
  display: "flex",
  width: "15ch",
  height: "3rem",
  margin: "1rem",
  marginRight: "0",
  color: "white",
  background: "#0A9396",
  "&:hover": {
    background: "#94D2BD",
  },
});

export const DeleteButton = styled(Button)({
  display: "flex",
  width: "15ch",
  height: "3rem",
  margin: "1rem",
  marginRight: "0",
  color: "white",
  background: "#ce382a",
  "&:hover": {
    background: "#ec6155",
  },
});

