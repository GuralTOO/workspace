import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// support pdf rendering
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// support text selection
import 'react-pdf/dist/esm/Page/TextLayer.css';
// support annotation layer (urls)
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


import {supabase} from '../supabaseClient';
import './File.css'
import File from './File';

const FileItem = ({filePath, file }) => {
  //new stuff to render a pop-up pdf
  const [totalPages, setTotalPages] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [pdfDocument, setPdfDocument] = useState(null);

  const handleFileSelect = () => {
    openModal();
  }

  // #region handling clicking outside of the pdf to close it
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal()
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    // add a delay of 0.2 seconds before adding the listener to allow the pdf to open
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  //#endregion

  const openModal = async () => {
    console.log("trying to download file")
    console.log(filePath)
    const { data, error } = await supabase.storage.from('documents').download(filePath);
    if (error) {
      alert('Error fetching the file.');
      console.error('Error fetching files: ', error);
    } else {
      const url = URL.createObjectURL(data)
      console.log("Got the file at " + url);
      
      // new implementation
      setPdfDocument(url);
      pdfjs.getDocument(url).promise.then((pdfDocument) => {
        setTotalPages(pdfDocument.numPages);
      });     
    }
    setIsOpen(true);
  }

  const closeModal = () => {
    setTimeout(() => {
      setPdfDocument(null);
      setIsOpen(false);
    }, 150)
  }

  return (
    <div > 
      <File key={file.id} fileName={file.name} onFileClick={handleFileSelect}/>
      {/* new pdf rendering onto a pop-up */}
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <Document file={pdfDocument} >
              {Array.from(new Array(totalPages), (el, index) => (
                <Page 
                  key={`page_${index + 1}`} 
                  pageNumber={index + 1} 
                  devicePixelRatio={window.devicePixelRatio}
                  width={window.screen.width * 0.5}
                />
              ))}
            </Document>
            <button onClick={(e) => {e.stopPropagation(); closeModal();}}>Close</button>
          </div>
        </div>
        )}
    </div>
  );
}

export default FileItem;
