import React from "react";
import { AppBar, Toolbar, Typography, InputBase } from "@mui/material";
import './Header.css';

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GN-Works
        </Typography>
        <div>
          {/* Add your search input here */}
          <InputBase placeholder="Search..." />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
