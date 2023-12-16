import { supabase } from "../supabaseClient";
import {
  uploadToStorage,
  addFileDataToDatabase,
  getSignedURL,
  invokeUploadFunction,
} from "./upload_file_helpers";

export async function addFile(filePath, file, contentType = "research") {
  try {
    const { data, error } = await uploadToStorage(filePath, file);
    if (error) throw new Error("Error uploading file.");

    const userId = filePath.split("/")[0];
    await addFileDataToDatabase(file, contentType, userId, data.path);

    const publicURL = await getSignedURL(filePath);

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

async function deleteFileFromSupabase(filePath) {
  const { data, error } = await supabase
    .from("doc_data")
    .delete()
    .eq("path", filePath);

  if (error) {
    console.error("Detailed error:", error);
    throw new Error("Error deleting row.");
  }
  const { data: function_data, error: function_error } = await supabase.storage
    .from("documents")
    .remove([filePath]);

  if (function_error) {
    console.error("Detailed error:", function_error);
    throw new Error("Error deleting file.");
  }
}

async function deleteFileFromVectorDB(filePath) {
  // call the delete api endpoint on private server url = 'https://filestore.visionproje.com/delete'
  const body = { path: filePath };
  const response = await fetch("https://filestore.visionproje.com/delete", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.error) {
    console.error("Detailed error:", data.error);
    throw new Error("Error deleting file.");
  }
}

export async function deleteFile(filePath) {
  // try {
  //   await deleteFileFromSupabase(filePath);
  // } catch (err) {
  //   console.error("An error occurred:", err.message);
  // }
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

  if (error) {
    console.error("Error getting files: ", error);
    return;
  }
  return data;
  return [
    {
      name: "Untitled folder",
      id: null,
      updated_at: null,
      created_at: null,
      last_accessed_at: null,
    },
    {
      name: "econ_club documents",
      id: null,
      updated_at: null,
      created_at: null,
      last_accessed_at: null,
    },
    {
      name: "0.5134283328122706.pdf",
      id: "7ef219a6-58c0-4900-92df-1dc39fc46d70",
      updated_at: "2023-06-17T01:25:55.217723+00:00",
      created_at: "2023-06-17T01:25:55.018926+00:00",
      last_accessed_at: "2023-06-17T01:25:55.018926+00:00",
    },
    {
      name: "0.8279965515447101.pdf",
      id: "da6f2000-49b6-4641-8fef-9fb595b0995e",
      updated_at: "2023-06-16T17:05:36.226136+00:00",
      created_at: "2023-06-16T17:05:35.998185+00:00",
      last_accessed_at: "2023-06-16T17:05:35.998185+00:00",
    },
    {
      name: "Boarding Pass - YFWKZW - DCA-BOS.pdf",
      id: "47bea572-3e73-4203-953c-8bb4c2524828",
      updated_at: "2023-06-21T21:22:47.709847+00:00",
      created_at: "2023-06-21T21:22:47.506948+00:00",
      last_accessed_at: "2023-06-21T21:22:47.506948+00:00",
    },
    {
      name: "Brady to Nuruyev 5.11.23.pdf",
      id: "8e46ddd5-62fd-42d2-9255-20c927c3b01c",
      updated_at: "2023-06-17T18:43:00.297084+00:00",
      created_at: "2023-06-17T18:43:00.117701+00:00",
      last_accessed_at: "2023-06-17T18:43:00.117701+00:00",
    },
    {
      name: "HW5.pdf",
      id: "9c2e7ce8-cabc-4192-b894-3dba62f48946",
      updated_at: "2023-06-20T20:26:15.613588+00:00",
      created_at: "2023-06-20T20:26:15.452677+00:00",
      last_accessed_at: "2023-06-20T20:26:15.452677+00:00",
    },
    {
      name: "HW6_solution.pdf",
      id: "9030da6f-8477-4fd5-a3cb-8a00b5081649",
      updated_at: "2023-06-20T04:45:59.123193+00:00",
      created_at: "2023-06-20T04:45:58.992882+00:00",
      last_accessed_at: "2023-06-20T04:45:58.992882+00:00",
    },
    {
      name: "attachments.pdf",
      id: "11ab3d03-8445-4bb4-95af-d57231560ff3",
      updated_at: "2023-06-19T21:07:28.574841+00:00",
      created_at: "2023-06-19T21:07:28.383628+00:00",
      last_accessed_at: "2023-06-19T21:07:28.383628+00:00",
    },
  ];
}
