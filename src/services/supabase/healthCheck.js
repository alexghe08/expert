
import { supabase } from "@/config/supabase";
import { toast } from "@/components/ui/use-toast";

export async function performHealthCheck() {
  const checks = {
    auth: false,
    database: false,
    realtime: false
  };

  try {
    // 1. Verifică autentificarea
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (!authError) {
      if (!session) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: 'guest@example.com',
          password: 'guest123'
        });
        checks.auth = !signInError;
      } else {
        checks.auth = true;
      }
    }

    // 2. Verifică conexiunea la baza de date
    const { error: dbError } = await supabase
      .from('users')
      .select('count()', { count: 'exact' })
      .limit(1);
    
    checks.database = !dbError;

    // 3. Verifică Realtime
    const channel = supabase.channel('system_health');
    const realtimePromise = new Promise((resolve) => {
      channel.subscribe((status) => {
        resolve(status === 'SUBSCRIBED');
      });
      
      setTimeout(() => resolve(false), 5000);
    });
    checks.realtime = await realtimePromise;

    const allChecksPass = Object.values(checks).every(check => check);

    if (allChecksPass) {
      toast({
        title: "Sistem funcțional",
        description: "Toate componentele sunt conectate și funcționează corect",
        duration: 3000,
      });
    } else {
      const failedSystems = Object.entries(checks)
        .filter(([, passed]) => !passed)
        .map(([system]) => system)
        .join(', ');

      toast({
        variant: "destructive",
        title: "Verificare sistem",
        description: `Probleme detectate la: ${failedSystems}. Reîncercați în câteva momente.`,
        duration: 5000,
      });
    }

    return {
      success: allChecksPass,
      checks,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error("Verificare sistem eșuată:", error);
    
    toast({
      variant: "destructive",
      title: "Eroare sistem",
      description: "Nu s-a putut verifica starea sistemului. Reîncercați în câteva momente.",
      duration: 5000,
    });

    return {
      success: false,
      checks,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}
