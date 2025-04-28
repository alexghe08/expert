
import { supabase } from "@/config/supabase";
import { toast } from "@/components/ui/use-toast";

export async function testDocumentFlow() {
  try {
    // Test Referat
    const { data: referat, error: referatError } = await supabase
      .from('referate')
      .select('*')
      .limit(1);
    if (referatError) throw new Error(`Eroare referat: ${referatError.message}`);

    // Test Caiet Sarcini
    const { data: caiet, error: caietError } = await supabase
      .from('caiete_sarcini')
      .select('*')
      .limit(1);
    if (caietError) throw new Error(`Eroare caiet: ${caietError.message}`);

    // Test Strategie
    const { data: strategie, error: strategieError } = await supabase
      .from('strategii')
      .select('*')
      .limit(1);
    if (strategieError) throw new Error(`Eroare strategie: ${strategieError.message}`);

    toast({
      title: "Documente verificate",
      description: "Toate documentele sunt accesibile",
      duration: 3000,
    });

    return { success: true };
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Eroare documente",
      description: error.message,
      duration: 5000,
    });
    return { success: false, error: error.message };
  }
}
