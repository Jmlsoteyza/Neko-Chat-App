"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { auth } from "@/app/utils/firebase-config";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

const cookies = new Cookies();

export default function SignOutUser({ setIsAuthenticated }) {
  const [name, setName] = useState(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("user-token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Update name only if it's not already set
    if (!name) {
      setName(auth?.currentUser?.displayName);
    }
  }, [name]);

  return (
    <Box component="div" sx={{ display: "flex", gap: "25px" }}>
      <Stack direction="row" component="div">
        <Typography variant="h6" component="h6">
          {name}
        </Typography>
      </Stack>
      <Button
        onClick={signUserOut}
        variant="outlined"
        sx={{
          background: "#fff",
          color: "#111",
          paddingInline: "10px",
          "&:hover": {
            color: "#fff",
          },
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
}
