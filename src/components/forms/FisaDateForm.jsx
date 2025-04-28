
import React from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const LegalReference = ({ text }) => (
  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
    <Info className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

function FisaDateForm({ formData, handleChange, handleSubmit, loading, activeSection }) {
  const renderAutoritateSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Denumire Autoritate Contractantă</label>
        <input
          type="text"
          name="denumire"
          value={formData.autoritate_contractanta.denumire}
          onChange={(e) => handleChange(e, "autoritate_contractanta", "denumire")}
          className="w-full p-2 border rounded-md"
          placeholder="Introduceți denumirea autorității"
        />
        <LegalReference text="Conform art. 3 lit. a) din Legea nr. 98/2016" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Adresă</label>
        <textarea
          name="adresa"
          value={formData.autoritate_contractanta.adresa}
          onChange={(e) => handleChange(e, "autoritate_contractanta", "adresa")}
          className="w-full p-2 border rounded-md"
          rows="3"
          placeholder="Introduceți adresa completă"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.autoritate_contractanta.contact}
          onChange={(e) => handleChange(e, "autoritate_contractanta", "contact")}
          className="w-full p-2 border rounded-md"
          placeholder="Persoană de contact și date de contact"
        />
      </div>
    </div>
  );

  const renderObiectSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Descriere Obiect Achiziție</label>
        <textarea
          name="descriere"
          value={formData.obiectul_achizitiei.descriere}
          onChange={(e) => handleChange(e, "obiectul_achizitiei", "descriere")}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Descrieți obiectul achiziției"
        />
        <LegalReference text="Conform art. 3 lit. m) din Legea nr. 98/2016" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Cod CPV</label>
        <input
          type="text"
          name="cod_cpv"
          value={formData.obiectul_achizitiei.cod_cpv}
          onChange={(e) => handleChange(e, "obiectul_achizitiei", "cod_cpv")}
          className="w-full p-2 border rounded-md"
          placeholder="Introduceți codul CPV"
        />
        <LegalReference text="Conform art. 3 lit. t) din Legea nr. 98/2016" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Valoare Estimată (RON)</label>
        <input
          type="number"
          name="valoare_estimata"
          value={formData.obiectul_achizitiei.valoare_estimata}
          onChange={(e) => handleChange(e, "obiectul_achizitiei", "valoare_estimata")}
          className="w-full p-2 border rounded-md"
          placeholder="0.00"
        />
        <LegalReference text="Conform art. 9 din Legea nr. 98/2016" />
      </div>
    </div>
  );

  const renderProceduraSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Tip Procedură</label>
        <select
          name="tip_procedura"
          value={formData.procedura_achizitie.tip_procedura}
          onChange={(e) => handleChange(e, "procedura_achizitie", "tip_procedura")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Selectați tipul procedurii</option>
          <option value="licitatie_deschisa">Licitație deschisă</option>
          <option value="licitatie_restransa">Licitație restrânsă</option>
          <option value="negociere">Negociere</option>
          <option value="dialog_competitiv">Dialog competitiv</option>
        </select>
        <LegalReference text="Conform art. 68 din Legea nr. 98/2016" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Criteriu Atribuire</label>
        <select
          name="criteriu_atribuire"
          value={formData.procedura_achizitie.criteriu_atribuire}
          onChange={(e) => handleChange(e, "procedura_achizitie", "criteriu_atribuire")}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Selectați criteriul de atribuire</option>
          <option value="pret">Prețul cel mai scăzut</option>
          <option value="cost">Costul cel mai scăzut</option>
          <option value="calitate_pret">Cel mai bun raport calitate-preț</option>
          <option value="calitate_cost">Cel mai bun raport calitate-cost</option>
        </select>
        <LegalReference text="Conform art. 187 din Legea nr. 98/2016" />
      </div>
    </div>
  );

  const renderCriteriiSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Documente Solicitate</label>
        <textarea
          name="documente_solicitate"
          value={formData.criterii_calificare.documente_solicitate}
          onChange={(e) => handleChange(e, "criterii_calificare", "documente_solicitate")}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Specificați documentele solicitate"
        />
        <LegalReference text="Conform art. 193-196 din Legea nr. 98/2016" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Cerințe Tehnice</label>
        <textarea
          name="cerinte_tehnice"
          value={formData.criterii_calificare.cerinte_tehnice}
          onChange={(e) => handleChange(e, "criterii_calificare", "cerinte_tehnice")}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Specificați cerințele tehnice"
        />
        <LegalReference text="Conform art. 155-156 din Legea nr. 98/2016" />
      </div>
    </div>
  );

  const renderGarantiiSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Garanție de Participare</label>
        <input
          type="text"
          name="participare"
          value={formData.garantii.participare}
          onChange={(e) => handleChange(e, "garantii", "participare")}
          className="w-full p-2 border rounded-md"
          placeholder="Specificați garanția de participare"
        />
        <LegalReference text="Conform art. 35-36 din HG nr. 395/2016" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Garanție de Bună Execuție</label>
        <input
          type="text"
          name="buna_executie"
          value={formData.garantii.buna_executie}
          onChange={(e) => handleChange(e, "garantii", "buna_executie")}
          className="w-full p-2 border rounded-md"
          placeholder="Specificați garanția de bună execuție"
        />
        <LegalReference text="Conform art. 39-42 din HG nr. 395/2016" />
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "autoritate":
        return renderAutoritateSection();
      case "obiect":
        return renderObiectSection();
      case "procedura":
        return renderProceduraSection();
      case "criterii":
        return renderCriteriiSection();
      case "garantii":
        return renderGarantiiSection();
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderActiveSection()}
      
      <Button
        type="submit"
        className="w-full mt-6"
        disabled={loading}
      >
        {loading ? "Se procesează..." : "Salvează Fișa de Date"}
      </Button>
    </form>
  );
}

export default FisaDateForm;
