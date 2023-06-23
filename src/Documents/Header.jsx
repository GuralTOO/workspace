import React from "react";
import { AppBar, Toolbar, Typography, InputBase } from "@mui/material";
import './Header.css';

const Header = () => {
  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        <Typography variant="h6" paddingLeft={"60px"}>
          Workspace
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
