import { useState } from 'react';
import { supabase } from '../supabaseClient';
// Initialize Supabase

const FileUpload = (properties) => {
  const folderPath = properties.folderPath;
  const onUpload = properties.onUpload;
  const [uploading, setUploading] = useState(false);
  console.log(folderPath + " is the folder path")
  const uploadFile = async (event) => {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop();
    const fileName = file.name;
    // set const filePath equal to the user's id +'/' + the file name
    console.log(fileName)
    const filePath = `${folderPath}/${fileName}`;
    setUploading(true);
    console.log("Uploading file..." + filePath)

    const { data, error } = await supabase
      .storage  
      .from('documents')
      .upload(filePath, file);
    
    if (error) {
      alert('Error uploading file.');
      console.error('Error uploading file: ', error);
    }
    else{    
      console.log("file successfully uploaded to " + filePath)
      try {
        let publicURL = '';
        await supabase
          .storage
          .from('documents')
          .createSignedUrl(filePath, 60)
          .then((response) => {
            const signedUrl = response.data.signedUrl;
            console.log('signedUrl:', signedUrl); // Log the signed URL
            publicURL = signedUrl;
          })
          .catch((error) => {
            console.log('Error creating signed URL:', error);
          });
        
        console.log("public url: " + publicURL)
        const { data, error } = await supabase.functions.invoke('weaviate-client', {
          body: { 
            'type': 'pdf',
            'path': filePath, 
            'url': publicURL,
          },
        });
      
        if (error) {
          throw error;
        }
      
        console.log(data);
      } catch (err) {
        console.error('An error occurred:', err);
      }
    }

    setUploading(false);
    onUpload();
  }

  return (
    <div>
      <p style={{color: 'white'}}>upload your file</p>
      <input type="file" onChange={uploadFile} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}

export default FileUpload;
