
import { supabase } from "@/config/supabase";
import { testSupabaseConnection } from "@/services/supabase/connectionTester";
import { performHealthCheck } from "@/services/supabase/healthCheck";
import { toast } from "@/components/ui/use-toast";

export async function runSystemTests() {
  try {
    // 1. Test Supabase Connection
    const connectionResult = await testSupabaseConnection();
    if (!connectionResult.success) {
      throw new Error(`Conexiune Supabase eșuată: ${connectionResult.error}`);
    }

    // 2. Test Health Check
    const healthResult = await performHealthCheck();
    if (!healthResult.success) {
      throw new Error(`Verificare sistem eșuată: ${healthResult.error}`);
    }

    // 3. Test Document Flow
    const { data: flowData, error: flowError } = await supabase
      .from('document_flow')
      .select('*')
      .limit(1);
    
    if (flowError) {
      throw new Error(`Eroare flux documente: ${flowError.message}`);
    }

    // 4. Test Notifications
    const { data: notifData, error: notifError } = await supabase
      .from('notifications')
      .select('*')
      .limit(1);

    if (notifError) {
      throw new Error(`Eroare notificări: ${notifError.message}`);
    }

    // 5. Test Database Functions
    const { data: validateData, error: validateError } = await supabase
      .rpc('validate_document', { 
        doc_id: '00000000-0000-0000-0000-000000000000',
        doc_type: 'referat'
      });

    if (validateError) {
      throw new Error(`Eroare validare: ${validateError.message}`);
    }

    toast({
      title: "Teste finalizate cu succes",
      description: "Toate sistemele funcționează corect",
      duration: 3000,
    });

    return {
      success: true,
      timestamp: new Date().toISOString(),
      results: {
        connection: connectionResult,
        health: healthResult,
        documentFlow: !!flowData,
        notifications: !!notifData,
        validation: !!validateData
      }
    };

  } catch (error) {
    console.error("Eroare la testarea sistemului:", error);
    
    toast({
      variant: "destructive",
      title: "Eroare la testare",
      description: error.message,
      duration: 5000,
    });

    return {
      success: false,
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
}

export async function testDocumentFlow(referatId) {
  try {
    // 1. Test inițiere flux
    const { data: initData, error: initError } = await supabase
      .rpc('initiate_document_flow', { referat_id: referatId });

    if (initError) throw initError;

    // 2. Test propagare date
    const { data: propagateData, error: propagateError } = await supabase
      .rpc('propagate_referat_to_caiet', { referat_id: referatId });

    if (propagateError) throw propagateError;

    // 3. Test validare
    const { data: validateData, error: validateError } = await supabase
      .rpc('validate_document', { 
        doc_id: referatId,
        doc_type: 'referat'
      });

    if (validateError) throw validateError;

    toast({
      title: "Flux documente funcțional",
      description: "Toate operațiunile au fost executate cu succes",
      duration: 3000,
    });

    return {
      success: true,
      timestamp: new Date().toISOString(),
      results: {
        initiation: !!initData,
        propagation: !!propagateData,
        validation: !!validateData
      }
    };

  } catch (error) {
    console.error("Eroare la testarea fluxului de documente:", error);
    
    toast({
      variant: "destructive",
      title: "Eroare flux documente",
      description: error.message,
      duration: 5000,
    });

    return {
      success: false,
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
}
