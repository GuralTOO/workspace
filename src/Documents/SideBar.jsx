import React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

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

  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  if (isSmallScreen) {
    // Render a different layout for small screens
    return (
      <div style={{width: '100vw', height: '60px', borderTop: '2px solid grey', position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'space-between'}}>
        <Link to="/workspace" style={{...buttonStyle, marginLeft: '15px'}}>
          <FolderIcon />
        </Link>
        <Link to="/account" style={{...buttonStyle, marginRight: '15px'}}>
          <AccountCircleIcon />
        </Link>
      </div>
    );
  }

  return (
    <div style={{height: '100vh', width: '4vw', borderRight: '2px solid grey', position: 'fixed', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Link to="/workspace" style={{...buttonStyle, marginTop: '3vh'}}>
        <FolderIcon />
      </Link>
      <Link to="/account" style={{...buttonStyle, marginBottom: '10vh'}}>
        <AccountCircleIcon />
        </Link>
    </div>
  );
};

export default Sidebar;
