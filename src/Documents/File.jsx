import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import Foldericon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './File.css' 

const File = ({ fileName, onFileClick }) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    // Stop event propagation if the click is on a menu item
    if (event.target.closest('.MuiMenuItem-root')) {
      event.stopPropagation();
      return;
    }
    if(event.button === 0){
      console.log('file selected: ', fileName);
      onFileClick(fileName);
    }
  };
  /* adding a menu button to each file */
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log('Delete action');
    // Handle delete action
    handleMenuClose();
  };

  const handleRename = () => {
    console.log('Rename action');
    // Handle rename action
    handleMenuClose();
  };


  const MAX_FILENAME_LENGTH = 10; // Adjust the calculations as needed

  const truncatedFileName = fileName.length > MAX_FILENAME_LENGTH
    ? fileName.substring(0, MAX_FILENAME_LENGTH) + "..."
    : fileName;

  const fileExtension = fileName.split('.').pop();


  return (
    <div 
      className = "file-mini"
      onClick={handleClick} 
    >
      <div className='file-info'>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleRename}>Rename</MenuItem>
        </Menu>
        <div className="file-icon">
          {fileExtension === 'pdf' ? (
            <DescriptionIcon />          ) : (
            <Foldericon />
          )}
        </div>
        <div className="file-name">{truncatedFileName}</div>
      </div>
    </div>
  );
};

export default File;


