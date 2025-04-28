
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/config/supabase";

let isConnected = false;
const RETRY_DELAY = 2000;
const MAX_RETRIES = 3;

export async function testConnection() {
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.warn("[ConnectionManager] No active session found");
        return false;
      }

      const { data, error } = await supabase
        .from('users')
        .select('id')
        .limit(1)
        .single();
        
      if (error) {
        console.warn(`[ConnectionManager] Connection test ${retryCount + 1} failed:`, error.message);
        retryCount++;
        
        if (retryCount < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          continue;
        }
        throw error;
      }
      
      isConnected = true;
      console.log("[ConnectionManager] Connection test successful");
      return true;
    } catch (error) {
      console.error(`[ConnectionManager] Connection test ${retryCount + 1} failed:`, error.message);
      retryCount++;
      
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }

  handleConnectionError();
  return false;
}

export function handleConnectionError() {
  isConnected = false;
  
  toast({
    variant: "destructive",
    title: "Eroare de conexiune",
    description: "Nu s-a putut stabili conexiunea cu serverul. Verificați conexiunea la internet."
  });
  
  setTimeout(() => {
    testConnection();
  }, RETRY_DELAY);
}

export function getConnectionStatus() {
  return isConnected;
}

// Initialize connection test
testConnection();
