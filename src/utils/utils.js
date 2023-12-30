import { supabase } from "../supabaseClient";
import {
  uploadToStorage,
  addFileDataToDatabase,
  getSignedURL,
  invokeUploadFunction,
} from "./upload_file_helpers";
// import { extractTextFromPdfWithOCR } from "./ocr";

import {
  deleteFileFromSupabase,
  deleteFileFromVectorDB,
} from "./delete_file_helpers";

export async function addFile(filePath, file, contentType = "research") {
  try {
    const { data, error } = await uploadToStorage(filePath, file);
    if (error) throw new Error("Error uploading file.");

    const userId = filePath.split("/")[0];
    await addFileDataToDatabase(file, contentType, userId, data.path);

    const publicURL = await getSignedURL(filePath);

    // try {
    //   const extractedText = await extractTextFromPdfWithOCR(file);
    //   console.log("extracted text: ", extractedText);
    //   // ... rest of your code ...
    // } catch (err) {
    //   console.error("An error occurred:", err.message);
    // }

    // upload the file to V DB
    const metadata = await invokeUploadFunction(
      filePath,
      publicURL,
      contentType
    );
  } catch (err) {
    console.error("An error occurred:", err.message);
  }
}

export async function deleteFile(filePath) {
  try {
    await deleteFileFromSupabase(filePath);
  } catch (err) {
    console.error("An error occurred:", err.message);
  }
  try {
    console.log("sending delete request to vector db for file: " + filePath);
    await deleteFileFromVectorDB(filePath);
  } catch (err) {
    console.error("An error occurred:", err.message);
  }
}

// function to add a folder to the user's storage
export async function addFolder(folderPath) {
  const fileName = ".tmp";
  const filePath = `${folderPath}/${fileName}`;
  console.log("creating folder: " + folderPath);
  const { data, error } = await supabase.storage
    .from("documents")
    .upload(filePath, new Blob([""]), { upsert: true });

  if (error) {
    console.error("Error creating folder: ", error);
    return;
  }

  // Now that the folder has been created, delete the temporary file
  //   await supabase.storage.from("documents").remove([filePath]);
}

// function to get a list of files and folders in a folder
export async function getFiles(folderPath) {
  const { data, error } = await supabase.storage
    .from("documents")
    .list(folderPath);

  console.log("got files for folder: " + folderPath + " data: ", data);

  if (error) {
    console.error("Error getting files: ", error);
    return;
  }
  return data;
}
