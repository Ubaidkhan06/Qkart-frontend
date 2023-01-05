import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

import { Link, useHistory } from 'react-router-dom'



const ProgBar = () => {
  return (
    <Box display="flex"
      alignItems="center"
      justifyContent="center">
      <CircularProgress color="success" />
    </Box>
  )
}




const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState('')

  const [isCompleted, setCompleted] = useState(false)

  const history = useHistory()

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  const [password, setPassword] = useState('')

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }


  const [confirmPassword, setConfirmPassword] = useState('')

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }



  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */

  const register = async (formData) => {
    // console.log(formData)

    let data = {
      'username': username,
      'password': password,
      // 'confirmPassword': confirmPassword
    }

    let data1 = { ...data, 'confirmPassword': confirmPassword }

    // console.log(data1)

    if (validateInput(data1)) {
      setCompleted(true)
      try {
        let res = await axios.post(config.endpoint + '/auth/register', data)
        if (res.status === 201) {
          enqueueSnackbar('Registered successfully', { variant: 'success' })
          setCompleted(false)
          history.push('/login')
        }
      } catch (error) {
        // console.log(error.response.status)
        if (error.response.status === 400) {
          enqueueSnackbar('Username is already taken', { variant: 'error' })
          setCompleted(false)
        } else {
          enqueueSnackbar('Something went wrong', { variant: 'error' })
          setCompleted(false)
        }
      }
    }
  };


  // TODO: CRIO_TASK_MODULE_REGISTER -   Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    let flag = true
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: 'warning' })
      flag = false
    } else if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", { variant: 'warning' })
      flag = false
    } else if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: 'warning' })
      flag = false
    } else if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: 'warning' })
      flag = false
    } else if (data.password !== data.confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'warning' })
      flag = false
    }
    return flag
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handlePassword}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={handleConfirmPassword}
          />

          {isCompleted ? (<Button sx={{ display: 'none' }} display='block' className="button" onClick={register} variant="contained">
            Register Now
          </Button>) : (<Button display='block' className="button" onClick={register} variant="contained">
            Register Now
          </Button>)}


          {isCompleted ? <ProgBar /> : null}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box >
  );
};

export default Register;
