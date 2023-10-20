"use client";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import { style } from "@/app/styles/modal-auth/modalStyle";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { FirebaseAuth } from "../../utils/Firebase-auth";

const logIn = (props) => {
  const { open, handleClose, setIsAuthenticated, isAuthenticated } = props;

  // In this section, we import functions from the 'firebase-auth' file
  // and use them to set up user authentication. We're also passing the 'setIsAuthenticated'
  // function from this component to allow communication between the two components.
  const {
    signInWithGoogle,
    signInWithGithub,
    email,
    setEmail,
    password,
    setPassword,
    signInEmailAndPassword,
  } = FirebaseAuth(setIsAuthenticated);

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

export default logIn;
