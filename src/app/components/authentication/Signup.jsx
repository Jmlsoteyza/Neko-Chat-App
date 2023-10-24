"use client";

import React, { useState } from "react";
import { style } from "@/app/styles/modal-auth/modalStyle";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "universal-cookie";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/utils/firebase-config";

const Signup = ({
  newUserOpen,
  isAuthenticated,
  handleNewUserClose,
  setIsAuthenticated,
}) => {
  // This state is for sign up method where I returned it and pass to signUp Component.
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  // export the cookies boolean to check if the web is logged in or not
  const cookies = new Cookies();

  // This a function that is used in firebase to be able to sign in and sign up with different methods
  // Including Github links, Gmail links and your created accounts.
  // And set a user-token to handle the firebase authentication with sign in and sign out

  // Function to sign up a user with email and password
  const signUp = async () => {
    try {
      const resultToken = await createUserWithEmailAndPassword(
        auth,
        newUserEmail,
        newUserPassword
      );
      cookies.set("user-token", resultToken.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <Modal
          open={newUserOpen}
          onClose={handleNewUserClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ pb: 3 }}>
              <Typography variant="h6">Sign Up</Typography>
            </Box>
            <Stack spacing={2} direction="column">
              <TextField
                label="Email"
                variant="outlined"
                type="Email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
              />
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Stack>
                <Button
                  onClick={signUp}
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
                  Sign Up
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

export default Signup;
