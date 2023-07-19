import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Home } from '@mui/icons-material';
import { NavLink, Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../App.css'
const Sidebar = () => {

  
  const buttonStyle = {
    width: '4vw', 
    height: '4vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  };
  console.log("rendering sidebar")
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
      <div style={{height: '100vh', width: '4vw', borderRight: '2px solid grey', position: 'fixed', flex: 1, flexDirection: 'column'}}>
        <h2>W</h2>
        {/* folder navigation div */}
        <div>
          <NavLink to="/files" style={buttonStyle}>
            Home
          </NavLink>
        </div>

        {/* settings navigation div positioned at the bottom of the screen*/}
        <div style={{ position: 'absolute', bottom: '4vh' }}>
          <NavLink to="/account" style={buttonStyle} >
            <AccountCircleIcon fontSize='large'/>
          </NavLink>
        </div>

      </div>
      <div style={{ flexGrow: 1, paddingLeft: '4vw',  }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar; 