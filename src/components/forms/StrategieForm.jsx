
import React from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const LegalReference = ({ text }) => (
  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
    <Info className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

function StrategieForm({ formData, handleChange, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Tip Procedură
        </label>
        <select
          name="tip_procedura"
          value={formData.tip_procedura}
          onChange={handleChange}
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
        <label className="block text-sm font-medium mb-2">
          Justificare Procedură
        </label>
        <textarea
          name="justificare_procedura"
          value={formData.justificare_procedura}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Justificați alegerea procedurii"
        />
        <LegalReference text="Conform art. 69-70 din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Calendar Procedură
        </label>
        <textarea
          name="calendar_procedura"
          value={formData.calendar_procedura}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Descrieți calendarul procedurii"
        />
        <LegalReference text="Conform art. 141-142 din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Criterii de Atribuire
        </label>
        <textarea
          name="criterii_atribuire"
          value={formData.criterii_atribuire}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Specificați criteriile de atribuire"
        />
        <LegalReference text="Conform art. 187 din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Riscuri
        </label>
        <textarea
          name="riscuri"
          value={formData.riscuri}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Descrieți riscurile identificate"
        />
        <LegalReference text="Conform art. 9 alin. (2) din HG nr. 395/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Ajustare Preț
        </label>
        <textarea
          name="ajustare_pret"
          value={formData.ajustare_pret}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Specificați condițiile de ajustare a prețului"
        />
        <LegalReference text="Conform art. 221 din Legea nr. 98/2016" />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Se procesează..." : "Salvează Strategia"}
      </Button>
    </form>
  );
}

export default StrategieForm;
