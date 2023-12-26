import { supabase } from "../supabaseClient";

export async function deleteFileFromSupabase(filePath) {
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

export async function deleteFileFromVectorDB(filePath) {
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
