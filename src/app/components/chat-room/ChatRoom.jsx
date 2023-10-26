"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import "../../styles/Chat.css";

// ChatRoom component that displays chat messages and allows sending new messages
export default function ChatRoom({
  setNewMessage,
  newMessage,
  handleSubmit,
  messages,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "center",
          background: "#111",
        }}
      >
        <Box
          component="div"
          sx={{
            maxWidth: "1450px",
            width: "100%",
            overflowY: "auto",
            flexGrow: 1,
            background: "#111",
            p: "30px",
          }}
        >
          {messages.map((message) => (
            <Stack
              component="div"
              key={message.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                mb: "16px",
              }}
            >
              <Box sx={{ mt: "3px" }}>
                <img
                  src={message.image}
                  width={35}
                  height={35}
                  alt="image-from-social-media"
                />
              </Box>
              <Box>
                <Typography
                  color="#f5f5f5"
                  variant="h6"
                  sx={{ fontSize: "16px" }}
                >
                  {message.user}
                </Typography>
                <Typography
                  sx={{
                    background: "#f5f5f5",
                    borderRadius: "12px",
                    padding: "8.5px",
                    pt: "5px",
                    pb: "5px",
                    textAlign: "center",
                    color: "inherit",
                    display: "inline-block",
                    width: "auto",
                    mt: "8px",
                  }}
                >
                  {message.text}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>

        <Box
          sx={{
            background: "#131316",
            padding: "24px 100px 105px 100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px solid #808080",
            width: "100%",
          }}
        >
          <input
            className="inputMessage"
            style={{
              backgroundColor: "white",
              color: "#111",
              border: "none",
              paddingBlock: "15px",
              paddingInline: "15px",
              width: "100%",
              maxWidth: "950px",
              borderRadius: "4px",
            }}
            type="text"
            placeholder="Send a message..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <Button
            sx={{
              background: "#fff",
              color: "#111",
              paddingInline: "25px",
              ml: "20px",
              "&:hover": {
                color: "#fff",
              },
            }}
            type="submit"
          >
            Send
          </Button>
        </Box>
      </Box>
    </form>
  );
}
