
import React from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const LegalReference = ({ text }) => (
  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
    <Info className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

function ReferatForm({ formData, handleChange, handleSubmit, handleSuggestJustification, loading }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Titlu
        </label>
        <input
          type="text"
          name="titlu"
          value={formData.titlu}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Introduceți titlul"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Obiect
        </label>
        <textarea
          name="obiect"
          value={formData.obiect}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows="3"
          placeholder="Descrieți obiectul achiziției"
        />
        <LegalReference text="Stabilit conform art. 7 alin. (5) și art. 23 din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Cod CPV
        </label>
        <input
          type="text"
          name="cod_cpv"
          value={formData.cod_cpv}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Introduceți codul CPV"
        />
        <LegalReference text="Ales conform art. 3 lit. t) din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Valoare Estimată (RON)
        </label>
        <input
          type="number"
          name="valoare_estimata"
          value={formData.valoare_estimata}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="0.00"
        />
        <LegalReference text="Determinată conform art. 9 din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Cheltuieli Neprevăzute (RON)
        </label>
        <input
          type="number"
          name="cheltuieli_neprevazute"
          value={formData.cheltuieli_neprevazute}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="0.00"
        />
        <LegalReference text="Conform HG nr. 907/2016, Anexa 6, pct. 5.3" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Sursă Finanțare
        </label>
        <input
          type="text"
          name="sursa_finantare"
          value={formData.sursa_finantare}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Specificați sursa de finanțare"
        />
        <LegalReference text="Stabilită conform art. 23 Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Durată Contract (luni)
        </label>
        <input
          type="number"
          name="durata_contractului"
          value={formData.durata_contractului}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          placeholder="Specificați durata în luni"
        />
        <LegalReference text="Estimare realizată conform art. 139 alin. (2) din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Justificare
        </label>
        <div className="flex gap-2 mb-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleSuggestJustification}
            disabled={loading}
          >
            Sugerează Justificare
          </Button>
        </div>
        <textarea
          name="justificare"
          value={formData.justificare}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          rows="5"
          placeholder="Introduceți justificarea"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Se procesează..." : "Salvează Referatul"}
      </Button>
    </form>
  );
}

export default ReferatForm;
