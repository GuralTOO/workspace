import React, { useEffect, useState } from 'react';
import { FileTextIcon, CaretSortIcon, Cross2Icon } from '@radix-ui/react-icons';
import './File.css' 
import './accordion.css'
import { Box, Card, Separator, Text, Flex } from '@radix-ui/themes'
import FileDetails from './FileDetails';


const File = ({ fileName, onFileClick, filePath }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [heightMini, setHeightMini] = useState(150);

  

  useEffect(() => {
    setHeightMini(expanded ? 0 : 150);
    console.log('expanded: ', expanded)
  }, [expanded]); 

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

  return (
    <Box size="1" variant="surface" 
      className="like-a-card"       
    >
      <div 
        className = "file-mini"
        style={{height: heightMini}}
        onClick={handleClick} 
      >
        <div className='file-icon'>
          <FileTextIcon style={{size: "large"}}/>
        </div>
      </div>
      <Separator size="4" mb="2" />
      <FileDetails fileName={fileName} setExpanded={setExpanded} filePath={filePath}/>
    </Box>
  );
};

export default File;


