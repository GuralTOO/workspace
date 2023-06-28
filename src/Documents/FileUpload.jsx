import { useState } from 'react';
import { addFile } from '../utils/utils';

//UI
import { Button, CircularProgress, Box } from '@mui/material';


const FileUpload = ({folderPath, onUpload}) => {
  const [uploading, setUploading] = useState(false);
  console.log(folderPath + " is the folder path")

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    console.log(fileName)

    // set const filePath equal to the user's id +'/' + the file name
    const filePath = `${folderPath}/${fileName}`;
    setUploading(true);
    await addFile(filePath, file);

    setUploading(false);
    onUpload();
  }

  return (
    <Box>
      <p style={{color: 'white'}}>Upload your file</p>
      <input
        accept="*/*"
        id="contained-button-file"
        multiple
        type="file"
        hidden
        onChange={uploadFile}
        disabled={uploading}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      {uploading && <CircularProgress />}
    </Box>


    // <div>
    //   <p style={{color: 'white'}}>upload your file</p>
    //   <input type="file" onChange={uploadFile} disabled={uploading} />
    //   {uploading && <p>Uploading...</p>}
    // </div>
  );
}

export default FileUpload;
