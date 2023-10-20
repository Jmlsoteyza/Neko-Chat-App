"use client";

import React from "react";
import { style } from "@/app/styles/modal-auth/modalStyle";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FirebaseAuth } from "@/app/utils/Firebase-auth";

const Signup = ({
  newUserOpen,
  isAuthenticated,
  handleNewUserClose,
  setIsAuthenticated,
}) => {
  const {
    newUserEmail,
    newUserPassword,
    setNewUserEmail,
    setNewUserPassword,
    signUp,
  } = FirebaseAuth(setIsAuthenticated);

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
