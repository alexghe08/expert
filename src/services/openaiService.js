
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateSuggestion(obiect, valoare) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a procurement specialist assistant helping to generate justifications for procurement requests in Romanian language."
        },
        {
          role: "user",
          content: `Generează o justificare detaliată pentru achiziția următorului obiect: "${obiect}" cu valoarea estimată de ${valoare} RON. Justificarea trebuie să fie profesională și să evidențieze necesitatea și beneficiile achiziției.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return `Achiziția ${obiect} în valoare de ${valoare} RON este necesară pentru îmbunătățirea eficienței operaționale și asigurarea continuității activității. Această investiție va contribui la optimizarea proceselor de lucru și la creșterea calității serviciilor oferite.`;
  }
}
