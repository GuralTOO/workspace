import { supabase } from "../supabaseClient";

export async function getFileDetails(path) {
  console.log("fileDetails called");
  const { data, error } = await supabase
    .from("doc_data")
    .select("metadata")
    .eq("path", path);

  if (error) {
    console.error("Detailed error:", error);
    throw new Error("Error getting file details.");
  }

  console.log("data from getFileDetails: ", data);
  return data[0].metadata;
}
