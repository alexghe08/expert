
export function validateFisaDate(data) {
  const errors = [];

  // Validare Autoritate Contractantă
  if (!data.autoritate_contractanta?.denumire) {
    errors.push("Denumirea autorității contractante este obligatorie");
  }

  // Validare Obiectul Achiziției
  if (!data.obiectul_achizitiei?.descriere) {
    errors.push("Descrierea obiectului achiziției este obligatorie");
  }
  if (!data.obiectul_achizitiei?.cod_cpv) {
    errors.push("Codul CPV este obligatoriu");
  }
  if (!data.obiectul_achizitiei?.valoare_estimata || data.obiectul_achizitiei.valoare_estimata <= 0) {
    errors.push("Valoarea estimată trebuie să fie un număr pozitiv");
  }

  // Validare Procedură
  if (!data.procedura_achizitie?.tip_procedura) {
    errors.push("Tipul procedurii este obligatoriu");
  }
  if (!data.procedura_achizitie?.criteriu_atribuire) {
    errors.push("Criteriul de atribuire este obligatoriu");
  }

  // Validare Criterii Calificare
  if (!data.criterii_calificare?.documente_solicitate?.includes("DUAE")) {
    errors.push("DUAE trebuie solicitat conform art. 193-196");
  }

  // Validare Garanții
  if (!data.garantii?.participare || !data.garantii?.buna_executie) {
    errors.push("Garanțiile de participare și bună execuție sunt obligatorii");
  }

  return errors.length > 0 ? errors : null;
}
