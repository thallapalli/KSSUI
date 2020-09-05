import React, { useState } from "react";
import { Button, Paper, Box, TextField, Typography } from "@material-ui/core";
import { authenticate } from "./authenticate";

import logo from "./logo.PNG";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const [userPassword, setUserPassword] = useState("");
  const [userPasswordError, setUserPasswordError] = useState("");

  const [loginError, setLoginError] = useState("");

  const handleUsernameChange = (event) => {
    if (!event.target.value) {
      setUserName("");
      setUserNameError("Please enter username");
      return;
    }
    setUserName(event.target.value);
    setUserNameError("");
  };

  const handleUserPasswordChange = (event) => {
    if (!event.target.value) {
      setUserPassword("");
      setUserPasswordError("Please enter password");
      return;
    }
    setUserPassword(event.target.value);
    setUserPasswordError("");
  };

  const handleLoginClick = () => {
    if (!userName) {
      setUserNameError("Please enter username");
      return;
    }

    if (!userPassword) {
      setUserPasswordError("Please enter password");
      return;
    }
    authenticate(userName, userPassword)
      .then((response) => {
        if (response && response.errorMessage) {
          setLoginError(response.errorMessage);
          return;
        }
        // do task when user login successful
      })
      .catch(() => {
        setLoginError(
          "There was some problem signing you in. Please try again."
        );
      });
  };

  const handleResetClick = () => {
    setUserName("");
    setUserNameError("");
    setUserPassword("");
    setUserPasswordError("");
    setLoginError("");
  };

  const handleForgotPasswordClick = () => {
    console.log("Forgot Password");
  };

  const handleSignupClick = () => {
    console.log("SignUp");
  };

  return (
    <Box component="div" p={2} width={200} margin="auto">
      <img src={logo} alt="Logo" style={{ width: "100px" }} />
      <Paper>
        <Box component="div" p={1}>
          <Typography variant="h6">Sign in</Typography>
          <Typography color="error" variant="body2">
            {loginError}
          </Typography>
          <Box component="div" pt={1} textAlign="center">
            <TextField
              id="standard-basic"
              label="Username"
              width={"auto"}
              error={!!userNameError}
              helperText={userNameError}
              value={userName}
              onChange={handleUsernameChange}
            />
          </Box>
          <Box component="div" pt={1} textAlign="center">
            <TextField
              id="standard-basic"
              label="Password"
              error={!!userPasswordError}
              helperText={userPasswordError}
              onChange={handleUserPasswordChange}
              value={userPassword}
              type="password"
            />
          </Box>
          <Box component="div" pt={2} textAlign="center">
            <Button
              size="small"
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleLoginClick}
            >
              Login
            </Button>
            &nbsp;
            <Button
              size="small"
              variant="contained"
              disableElevation
              onClick={handleResetClick}
            >
              Reset
            </Button>
          </Box>
          <Box component="div" pt={2} textAlign="center">
            <Button size="small" onClick={handleForgotPasswordClick}>
              Forgot Password
            </Button>
          </Box>
          <Box component="div" pt={0.5} textAlign="center">
            <Button size="small" onClick={handleSignupClick}>
              Create Account
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
