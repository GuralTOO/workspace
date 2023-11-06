import React from 'react';
import FolderIcon from "@mui/icons-material/FolderOutlined";
import { useNavigate, Link, NavLink } from 'react-router-dom';
import "./Folder.css";
import "./File.css"
// import * as Separator from '@radix-ui/react-separator';
import { Card, Separator, Text, Box } from '@radix-ui/themes';

const Folder = ({ folderName, folderPath }) => {
  // set folderPath equal to the current path without the userID in front
  const shortFolderPath = folderPath.substring(folderPath.indexOf("/")+1);

  const handleFolderClick = () => {
    console.log("folder selected: ", folderName);
  };

  return (
    // <div className='file-mini-outside'>
    <Box size="1" variant="surface" className="like-a-card">
      <NavLink to={shortFolderPath} >
        <div className = "file-mini"> 
          <div className='folder-icon'>
            <FolderIcon fontSize="inherit" color="success" />
          </div>
        </div>   
      </NavLink>
      <Separator size="4" mb="2" />
      {/* <Separator.Root className="SeparatorRoot" /> */}
      <Text trim color="gray" highContrast>
        {folderName}
      </Text>
    </Box>

  );
};

export default Folder;
