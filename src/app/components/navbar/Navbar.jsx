"use client";
import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Stack } from "@mui/material";
import LogIn from "../authentication/LogIn";
import dynamic from "next/dynamic";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const SignOutUser = dynamic(() => import("../authentication/SignOut"));

  const [open, setOpen] = useState(false); // For sign up modal

  // Initialize to open the sign in when the button is click
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                  spacing={1}
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
    </div>
  );
};

export default Navbar;
