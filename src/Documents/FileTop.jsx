// import React, { useEffect, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import {supabase} from '../supabaseClient';
// import './File.css'
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// const FileTop = ({ filePath }) => {
//   const [pdfDocument, setPdfDocument] = useState(null);
//   const [numPages, setNumPages] = useState(null);

//   useEffect(() => {
//     const fetchPdfDocument = async () => {
//       try {
//         console.log("loading from: ", filePath)
//         const { data, error } = await supabase.storage.from('documents').download(filePath);
//         if (error) {
//           throw error;
//         }
//         const url = URL.createObjectURL(data);
//         console.log("url: ", url)
//         setPdfDocument(url);
//       } catch (error) {
//         alert('Error fetching the file.');
//         console.error('Error fetching files: ', error);
//       }
//     };

//     fetchPdfDocument();
//   }, []);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     pdfDocument && (
//       <Document
//         file={pdfDocument}
//         onLoadSuccess={onDocumentLoadSuccess}
//         className="pdf-document"
//       >
//         {numPages > 0 && <Page pageNumber={1} width={300}/>}
//       </Document>
//     )
//   );
// };

// export default FileTop;



import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { supabase } from '../supabaseClient';
import './File.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const FileTop = ({ filePath, render }) => {
  const [pdfDocument, setPdfDocument] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const fetchPdfDocument = async () => {
      try {
        console.log("loading from: ", filePath);
        const { data, error } = await supabase.storage.from('documents').download(filePath);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        console.log("url: ", url);
        setPdfDocument(url);
      } catch (error) {
        // alert('Error fetching the file.');
        console.error('Error fetching files: ', error);
      }
    };

    fetchPdfDocument();
  }, [filePath]); // Ensure filePath is a dependency

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    (pdfDocument && render) && (
      <div className="pdf-document">
        <Document
          file={pdfDocument}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {numPages > 0 && (
            <div className="pdf-page-container">
              <Page pageNumber={1}/>
            </div>
          )}
        </Document>
      </div>
    )
  );
};

export default FileTop;
