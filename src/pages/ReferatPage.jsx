
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { validateProcurement } from "@/validators/procurementValidator";
import { generateSuggestion } from "@/services/openaiService";
import { supabase } from "@/lib/supabase";

function ReferatPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    estimated_value: "",
    justification: "",
    cpv_code: "",
    funding_source: "",
    technical_requirements: ""
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
      const { data: userData } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('referate')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            estimated_value: parseFloat(formData.estimated_value),
            justification: formData.justification,
            cpv_code: formData.cpv_code,
            funding_source: formData.funding_source,
            technical_requirements: formData.technical_requirements,
            status: 'pending',
            user_id: userData?.user?.id,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      toast({
        title: "Succes!",
        description: "Referatul a fost salvat cu succes."
      });
      
      setFormData({
        title: "",
        description: "",
        estimated_value: "",
        justification: "",
        cpv_code: "",
        funding_source: "",
        technical_requirements: ""
      });
    } catch (error) {
      console.error('Error saving referat:', error);
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A apărut o eroare la salvarea referatului: " + error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestJustification = async () => {
    if (!formData.description || !formData.estimated_value) {
      toast({
        variant: "destructive",
        title: "Informații insuficiente",
        description: "Vă rugăm completați descrierea și valoarea estimată pentru a genera o sugestie."
      });
      return;
    }

    setLoading(true);
    try {
      const suggestion = await generateSuggestion(formData.description, formData.estimated_value);
      setFormData(prev => ({
        ...prev,
        justification: suggestion
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

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Referat de Necesitate</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Titlu
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Introduceți titlul"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Descriere
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="Descrieți obiectul achiziției"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Cod CPV
            </label>
            <input
              type="text"
              name="cpv_code"
              value={formData.cpv_code}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Introduceți codul CPV"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Valoare Estimată (RON)
            </label>
            <input
              type="number"
              name="estimated_value"
              value={formData.estimated_value}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Sursa de Finanțare
            </label>
            <input
              type="text"
              name="funding_source"
              value={formData.funding_source}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Introduceți sursa de finanțare"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Cerințe Tehnice
            </label>
            <textarea
              name="technical_requirements"
              value={formData.technical_requirements}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Introduceți cerințele tehnice"
            />
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
              name="justification"
              value={formData.justification}
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
      </motion.div>
    </div>
  );
}

export default ReferatPage;
