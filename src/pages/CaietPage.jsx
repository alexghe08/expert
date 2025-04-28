
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

function CaietPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    titlu: "",
    descriere_tehnica: "",
    specificatii: "",
    standarde: "",
    metodologie: "",
    conditii: ""
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
      const caieteSarciniStr = localStorage.getItem('caiete_sarcini') || '[]';
      const caieteSarcini = JSON.parse(caieteSarciniStr);
      caieteSarcini.push({
        ...formData,
        id: Date.now(),
        created_at: new Date().toISOString()
      });
      localStorage.setItem('caiete_sarcini', JSON.stringify(caieteSarcini));

      toast({
        title: "Succes!",
        description: "Caietul de sarcini a fost salvat."
      });

      setFormData({
        titlu: "",
        descriere_tehnica: "",
        specificatii: "",
        standarde: "",
        metodologie: "",
        conditii: ""
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut salva caietul de sarcini."
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
        <h1 className="text-3xl font-bold mb-6 text-center">Caiet de Sarcini</h1>
        
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
              Descriere Tehnică
            </label>
            <textarea
              name="descriere_tehnica"
              value={formData.descriere_tehnica}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Descrieți specificațiile tehnice"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Specificații Tehnice și Funcționale
            </label>
            <textarea
              name="specificatii"
              value={formData.specificatii}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Detaliați specificațiile conform art. 137"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Standarde Minime
            </label>
            <textarea
              name="standarde"
              value={formData.standarde}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="ISO, SR EN etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Metodologie Verificare Calitate
            </label>
            <textarea
              name="metodologie"
              value={formData.metodologie}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="Descrieți metodologia de verificare"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Condiții de Livrare și Implementare
            </label>
            <textarea
              name="conditii"
              value={formData.conditii}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="Specificați condițiile"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Se procesează..." : "Salvează Caietul de Sarcini"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default CaietPage;
