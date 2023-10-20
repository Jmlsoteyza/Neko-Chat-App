"use client";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

//This component file is only for typography and designs

const Hero = () => {
  return (
    <Container
      sx={{
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          color: "white",
          textAlign: "center",
          marginTop: 25,
          fontFamily: "fantasy",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontSize: "70px", fontFamily: "inherit" }}
        >
          Welcome to <span style={{ color: "#551A8B" }}>Neko-Chat</span>
        </Typography>
        <Typography
          variant="h5"
          color="#E1E1E1"
          fontFamily="inherit"
          sx={{ mt: 1 }}
        >
          Sign in to join our chat!
        </Typography>
        <Typography variant="body1" sx={{ color: "#A4A4A4", mt: 1 }}>
          Developed by Jomarie Luis Oteyza
        </Typography>
      </Box>
    </Container>
  );
};

export default Hero;
