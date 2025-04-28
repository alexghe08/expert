
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { validateFisaDate } from "@/validators/fisaDateValidator";
import { generatePDF } from "@/utils/pdfGenerator";
import { FileDown } from "lucide-react";
import FisaDateForm from "@/components/forms/FisaDateForm";

function FisaDatePage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    autoritate_contractanta: {
      denumire: "",
      adresa: "",
      contact: ""
    },
    obiectul_achizitiei: {
      descriere: "",
      cod_cpv: "",
      valoare_estimata: ""
    },
    procedura_achizitie: {
      tip_procedura: "",
      criteriu_atribuire: "",
      modalitate_desfasurare: ""
    },
    criterii_calificare: {
      documente_solicitate: "",
      cerinte_tehnice: "",
      capacitate_tehnica: "",
      capacitate_economica: ""
    },
    oferta_tehnica: {
      specificatii_tehnice: "",
      cerinte_minime: "",
      metodologie: ""
    },
    oferta_financiara: {
      format_prezentare: "",
      modalitate_plata: "",
      ajustare_pret: ""
    },
    garantii: {
      participare: "",
      buna_executie: ""
    },
    modalitate_depunere: {
      adresa: "",
      data_limita: "",
      format: ""
    },
    evaluare_oferte: {
      etape: "",
      factori_evaluare: "",
      algoritm_calcul: ""
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("autoritate");

  const handleChange = (e, section, subsection) => {
    const { name, value } = e.target;
    if (section && subsection) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: value
        }
      }));
    } else if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validateFisaDate(formData);
    if (validationErrors) {
      toast({
        variant: "destructive",
        title: "Erori de validare",
        description: validationErrors.join("\n")
      });
      setLoading(false);
      return;
    }

    try {
      const fiseStr = localStorage.getItem('fise_date') || '[]';
      const fise = JSON.parse(fiseStr);
      const newFisa = {
        ...formData,
        id: Date.now(),
        created_at: new Date().toISOString(),
        status: 'În lucru'
      };
      fise.push(newFisa);
      localStorage.setItem('fise_date', JSON.stringify(fise));

      toast({
        title: "Succes!",
        description: "Fișa de date a fost salvată."
      });

      setFormData({
        autoritate_contractanta: { denumire: "", adresa: "", contact: "" },
        obiectul_achizitiei: { descriere: "", cod_cpv: "", valoare_estimata: "" },
        procedura_achizitie: { tip_procedura: "", criteriu_atribuire: "", modalitate_desfasurare: "" },
        criterii_calificare: { documente_solicitate: "", cerinte_tehnice: "", capacitate_tehnica: "", capacitate_economica: "" },
        oferta_tehnica: { specificatii_tehnice: "", cerinte_minime: "", metodologie: "" },
        oferta_financiara: { format_prezentare: "", modalitate_plata: "", ajustare_pret: "" },
        garantii: { participare: "", buna_executie: "" },
        modalitate_depunere: { adresa: "", data_limita: "", format: "" },
        evaluare_oferte: { etape: "", factori_evaluare: "", algoritm_calcul: "" }
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut salva fișa de date."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    try {
      const doc = generatePDF(formData, "fisa_date");
      doc.save(`fisa-date-${Date.now()}.pdf`);
      
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

  const sections = [
    { id: "autoritate", label: "Autoritate Contractantă" },
    { id: "obiect", label: "Obiectul Achiziției" },
    { id: "procedura", label: "Procedura" },
    { id: "criterii", label: "Criterii" },
    { id: "garantii", label: "Garanții" }
  ];

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Fișa de Date a Achiziției</h1>
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            Export PDF
          </Button>
        </div>

        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {sections.map(section => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              onClick={() => setActiveSection(section.id)}
              className="whitespace-nowrap"
            >
              {section.label}
            </Button>
          ))}
        </div>
        
        <FisaDateForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          activeSection={activeSection}
        />
      </motion.div>
    </div>
  );
}

export default FisaDatePage;
