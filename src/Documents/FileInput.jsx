import { useRef, useEffect } from 'react';

const FileInput = ({ onUpload, uploading }) => {
    const fileInputRef = useRef(null);
  
    useEffect(() => {
        if (fileInputRef.current){
            fileInputRef.current.click();
            const handleFocus = () => {
                if (fileInputRef.current.files.length !== 0) {
                    onUpload({ target: { files: fileInputRef.current.files } });
                }
                // clean up the event listener
                window.removeEventListener('focus', handleFocus);
            };
            window.addEventListener('focus', handleFocus, { once: true });
        }
    }, [onUpload]);
  
    return (
      <input
        ref={fileInputRef}
        accept='.pdf'
        id="contained-button-file"
        multiple
        type="file"
        hidden
        disabled={uploading}
      />
    );
};

export default FileInput;
