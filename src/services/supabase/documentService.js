
import { supabase } from "./client";
import { handleConnectionError } from "./connectionManager";

export async function getDocumentVersions(documentId) {
  try {
    const { data, error } = await supabase
      .from("document_versions")
      .select("*")
      .eq("document_id", documentId)
      .order("version", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching document versions:", error);
    handleConnectionError(error);
    throw error;
  }
}

export function subscribeToDocumentChanges(documentId, callback) {
  const channel = supabase
    .channel(`document-${documentId}`)
    .on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "document_versions",
      filter: `document_id=eq.${documentId}`
    }, payload => {
      callback(payload);
    })
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log("Successfully subscribed to changes");
      }
      if (status === "CHANNEL_ERROR") {
        console.error("Channel error, attempting to reconnect...");
        handleConnectionError(new Error('Channel connection lost'));
        setTimeout(() => {
          channel.unsubscribe();
          subscribeToDocumentChanges(documentId, callback);
        }, 1000);
      }
    });

  return channel;
}
