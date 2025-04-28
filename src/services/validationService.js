
import { supabase } from "@/services/supabaseClient";
import { PRAGURI_VALORICE, TIP_PROCEDURA } from "@/constants/procurementConstants";
import { validateJustification, generateTechnicalRequirements } from "@/services/openaiService";

export const validateProcedureType = async (valoareEstimata, tipContract) => {
  try {
    let tipProcedura;
    
    if (tipContract === 'servicii' || tipContract === 'produse') {
      if (valoareEstimata < PRAGURI_VALORICE.SERVICII_PRODUSE.DIRECTA) {
        tipProcedura = TIP_PROCEDURA.ACHIZITIE_DIRECTA;
      } else if (valoareEstimata < PRAGURI_VALORICE.SERVICII_PRODUSE.SIMPLIFICAT) {
        tipProcedura = TIP_PROCEDURA.PROCEDURA_SIMPLIFICATA;
      } else {
        tipProcedura = TIP_PROCEDURA.LICITATIE_DESCHISA;
      }
    } else if (tipContract === 'lucrari') {
      if (valoareEstimata < PRAGURI_VALORICE.LUCRARI.DIRECTA) {
        tipProcedura = TIP_PROCEDURA.ACHIZITIE_DIRECTA;
      } else if (valoareEstimata < PRAGURI_VALORICE.LUCRARI.SIMPLIFICAT) {
        tipProcedura = TIP_PROCEDURA.PROCEDURA_SIMPLIFICATA;
      } else {
        tipProcedura = TIP_PROCEDURA.LICITATIE_DESCHISA;
      }
    }

    const { error } = await supabase
      .from('validari')
      .insert({
        tip_validare: 'procedura',
        rezultat: {
          tip_procedura: tipProcedura,
          valoare_estimata: valoareEstimata,
          tip_contract: tipContract
        },
        data_validare: new Date().toISOString()
      });

    if (error) throw error;

    return {
      isValid: true,
      tipProcedura,
      message: `Pentru valoarea estimată de ${valoareEstimata} RON și tipul de contract "${tipContract}", procedura recomandată este "${tipProcedura}"`
    };
  } catch (error) {
    console.error('Error validating procedure type:', error);
    throw error;
  }
};

export const validateDocument = async (document, tipDocument, isMonumentIstoric = false) => {
  try {
    // Pentru monumente istorice, aplicăm reguli speciale de validare
    if (isMonumentIstoric) {
      return await validateMonumentIstoric(document);
    }

    // Validate with OpenAI first
    if (document.justificare) {
      const aiValidation = await validateJustification(document.justificare);
      if (!aiValidation.isValid) {
        return {
          isValid: false,
          errors: aiValidation.feedback,
          suggestions: aiValidation.suggestions
        };
      }
    }

    // Then validate with Supabase
    const { data, error } = await supabase
      .rpc('validate_document', {
        doc_id: document.id,
        doc_type: tipDocument
      });

    if (error) throw error;

    // If technical specifications are needed, generate them
    if (tipDocument === 'caiete_sarcini' && !document.specificatii_tehnice?.cerinte_minimale) {
      const technicalRequirements = await generateTechnicalRequirements(document.obiect_achizitie?.denumire);
      data.suggestions = [...(data.suggestions || []), {
        field: 'specificatii_tehnice',
        content: technicalRequirements
      }];
    }

    return data;
  } catch (error) {
    console.error('Error validating document:', error);
    throw error;
  }
};

async function validateMonumentIstoric(document) {
  try {
    const { data, error } = await supabase
      .rpc('validate_consolidare_seismica', {
        data: document
      });

    if (error) throw error;

    return {
      isValid: true,
      data,
      message: "Documentul pentru monument istoric a fost validat cu succes"
    };
  } catch (error) {
    console.error('Error validating monument istoric:', error);
    throw error;
  }
}

export const validateSpecificatiiTehnice = (specificatii, isMonumentIstoric = false) => {
  const errors = [];

  if (isMonumentIstoric) {
    // Pentru monumente istorice, permitem termeni specifici
    return {
      valid: true,
      errors: []
    };
  }

  // Verificare nediscriminare
  const discriminatoryTerms = ['exclusiv', 'doar', 'numai', 'sau echivalent'];
  for (const term of discriminatoryTerms) {
    if (specificatii.toLowerCase().includes(term)) {
      errors.push(`Specificațiile conțin termenul "${term}" care poate fi discriminatoriu.`);
    }
  }

  // Verificare măsurabilitate
  if (!/\d+/.test(specificatii)) {
    errors.push('Specificațiile ar trebui să conțină valori măsurabile.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};
