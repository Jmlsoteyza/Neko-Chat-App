"use client";
import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Stack } from "@mui/material";
import LogIn from "../authentication/LogIn";
import dynamic from "next/dynamic";
import Signup from "../authentication/Signup";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const SignOutUser = dynamic(() => import("../authentication/SignOut"));

  const [newUserOpen, setNewUserOpen] = useState(false); // Boolean function for sign up modal
  const [open, setOpen] = useState(false); // Boolean function for sign in modal

  // Initialize to open the sign in when the button is clicked

  //I used this handle open for signIn to open up the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //And this is for signUp modal
  const handleNewUserOpen = () => setNewUserOpen(true);
  const handleNewUserClose = () => setNewUserOpen(false);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#131316",
            paddingBlock: "7.5px",
            pb: "10px",
            pt: "10px",
            borderBottom: "1px solid #808080",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: 980,
                width: "100%",
              }}
              component="div"
              variant="div"
            >
              <Typography variant="h6">Neko-Chat-App</Typography>
              {!isAuthenticated ? (
                <Stack
                  direction="row"
                  spacing={1.5}
                  component="div"
                  variant="div"
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleOpen}
                  >
                    Sign in
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      background: "#fff",
                      color: "#111",
                      paddingInline: "15px",
                      "&:hover": {
                        color: "#fff",
                      },
                    }}
                    onClick={handleNewUserOpen}
                  >
                    Sign up
                  </Button>
                </Stack>
              ) : (
                <SignOutUser setIsAuthenticated={setIsAuthenticated} />
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {open && (
        <LogIn
          handleClose={handleClose}
          open={open}
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
        />
      )}
      {newUserOpen && (
        <Signup
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
          newUserOpen={newUserOpen}
          handleNewUserClose={handleNewUserClose}
        />
      )}
    </div>
  );
};

export default Navbar;
