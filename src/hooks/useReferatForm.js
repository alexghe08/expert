
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { validateProcurement } from "@/validators/procurementValidator";
import { generateSuggestion } from "@/services/openaiService";
import { saveDocument, validateDocument, initiateDocumentFlow } from "@/services/documentService";
import { generatePDF } from "@/utils/pdfGenerator";

export function useReferatForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titlu: "",
    obiect: "",
    cod_cpv: "",
    valoare_estimata: "",
    cheltuieli_neprevazute: "",
    sursa_finantare: "",
    durata_contractului: "",
    justificare: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateProcurement(formData);
    if (validationError) {
      toast({
        variant: "destructive",
        title: "Eroare de validare",
        description: validationError
      });
      return;
    }

    setLoading(true);
    try {
      const documentData = {
        obiect_achizitie: {
          denumire: formData.titlu,
          cod_cpv: formData.cod_cpv,
          descriere: formData.obiect
        },
        valoare_estimata: {
          valoare: parseFloat(formData.valoare_estimata),
          cheltuieli_neprevazute: parseFloat(formData.cheltuieli_neprevazute),
          fundamentare: "Conform art. 9 din Legea 98/2016"
        },
        sursa_finantare: {
          tip: formData.sursa_finantare,
          detalii: "Buget alocat conform planului anual"
        },
        justificare: {
          necesitate: formData.justificare,
          oportunitate: formData.justificare,
          beneficii: formData.justificare
        },
        specificatii_tehnice: {
          descriere: formData.obiect,
          cerinte_minimale: formData.obiect
        }
      };

      const savedDocument = await saveDocument('referate', documentData);
      const validationResult = await validateDocument(savedDocument.id, 'referate');
      
      if (!validationResult.isValid) {
        throw new Error(`Validare eșuată: ${validationResult.errors.join(', ')}`);
      }

      await initiateDocumentFlow(savedDocument.id);

      toast({
        title: "Succes!",
        description: "Referatul a fost salvat și validat cu succes."
      });
      
      setFormData({
        titlu: "",
        obiect: "",
        cod_cpv: "",
        valoare_estimata: "",
        cheltuieli_neprevazute: "",
        sursa_finantare: "",
        durata_contractului: "",
        justificare: ""
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: error.message || "A apărut o eroare la salvarea referatului."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestJustification = async () => {
    if (!formData.obiect || !formData.valoare_estimata) {
      toast({
        variant: "destructive",
        title: "Informații insuficiente",
        description: "Vă rugăm completați obiectul și valoarea estimată pentru a genera o sugestie."
      });
      return;
    }

    setLoading(true);
    try {
      const suggestion = await generateSuggestion(formData.obiect, formData.valoare_estimata);
      setFormData(prev => ({
        ...prev,
        justificare: suggestion
      }));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut genera sugestia. Încercați din nou."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    try {
      const doc = generatePDF(formData);
      doc.save(`referat-${formData.titlu || 'necunoscut'}.pdf`);
      
      toast({
        title: "Succes!",
        description: "PDF-ul a fost generat cu succes."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut genera PDF-ul. Încercați din nou."
      });
    }
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
    handleSuggestJustification,
    handleDownloadPDF
  };
}
