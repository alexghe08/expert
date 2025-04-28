
import { supabase } from "@/config/supabase";
import { toast } from "@/components/ui/use-toast";

export async function testValidation() {
  try {
    const { data, error } = await supabase
      .rpc('validate_document', {
        doc_id: '00000000-0000-0000-0000-000000000000',
        doc_type: 'referat'
      });
    
    if (error) throw new Error(`Eroare validare: ${error.message}`);

    toast({
      title: "Validare funcțională",
      description: "Sistemul de validare funcționează",
      duration: 3000,
    });

    return { success: true };
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Eroare validare",
      description: error.message,
      duration: 5000,
    });
    return { success: false, error: error.message };
  }
}
