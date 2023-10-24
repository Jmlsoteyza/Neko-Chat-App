"use client";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { style } from "@/app/styles/modal-auth/modalStyle";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import {
  auth,
  googleProvider,
  githubProvider,
} from "@/app/utils/firebase-config";

const LogIn = (props) => {
  const { open, handleClose, setIsAuthenticated, isAuthenticated } = props;
  const cookies = new Cookies();

  // This state is for sign in method where I returned it and pass to signIn Component.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to sign in a user with email and password
  const signInEmailAndPassword = async () => {
    try {
      const resultToken = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      cookies.set("user-token", resultToken.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to sign in a user with Google authentication
  const signInWithGoogle = async () => {
    try {
      const resultToken = await signInWithGoogle(auth, googleProvider);
      cookies.set("user-token", resultToken.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to sign in a user with GitHub authentication
  const signInWithGithub = async () => {
    try {
      const resultToken = await signInWithPopup(auth, githubProvider);
      cookies.set("user-token", resultToken.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        console.error("Account already exists with a different credential.");
      } else {
        console.error("An error occurred during sign-in:", error);
      }
    }
  };

  //if it's not authenticated render LogIn components otherwise render null
  if (!isAuthenticated) {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ pb: 3 }}>
              <Typography variant="h6">ACCOUNT LOGIN</Typography>
            </Box>
            <Stack spacing={2} direction="column">
              <TextField
                label="Email"
                variant="outlined"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Stack>
            <Typography component="p" fontSize="14px" sx={{ pt: "3.5px" }}>
              Don't have an account?
              <Typography
                component="span"
                color="#0069c2"
                sx={{
                  fontSize: "14px",
                  pl: "2px",
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}
              >
                Signup
              </Typography>
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Stack>
                <Button
                  onClick={signInEmailAndPassword}
                  size="large"
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#131316",
                    "&:hover": {
                      backgroundColor: "#404040",
                    },
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Box>
            <Box textAlign="center" sx={{ mb: 2, mt: 2 }}>
              <Typography component="span">OR</Typography>
            </Box>
            <Box>
              <Stack spacing={2} direction="column">
                <Button
                  onClick={signInWithGithub}
                  sx={{
                    backgroundColor: "#131316",
                    "&:hover": {
                      backgroundColor: "#404040",
                    },
                  }}
                  size="large"
                  variant="contained"
                  startIcon={<GitHubIcon />}
                >
                  Login with Github
                </Button>
                <Button
                  onClick={signInWithGoogle}
                  sx={{
                    backgroundColor: "#131316",
                    "&:hover": {
                      backgroundColor: "#404040",
                    },
                  }}
                  size="large"
                  variant="contained"
                  startIcon={<GoogleIcon />}
                >
                  Login with Gmail
                </Button>
              </Stack>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  }

  return null;
};

export default LogIn;
