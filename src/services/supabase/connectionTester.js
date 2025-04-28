
import { supabase } from "@/config/supabase";
import { toast } from "@/components/ui/use-toast";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

export async function testSupabaseConnection() {
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      // Test autentificare
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        throw new Error(`Eroare de autentificare: ${authError.message}`);
      }

      // Încearcă autentificarea anonimă dacă nu există sesiune
      if (!session) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: 'guest@example.com',
          password: 'guest123'
        });

        if (signInError) {
          throw new Error(`Eroare la autentificarea anonimă: ${signInError.message}`);
        }
      }

      // Test conexiune bază de date
      const { error: dbError } = await supabase
        .from("users")
        .select("count()", { count: "exact" })
        .limit(1);

      if (dbError) {
        throw new Error(`Eroare conexiune bază de date: ${dbError.message}`);
      }

      // Test conexiune realtime
      const channel = supabase.channel('system_health');
      const realtimePromise = new Promise((resolve) => {
        channel.subscribe((status) => {
          resolve(status === 'SUBSCRIBED');
        });
      });
      
      const realtimeStatus = await realtimePromise;
      if (!realtimeStatus) {
        throw new Error("Eroare conexiune realtime");
      }

      toast({
        title: "Conexiune reușită",
        description: "Toate sistemele funcționează corect",
        duration: 3000,
      });

      return {
        success: true,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`Încercare de conexiune ${retryCount + 1} eșuată:`, error);
      retryCount++;
      
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        continue;
      }
      
      toast({
        variant: "destructive",
        title: "Eroare de conexiune",
        description: "Nu s-a putut stabili conexiunea cu serverul. Verificați conexiunea la internet.",
        duration: 5000,
      });

      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}
