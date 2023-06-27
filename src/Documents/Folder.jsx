import React from 'react';
import FolderIcon from "@mui/icons-material/FolderOutlined";
import { useNavigate, Link } from 'react-router-dom';
import "./Folder.css";

const Folder = ({ folderName, folderPath }) => {
  // set folderPath equal to the current path without the userID in front
  const shortFolderPath = folderPath.substring(folderPath.indexOf("/")+1);

  const handleFolderClick = () => {
    console.log("folder selected: ", folderName);
  };

  const MAX_FILENAME_LENGTH = 12; // Adjust the calculations as needed

  const truncatedFileName = folderName.length > MAX_FILENAME_LENGTH
    ? folderName.substring(0, MAX_FILENAME_LENGTH) + "..."
    : folderName;

  return (
    <Link to={shortFolderPath}>
      <div className = "folder-mini">
        <div className='folder-icon'>
          <FolderIcon fontSize="inherit" />
        </div>
        <div className='folder-info'>
          <div className="folder-name">{truncatedFileName}</div>
        </div>
      </div>
    </Link>
  );
};

export default Folder;
