// useFileList.js
import { useEffect, useState, useCallback } from 'react';
import { getFiles } from '../utils/utils';

export const useFileList = (fullPath) => {
  const [files, setFiles] = useState([]);
  const fetchFiles = useCallback(() => {
    getFiles(fullPath).then((files) => {
      setFiles([{}, ...files]);
    });
  }, [fullPath]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, fetchFiles };
}
