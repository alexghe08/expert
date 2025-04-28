
export function validateProcurement(data) {
  if (!data.title?.trim()) {
    return "Titlul este obligatoriu";
  }

  if (!data.description?.trim()) {
    return "Descrierea este obligatorie";
  }

  if (!data.estimated_value || data.estimated_value <= 0) {
    return "Valoarea estimată trebuie să fie un număr pozitiv";
  }

  if (!data.justification?.trim()) {
    return "Justificarea este obligatorie";
  }

  return null;
}
