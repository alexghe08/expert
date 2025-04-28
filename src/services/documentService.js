
import { supabase } from '@/config/supabase';
import { toast } from '@/components/ui/use-toast';

export const validateDocument = async (data) => {
  try {
    const { data: result, error } = await supabase
      .rpc('validate_consolidare_seismica', { data });
    
    if (error) throw error;
    return result;
  } catch (error) {
    toast({
      title: "Eroare validare",
      description: "Nu s-a putut valida documentul",
      variant: "destructive"
    });
    throw error;
  }
};

export const saveReferat = async (referatData) => {
  try {
    const { data, error } = await supabase
      .from('referate')
      .insert([{
        obiect_achizitie: {
          titlu: referatData.titlu,
          descriere: referatData.obiect,
          cod_cpv: referatData.codCPV
        },
        valoare_estimata: {
          valoare: referatData.valoareEstimata,
          cheltuieli_neprevazute: referatData.cheltuieliNeprevazute
        },
        sursa_finantare: {
          sursa: referatData.sursaFinantare,
          detalii: referatData.detaliiFinantare || null
        },
        justificare: {
          text: referatData.justificare,
          documente_suport: referatData.documenteSuport || []
        },
        specificatii_tehnice: {
          cerinte: referatData.specificatiiTehnice || [],
          standarde: referatData.standarde || []
        }
      }])
      .select();

    if (error) throw error;

    // Inițiem fluxul documentelor
    const { data: flow, error: flowError } = await supabase
      .rpc('initiate_document_flow', { referat_id: data[0].id });

    if (flowError) throw flowError;

    toast({
      title: "Succes!",
      description: "Referatul a fost salvat și validat cu succes",
    });

    return data[0];
  } catch (error) {
    console.error('Error saving referat:', error);
    toast({
      title: "Eroare salvare",
      description: "Nu s-a putut salva referatul. Vă rugăm încercați din nou.",
      variant: "destructive"
    });
    throw error;
  }
};

export const generateDocuments = async (referatId) => {
  try {
    // Generăm caietul de sarcini
    const { data: caiet, error: caietError } = await supabase
      .rpc('propagate_referat_to_caiet', { referat_id: referatId });
    
    if (caietError) throw caietError;

    // Generăm strategia
    const { data: strategie, error: strategieError } = await supabase
      .rpc('propagate_referat_to_strategie', { referat_id: referatId });
    
    if (strategieError) throw strategieError;

    toast({
      title: "Succes!",
      description: "Documentele au fost generate cu succes",
    });

    return { caiet, strategie };
  } catch (error) {
    console.error('Error generating documents:', error);
    toast({
      title: "Eroare generare",
      description: "Nu s-au putut genera documentele. Vă rugăm încercați din nou.",
      variant: "destructive"
    });
    throw error;
  }
};
