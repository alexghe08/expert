
import { supabase } from "@/config/supabase";
import { toast } from "@/components/ui/use-toast";

export async function initiateDocumentFlow(referatId) {
  try {
    // Inițiem fluxul documentelor
    const { data: flowData, error: flowError } = await supabase
      .rpc('initiate_document_flow', { referat_id: referatId });

    if (flowError) throw flowError;

    // Generăm caietul de sarcini
    const { data: caietData, error: caietError } = await supabase
      .rpc('propagate_referat_to_caiet', { referat_id: referatId });

    if (caietError) throw caietError;

    // Generăm strategia
    const { data: strategieData, error: strategieError } = await supabase
      .rpc('propagate_referat_to_strategie', { referat_id: referatId });

    if (strategieError) throw strategieError;

    // Actualizăm statusul fluxului
    const { error: updateError } = await supabase
      .from('document_flow')
      .update({ status: 'completed' })
      .eq('referat_id', referatId);

    if (updateError) throw updateError;

    toast({
      title: "Succes!",
      description: "Fluxul documentelor a fost inițiat cu succes"
    });

    return {
      flowId: flowData,
      caiet: caietData,
      strategie: strategieData
    };
  } catch (error) {
    console.error("Error in document flow:", error);
    toast({
      variant: "destructive",
      title: "Eroare",
      description: "Nu s-a putut iniția fluxul documentelor"
    });
    throw error;
  }
}

export async function getDocumentFlow(referatId) {
  try {
    const { data, error } = await supabase
      .from('document_flow')
      .select(`
        *,
        referate (*),
        caiete_sarcini (*),
        strategii (*)
      `)
      .eq('referat_id', referatId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching document flow:", error);
    toast({
      variant: "destructive",
      title: "Eroare",
      description: "Nu s-au putut încărca datele fluxului"
    });
    return null;
  }
}

export async function validateDocumentFlow(flowId) {
  try {
    const { data: flow } = await supabase
      .from('document_flow')
      .select('*')
      .eq('id', flowId)
      .single();

    if (!flow) throw new Error("Flux negăsit");

    // Validăm referatul
    const { data: referatValidation } = await supabase
      .rpc('validate_referat', { data: flow.referat_id });

    // Validăm caietul de sarcini
    const { data: caietValidation } = await supabase
      .rpc('validate_caiet', { data: flow.caiet_sarcini_id });

    // Validăm strategia
    const { data: strategieValidation } = await supabase
      .rpc('validate_strategie', { data: flow.strategie_id });

    const validations = {
      referat: referatValidation,
      caiet: caietValidation,
      strategie: strategieValidation
    };

    // Salvăm rezultatele validării
    await supabase
      .from('validari')
      .insert({
        document_id: flowId,
        tip_validare: 'flow',
        erori: validations,
        data_validare: new Date().toISOString()
      });

    return validations;
  } catch (error) {
    console.error("Error validating document flow:", error);
    toast({
      variant: "destructive",
      title: "Eroare validare",
      description: "Nu s-a putut valida fluxul documentelor"
    });
    return null;
  }
}

export async function getFlowStatus(flowId) {
  try {
    const { data, error } = await supabase
      .from('document_flow')
      .select(`
        status,
        referat_id,
        caiet_sarcini_id,
        strategie_id,
        created_at,
        updated_at
      `)
      .eq('id', flowId)
      .single();

    if (error) throw error;

    return {
      status: data.status,
      documents: {
        referat: !!data.referat_id,
        caiet: !!data.caiet_sarcini_id,
        strategie: !!data.strategie_id
      },
      timestamps: {
        created: data.created_at,
        updated: data.updated_at
      }
    };
  } catch (error) {
    console.error("Error fetching flow status:", error);
    toast({
      variant: "destructive",
      title: "Eroare",
      description: "Nu s-a putut verifica statusul fluxului"
    });
    return null;
  }
}
