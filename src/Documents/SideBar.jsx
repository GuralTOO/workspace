import React, { useEffect, useState, useCallback } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Folder, Home } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getFiles } from '../utils/utils';
import '../App.css'
import { Button } from '@mui/material';
const Sidebar = ({userID}) => {

  
  const buttonStyle = {
    width: '100%', 
    height: '4vh', 
    display: 'flex', 
    justifyContent: 'left', 
    alignItems: 'center',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: '1px solid black',
    borderRadius: '1px',
    color: 'white',
    // make the button background color change when hovered over
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }


  };
  console.log("rendering sidebar")

  const [outerFolders, setOuterFolders] = useState([]);
  const fetchFiles = useCallback(() => {
    getFiles(userID).then((files) => {
      // if a file does not have an extension, add it to the outerFolders array
      setOuterFolders(files.filter((file) => !file.name.includes('.')));
    });
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);


  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));


  if (isSmallScreen) {
    // Render a different layout for small screens
    return (
      <div style = {{flex: 1, flexDirection: "column"}}>
        <div style={{marginBottom: '60px'}}>
          <Outlet />
        </div>
        <div style={{width: '100vw', height: '4vh', borderTop: '2px solid grey', position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'space-between'}}>
          <NavLink to="/files" style={{...buttonStyle, marginLeft: '15px'}}>
            <Home />
          </NavLink>
          <NavLink to="/account" style={{...buttonStyle, marginRight: '15px'}}>
            <AccountCircleIcon />
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div style = {{flex: 1, flexDirection: "row", position: 'relative'}}>
      <div style={{height: '100vh', width: '150px', borderRight: '2px solid grey', position: 'fixed', flex: 1, flexDirection: 'column'}}>
        <h2>W</h2>
        {/* folder navigation div */}
        <div>
          <Button style={buttonStyle} component={NavLink} to="/files" >
            <Home style={{fontSize: 25}}/>
            &nbsp;
            {`Home`}
          </Button>
          {outerFolders.map((folder, index) => (
            // <NavLink key={index} to={`/files/${folder.name}`} >
            <Button key={index} style={buttonStyle} component={NavLink} to={`/files/${folder.name}`} >
              <Folder style={{fontSize: 25}}/>
              {/* add space after the icon */}
              &nbsp;
              {/* if the name is longer than 8, print first five letters and ... else, print the name*/}
              {folder.name.length > 8 ? folder.name.substring(0, 6) + "..." : folder.name}
            </Button>
          ))}

        </div>

        {/* settings navigation div positioned at the bottom of the screen*/}
        <div style={{ position: 'absolute', bottom: '4vh', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <NavLink to="/account">
            <AccountCircleIcon fontSize='large'/>
            <p style={{color: 'white', fontSize: '20px', marginTop: -5}}>Account</p>
          </NavLink>
        </div>

      </div>
      {/* style the div to take the rest of the screen width */}
      <div style={{ flexGrow: 1, marginLeft: '150px'}}>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar; 