import { supabase } from "../supabaseClient";

export async function uploadToStorage(filePath, file) {
  return await supabase.storage.from("documents").upload(filePath, file);
}

export async function addFileDataToDatabase(
  file,
  contentType,
  userId,
  filePath
) {
  const { insert_data, insert_error } = await supabase
    .from("doc_data")
    .insert([
      {
        name: file.name,
        document_type: file.type,
        content_type: contentType,
        user_id: userId,
        path: filePath,
        metadata: {},
      },
    ])
    .select();

  if (insert_error) {
    console.error("Detailed error:", insert_error);
    throw new Error("Error creating row.");
  }
}

export async function updateMetadataInDatabase(path, metadata) {
  const { data, error } = await supabase
    .from("doc_data")
    .update({ metadata })
    .eq("path", path);

  if (error) {
    console.error("Detailed error:", error);
    throw new Error("Error updating row.");
  }
  return data;
}

export async function getSignedURL(filePath) {
  const response = await supabase.storage
    .from("documents")
    .createSignedUrl(filePath, 60);
  if (!response.data || !response.data.signedUrl)
    throw new Error("Error creating signed URL.");
  return response.data.signedUrl;
}

export async function invokeUploadFunction(filePath, publicURL, contentType) {
  const { data: function_data, error: function_error } =
    await supabase.functions.invoke("upload-file-workspace", {
      body: {
        type: "pdf",
        path: filePath,
        url: publicURL,
        content_type: contentType,
      },
    });
  if (function_error) throw new Error("Error invoking function.");
  console.log(function_data);

  if (!function_data) throw new Error("Error invoking function, no data.");

  return function_data.message;
}
