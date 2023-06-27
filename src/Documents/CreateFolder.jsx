import React, { useState } from 'react';
import { CreateNewFolder } from "@mui/icons-material";
import { addFolder } from '../utils/utils';
import "./Folder.css";

const CreateFolder = ({ parentPath, onFolderCreate }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const createFolder = async () => {
    const folderPath = `${parentPath}/${newFolderName}`;
    await addFolder(folderPath);

    setIsCreating(false);
    setNewFolderName("");
    onFolderCreate();
  };

  if (isCreating) {
    return (
      <div className="create-folder-form">
        <input
          type="text"
          placeholder="New Folder"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button onClick={createFolder}>Create</button>
        <button onClick={() => setIsCreating(false)}>Cancel</button>
      </div>
    );
  } else {
    return (
      <div className="folder-mini" onClick={() => setIsCreating(true)}>
        <div className='folder-icon'>
          <CreateNewFolder fontSize="inherit" />
        </div>
        <div className='folder-info'>
          <div className="folder-name">Create a Folder</div>
        </div>
      </div>
    );
  }
};

export default CreateFolder;
