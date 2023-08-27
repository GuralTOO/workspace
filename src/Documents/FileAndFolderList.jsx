// FileAndFolderList.jsx
import FileItem from './FileItem';
import Folder from './Folder';
import CreateFolder from './CreateFolder';

export const FileAndFolderList = ({ files, fullPath, fetchFiles }) => {
  return (
    <div className="file-list-container">
        {files.map((file, index) => (
            index === 0 ? <CreateFolder parentPath={fullPath} onFolderCreate={fetchFiles  } /> 
            : file.name.includes(".pdf") ? 
            <FileItem key={`${file.id}-${index}`} file={file} filePath={fullPath+'/'+file.name} /> 
            : <Folder key={`${file.id}-${index}`} folderName={file.name} folderPath = {fullPath+'/'+file.name}/>
        ))}
    </div>
  );
}
