import React, { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, Button } from "@mui/material";
import './Header.css';
import { NavLink, useLocation, useParams } from 'react-router-dom';


const PathElement = ({path, folder, index}) => {
  const calc_path = (index) => {
    let path_to_folder = '';
    for (let i = 0; i <= index; i++) {
      path_to_folder += path.split('/')[i];
      if (i !== index) {
        path_to_folder += '/';
      }
    }
    return path_to_folder;
  }

  return (
    <div style={{display: "flex", alignItems: 'center'}}>
      <p>{" > "}</p>
      <NavLink key={index} to={`/files/${calc_path(index)}`} style={{color: 'white', textDecoration: 'none'}}>
      { 
        index === path.split('/').length - 1 ?
        <u style={{marginLeft: "12px", marginRight: "12px"}}>{folder}</u>
        :
        <p style={{marginLeft: "12px", marginRight: "12px"}}>{folder}</p>
      }
      </NavLink>
    </div>
  )
}

const Header = ({path}) => {

  
  return (
    <AppBar position="static" className="app-bar">
      <div style={{height: '44px', paddingTop: "12px", background: 'transparent', display: 'flex', justifyContent: 'left', alignItems: 'center', flexDirection: 'row', position: 'relative'}}> 
        { 
          <NavLink to={`/files`} style={{color: 'white', textDecoration: 'none'}}>
            {/* if path is empty, underline Home */}
            {
              path === '' ?
              <u style={{marginLeft: "12px", marginRight: "12px"}}>Home </u>
              :
              <p style={{marginLeft: "12px", marginRight: "12px"}}>Home </p>
            }
          </NavLink>
        }
        {
          path && 
          path.split('/').map((folder, index) => (            
            <PathElement key = {index} path={path} folder={folder} index={index} />
          ))
        }
      </div>
    </AppBar>
  );
};

export default Header;
