
import { supabase } from "@/config/supabase";
import { toast } from "@/components/ui/use-toast";

export async function testConnection() {
  try {
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) throw new Error(`Eroare autentificare: ${authError.message}`);

    // Test conexiune la tabelul documente
    const { data: docData, error: docError } = await supabase
      .from('documente')
      .select('id')
      .limit(1);
    
    if (docError) throw new Error(`Eroare documente: ${docError.message}`);

    // Test conexiune la tabelul referate
    const { data: refData, error: refError } = await supabase
      .from('referate')
      .select('id')
      .limit(1);
    
    if (refError) throw new Error(`Eroare referate: ${refError.message}`);

    toast({
      title: "Conexiune reușită",
      description: "Conectat la Supabase",
      duration: 3000,
    });

    return { 
      success: true,
      details: {
        auth: true,
        documente: docData !== null,
        referate: refData !== null
      }
    };
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Eroare conexiune",
      description: error.message,
      duration: 5000,
    });
    return { 
      success: false, 
      error: error.message,
      details: {
        auth: false,
        documente: false,
        referate: false
      }
    };
  }
}
