import { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';
import {supabase} from '../supabaseClient';
import './File.css'
import File from './File';

const FileItem = ({filePath, file }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfDocument, setPdfDocument] = useState(null);
  const canvasRef = useRef(null);

  const handleFileSelect = () => {
    openModal();
  }

  const openModal = async () => {
    // Use the JS library to download a file.
    //just debugging supabase:

    // try {
    //   const { data, error } = await supabase.functions.invoke('weaviate-client', {
    //     body: { name: 'master' },
    //   });
    
    //   if (error) {
    //     throw error;
    //   }
    
    //   console.log(data.message);
    // } catch (err) {
    //   console.error('An error occurred:', err);
    // }

    //end debugging supabase
    console.log("trying to download file")
    console.log(filePath)
    const { data, error } = await supabase.storage.from('documents').download(filePath);
    if (error) {
      alert('Error fetching the file.');
      console.error('Error fetching files: ', error);
    } else {
      const url = URL.createObjectURL(data)
      console.log("Got the file at " + url);
      
      pdfjs.getDocument(url).promise.then((pdfDoc_) => {
        setPdfDocument(pdfDoc_);
      });
    }
    setIsOpen(true);
  }

  useEffect(() => {
    if (pdfDocument) {
      pdfDocument.getPage(1).then((page) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.style.width = viewport.width + 'px';
        canvas.style.height = viewport.height + 'px';
        canvas.width = viewport.width * devicePixelRatio * scale;
        canvas.height = viewport.height * devicePixelRatio * scale;
        context.scale(devicePixelRatio * scale, devicePixelRatio * scale);

        page.render({ canvasContext: context, viewport, renderInteractiveForms: true,
            enableTextLayer: true });
      });
    }
  }, [pdfDocument]);

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div > 
      {/* /*className = "file-mini" style={{border: '1px solid white', height: '150px', width: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}}>*/ }
      {/* <p onClick={openModal}>{file.name}</p> */}
      <File key={file.id} fileName={file.name} onFileClick={handleFileSelect}/>
      {isOpen && (
        <div>
          <canvas ref={canvasRef} />
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default FileItem;
