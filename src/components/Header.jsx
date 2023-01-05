import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const findLoggedin = () => {
    return localStorage.getItem("username") !== null;
  };

  const [isLoggedIn, setIsLogggedIn] = useState(findLoggedin());

  const logOut = () => {
    localStorage.clear();
    setIsLogggedIn(false);
    window.location.reload();
    history.push("/");
  };

  const exploreButton = (
    <Button
      className="explore-button"
      startIcon={<ArrowBackIcon />}
      variant="text"
      onClick={() => history.push("/")}
    >
      Back to explore
    </Button>
  );

  const actionBoard = (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Button
        variant="text"
        type="button"
        onClick={() => history.push("/login")}
      >
        Login
      </Button>
      <Button
        variant="contained"
        type="button"
        onClick={() => history.push("/register")}
      >
        Register
      </Button>
    </Stack>
  );

  const userDashboard = (
    <Stack direction="row" alignItems="center" spacing={1}>
      <img src="avatar.png" alt={localStorage.getItem("username")} />{" "}
      <Typography>{localStorage.getItem("username")}</Typography>
      <Button variant="text" type="button" onClick={logOut}>
        Logout
      </Button>
    </Stack>
  );

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      <Box>{children}</Box>
      {hasHiddenAuthButtons && exploreButton}
      {!hasHiddenAuthButtons && isLoggedIn && userDashboard}
      {!hasHiddenAuthButtons && !isLoggedIn && actionBoard}
    </Box>
  );
};

export default Header;
