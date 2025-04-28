
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

function StrategiePage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titlu: "",
    justificare_procedura: "",
    criterii_atribuire: "",
    analiza_risc: "",
    durata_calendar: "",
    plan_masuri: ""
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
    setLoading(true);

    try {
      const strategiiStr = localStorage.getItem('strategii') || '[]';
      const strategii = JSON.parse(strategiiStr);
      strategii.push({
        ...formData,
        id: Date.now(),
        created_at: new Date().toISOString()
      });
      localStorage.setItem('strategii', JSON.stringify(strategii));

      toast({
        title: "Succes!",
        description: "Strategia a fost salvată."
      });

      setFormData({
        titlu: "",
        justificare_procedura: "",
        criterii_atribuire: "",
        analiza_risc: "",
        durata_calendar: "",
        plan_masuri: ""
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut salva strategia."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Strategie de Contractare</h1>
        
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
              Justificarea Procedurii (art. 68)
            </label>
            <textarea
              name="justificare_procedura"
              value={formData.justificare_procedura}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Justificați alegerea procedurii"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Criterii de Atribuire (art. 187)
            </label>
            <textarea
              name="criterii_atribuire"
              value={formData.criterii_atribuire}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Detaliați criteriile de atribuire"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Analiză Risc (HG 395/2016 art. 11)
            </label>
            <textarea
              name="analiza_risc"
              value={formData.analiza_risc}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Descrieți analiza de risc"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Durată și Calendar
            </label>
            <textarea
              name="durata_calendar"
              value={formData.durata_calendar}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="Specificați durata și calendarul"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Plan de Măsuri și Resurse
            </label>
            <textarea
              name="plan_masuri"
              value={formData.plan_masuri}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Detaliați planul de măsuri"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Se procesează..." : "Salvează Strategia"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default StrategiePage;
