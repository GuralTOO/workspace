import { supabase } from "../supabaseClient";

export async function callWeaviate() {
  const currentPath = "test";
  const message = "daddy";
  await supabase.functions
    .invoke("weaviate-client", {
      body: {
        path: currentPath,
        query: message,
      },
    })
    .then((response) => {
      console.log(response);
      setOutputMessage(response.data.message);
    })
    .catch((error) => {
      console.log("Error getting the answer:", error);
    });
}
