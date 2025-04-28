
import { createClient } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

const supabaseUrl = "https://whrpnqvnujhzqljjmxum.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocnBucXZudWpoenFsampteHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MzQyNjMsImV4cCI6MjA2MTExMDI2M30.DKZ5yPiR9RKOzSP65-Ba5ZYX-sLqJ9cXnsolb_Vntl8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.sessionStorage,
    storageKey: "supabase.auth.token",
    flowType: "pkce"
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

export async function testConnection() {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw sessionError;
    
    if (!session) {
      console.warn("No active session found");
      return false;
    }

    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1)
      .single();

    if (error) throw error;
    
    console.log("Supabase connection successful");
    return true;
  } catch (error) {
    console.error("Supabase connection error:", error.message);
    toast({
      variant: "destructive",
      title: "Eroare de conexiune",
      description: "Nu s-a putut stabili conexiunea cu serverul. Verificați conexiunea la internet."
    });
    return false;
  }
}

// Initialize connection test
testConnection();
