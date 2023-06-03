import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FcGoogle } from "react-icons/fc";
import AppleIcon from "@mui/icons-material/Apple";
import { Link } from "react-router-dom";
import Joi from "joi";
import styles from "./SignIn.module.css";
import { FaTwitter } from "react-icons/fa";
import swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../component/recoil/atom";

function TwitterLogin() {
  const setAuth = useSetRecoilState(authAtom);
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = { username, password };
    const { error } = schema.validate(data);
    if (error) {
      setError(error.message);
      return;
    }
    const userdata = JSON.parse(localStorage.getItem("userdata")) || [];
    console.log(userdata);
    const existingUser = userdata.find(
      (user) => user.email === username && user.password === password
    );

    if (existingUser === undefined) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User not found!",
      });
      return;
    }

    // localStorage.setItem("logedUser", JSON.stringify(data));

    setAuth({
      isLoggedIn: true,
      user: {
        ...existingUser,
      },
    });
    swal.fire({
      icon: "success",
      title: "😎😎😎😎 ",
      text: "Logged In!",
      // footer: '<a href="">Why do I have this issue?</a>'
    });
    // setTimeout(() => {
      Navigate("/");
    // }, 2000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <Box className={styles.box}>
        <div className={styles.cancelButton}>
          <Link to={"/signup"}>
            <CloseIcon />
          </Link>
        </div>

        <FaTwitter className={styles.logo} />
        <h1 className={styles.title}>Sign in to Twitter</h1>
        <div className={styles.socialButtonsContainer}>
          <Button className={styles.googleButton} startIcon={<FcGoogle />}>
            Sign in with Google
          </Button>
          <Button
            className={styles.appleButton}
            startIcon={<AppleIcon style={{ color: "black" }} />}
          >
            Sign in with Apple
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <Box className={styles.inputContainer}>
            <TextField
              id="username"
              label="Phone, Email or Username"
              variant="filled"
              value={username}
              onChange={handleUsernameChange}
              className={styles.inputField}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="filled"
              value={password}
              onChange={handlePasswordChange}
              className={styles.inputField}
            />
          </Box>
          {error && <p className={styles.error}>{error}</p>}
          <br />
          <Button
            type="submit"
            variant="contained"
            className={styles.SubmitButton}
          >
            Submit
          </Button>
          <br />
          <Button
            type="button"
            variant="text"
            className={styles.forgotPasswordButton}
          >
            Forgot Password?
          </Button>
        </form>
        <div className={styles.signupContainer}>
          <p>
            Don't have an account? <Link to={"/signup"}>Sign up</Link>
          </p>
        </div>
      </Box>
    </div>
  );
}

export default TwitterLogin;
