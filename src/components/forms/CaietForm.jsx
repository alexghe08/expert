
import React from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const LegalReference = ({ text }) => (
  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
    <Info className="w-4 h-4" />
    <span>{text}</span>
  </div>
);

function CaietForm({ formData, handleChange, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Informații Generale
        </label>
        <textarea
          name="informatii_generale"
          value={formData.informatii_generale}
          onChange={(e) => handleChange(e, "informatii_generale")}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Descrieți informațiile generale"
        />
        <LegalReference text="Conform art. 155-156 din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Specificații Tehnice
        </label>
        <textarea
          name="specificatii_tehnice"
          value={formData.specificatii_tehnice}
          onChange={(e) => handleChange(e, "specificatii_tehnice")}
          className="w-full p-2 border rounded-md"
          rows="6"
          placeholder="Descrieți specificațiile tehnice"
        />
        <LegalReference text="Conform art. 156 alin. (1) din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Criterii de Calificare
        </label>
        <textarea
          name="criterii_calificare"
          value={formData.criterii_calificare}
          onChange={(e) => handleChange(e, "criterii_calificare")}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Specificați criteriile de calificare"
        />
        <LegalReference text="Conform art. 163-167 din Legea nr. 98/2016" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Livrabile
        </label>
        <textarea
          name="livrabile"
          value={formData.livrabile}
          onChange={(e) => handleChange(e, "livrabile")}
          className="w-full p-2 border rounded-md"
          rows="4"
          placeholder="Descrieți livrabilele așteptate"
        />
        <LegalReference text="Conform art. 156 alin. (2) din Legea nr. 98/2016" />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Se procesează..." : "Salvează Caietul de Sarcini"}
      </Button>
    </form>
  );
}

export default CaietForm;
