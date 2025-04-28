
import { createClient } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

const supabaseUrl = "https://whrpnqvnujhzqljjmxum.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocnBucXZudWpoenFsampteHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzQyNjMsImV4cCI6MjA2MTExMDI2M30.DKZ5yPiR9RKOzSP65-Ba5ZYX-sLqJ9cXnsolb_Vntl8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storage: window.localStorage,
    storageKey: "app_auth_token",
    flowType: "pkce",
    debug: process.env.NODE_ENV === "development",
    cookieOptions: {
      sameSite: "Lax",
      secure: true,
      domain: window.location.hostname
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.39.0'
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 1
    }
  },
  db: {
    schema: 'public'
  }
});

// Connection management
let isConnected = false;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

export const checkConnection = async () => {
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.warn("No active session found");
        return false;
      }

      const { data, error } = await supabase
        .from('users')
        .select('id')
        .limit(1)
        .single();

      if (error) {
        console.warn(`Connection attempt ${retryCount + 1} failed:`, error.message);
        retryCount++;
        
        if (retryCount < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          continue;
        }
        throw error;
      }

      isConnected = true;
      console.log("Database connection verified successfully");
      return true;
    } catch (error) {
      console.error(`Connection attempt ${retryCount + 1} failed:`, error.message);
      retryCount++;
      
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }

  isConnected = false;
  toast({
    variant: "destructive",
    title: "Eroare de conexiune",
    description: "Nu s-a putut stabili conexiunea cu serverul. Vă rugăm să verificați conexiunea la internet și să reîncercați."
  });
  
  return false;
};

export const getConnectionStatus = () => isConnected;

// Initialize connection check
checkConnection().catch(console.error);
