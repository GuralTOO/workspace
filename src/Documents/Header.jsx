import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Button } from "@mui/material";
// import { callWeaviate } from "../utils/testFunctions";
import './Header.css';
import useSocket from "../utils/useSocket";
import { useEffect, useState } from "react";

const Header = () => {
  const socket = useSocket("http://127.0.0.1:5001");
  const [serverResponse, setServerResponse] = useState("");
  const [inputText, setInputText] = useState("What is going on?");

  useEffect(() => {
    if (socket) {
      socket.on("searchStream", (msg) => {
        console.log("Received message: ", msg);
        setServerResponse((prev) => prev + msg);
      });
    }
  }, [socket]);

  const sendTextToServer = () => {
    setServerResponse("");
    if (socket && socket.connected) {
      socket.emit("searchStream", {"path": "abc", "query": inputText});
    } else {
      console.error("Socket is not connected");
    }
  };


  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        <Typography variant="h6" paddingLeft={"60px"}>
          Workspace {serverResponse}
        </Typography>
        <Button variant="contained" color="primary" style={{marginLeft: "auto", marginRight: "60px"}} onClick={sendTextToServer}>
          hehe, testing
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
