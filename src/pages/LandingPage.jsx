import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { read } from "../services/crud";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { MessageAlert } from "../components/MessageAlert";
import { redirectToLogin } from "../services/auth";

export const LandingPage = () => {

  const [snackbarState, setSnackbarState] = useState({});
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({ state: false });
  };

  const [products, setProducts] = useState([]);
  const [result, setResult] = useState({});

  const handleResultClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setResult({ state: false });
  };

  const history = useHistory();
  const location = useLocation();

  const handleRowClick = (product) => {
    history.push(`/edit/${product.name}`, product);
  };

  useEffect(() => {
    setSnackbarState({
      state: location.state !== undefined,
      message: location.state,
    });

    let didCancel = false;
    const fetchProducts = async () => {
      if (!didCancel) {
        const res = await read();
        if (redirectToLogin(res.status, res.message, location.pathname, history)) return;

        if (res.products) {
          setProducts(res.products);
          return;
        }
        setResult({ state: true, message: res.message });
      }
    };

    fetchProducts();

    return () => {
      didCancel = true;
    };
  }, [location, history]);

  return products.length === 0 && !result.message ? (
    <StyledLandingPage>
      <CircularProgress size="5rem" className="load-heading" />
    </StyledLandingPage>
  ) : (
    <StyledLandingPage>
      <Typography
        variant="h5"
        component="h1"
        align="center"
        noWrap
        className="table-title"
      >
        List of Ice cream
      </Typography>
      <TableContainer
        component={Paper}
        elevation={3}
        className="table-container"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" key="name">
                Name
              </TableCell>
              <TableCell align="center" key="flavor">
                Flavor
              </TableCell>
              <TableCell align="center" key="quantity">
                Quantity
              </TableCell>
              <TableCell align="center" key="price">
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow key="no">
                <TableCell align="center" colSpan={4}>
                  No ice creams in database
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className="table-row"
                  hover
                  onClick={() => handleRowClick(product)}
                >
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.flavor}</TableCell>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">{`$${product.price}`}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        className="add-button"
        component={Link}
        to={{ pathname: "/create" }}
      >
        Add ice cream
      </Button>
      <Snackbar
        open={result.state}
        autoHideDuration={6000}
        onClose={handleResultClose}
      >
        <MessageAlert severity="error" onClose={handleResultClose}>
          {result.message}
        </MessageAlert>
      </Snackbar>
      <Snackbar
        open={snackbarState.state}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <MessageAlert severity="success" onClose={handleSnackBarClose}>
          {snackbarState.message}
        </MessageAlert>
      </Snackbar>
    </StyledLandingPage>
  );
};

const StyledLandingPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .load-heading {
    color: #0a9396;
  }

  .table-title {
    width: 45ch;
    font-weight: 500;
  }

  .table-container {
    min-width: 65ch;
    width: 45%;
    max-height: 55%;
    margin: 1.7rem;
  }

  .table-row {
    cursor: pointer;
  }

  .add-button {
    width: 45ch;
    color: white;
    background: #0a9396;
    &:hover {
      background: #94d2bd;
    }
  }
`;
